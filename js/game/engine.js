import { getFingerForKey } from '../config/finger_map.js';
import { sounds } from '../audio/sound_engine.js';
import { diagnostics } from './diagnostics.js';

export class TypingEngine {
    constructor(callbacks = {}) {
        this.targetText = '';
        this.currentIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.timerInterval = null;
        this.isActive = false;
        this.isCompleted = false;

        this.totalKeystrokes = 0;
        this.correctKeystrokes = 0;
        this.errorCount = 0;
        this.currentStreak = 0;
        this.maxStreak = 0;

        this.charStates = []; // 'pending', 'correct', 'error'
        this.callbacks = {
            onCharChange: callbacks.onCharChange || (() => {}),
            onKeystroke: callbacks.onKeystroke || (() => {}),
            onStatsUpdate: callbacks.onStatsUpdate || (() => {}),
            onComplete: callbacks.onComplete || (() => {}),
        };
    }

    loadText(text) {
        this.reset();
        this.targetText = text.trim();
        this.charStates = new Array(this.targetText.length).fill('pending');
        this.callbacks.onCharChange(this.getCurrentChar(), this.getCurrentFinger());
        this.updateStats();
    }

    reset() {
        this.stopTimer();
        this.currentIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.isActive = false;
        this.isCompleted = false;
        this.totalKeystrokes = 0;
        this.correctKeystrokes = 0;
        this.errorCount = 0;
        this.currentStreak = 0;
        this.maxStreak = 0;
        this.charStates = [];
        diagnostics.resetSessionTimer();
    }

    startTimer() {
        if (this.isActive) return;
        this.isActive = true;
        this.startTime = performance.now();
        this.timerInterval = setInterval(() => {
            this.updateStats();
        }, 100);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.isActive = false;
    }

    getCurrentChar() {
        if (this.currentIndex >= this.targetText.length) return null;
        return this.targetText[this.currentIndex];
    }

    getCurrentFinger() {
        const char = this.getCurrentChar();
        return getFingerForKey(char);
    }

    handleKeyInput(pressedKey, event = null) {
        if (this.isCompleted || this.targetText.length === 0) return false;

        // Ignore modifier keys alone
        if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'].includes(pressedKey)) {
            return false;
        }

        if (!this.isActive) {
            this.startTimer();
        }

        const targetChar = this.getCurrentChar();
        if (!targetChar) return false;

        const targetFinger = getFingerForKey(targetChar);
        const isSpace = targetChar === ' ';

        this.totalKeystrokes++;

        if (pressedKey === targetChar) {
            // Correct key!
            this.charStates[this.currentIndex] = 'correct';
            this.correctKeystrokes++;
            this.currentStreak++;
            if (this.currentStreak > this.maxStreak) {
                this.maxStreak = this.currentStreak;
            }

            sounds.playKeyClick(isSpace);
            sounds.playStreakChime(this.currentStreak);

            if (targetFinger) {
                diagnostics.recordKeystroke(targetChar, true, targetFinger.id);
            }

            this.callbacks.onKeystroke({
                key: pressedKey,
                isCorrect: true,
                targetChar,
                finger: targetFinger,
                streak: this.currentStreak
            });

            this.currentIndex++;

            if (this.currentIndex >= this.targetText.length) {
                this.completeLesson();
            } else {
                this.callbacks.onCharChange(this.getCurrentChar(), this.getCurrentFinger());
            }

        } else {
            // Error!
            this.charStates[this.currentIndex] = 'error';
            this.errorCount++;
            this.currentStreak = 0;

            sounds.playError();

            if (targetFinger) {
                diagnostics.recordKeystroke(targetChar, false, targetFinger.id);
            }

            this.callbacks.onKeystroke({
                key: pressedKey,
                isCorrect: false,
                targetChar,
                finger: targetFinger,
                streak: 0
            });
        }

        this.updateStats();
        return true;
    }

    completeLesson() {
        this.stopTimer();
        this.endTime = performance.now();
        this.isCompleted = true;
        sounds.playSuccessFanfare();

        const stats = this.getCalculatedStats();
        this.callbacks.onComplete(stats);
    }

    getCalculatedStats() {
        const timeElapsedMin = this.startTime
            ? Math.max(0.01, ((this.endTime || performance.now()) - this.startTime) / 60000)
            : 0.01;

        // Standard WPM: (Total Correct Chars / 5) / TimeInMinutes
        const wpm = Math.round((this.correctKeystrokes / 5) / timeElapsedMin);
        const rawWpm = Math.round((this.totalKeystrokes / 5) / timeElapsedMin);
        const accuracy = this.totalKeystrokes > 0
            ? Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100)
            : 100;

        return {
            wpm: Math.max(0, wpm),
            rawWpm: Math.max(0, rawWpm),
            accuracy: Math.max(0, Math.min(100, accuracy)),
            streak: this.currentStreak,
            maxStreak: this.maxStreak,
            errors: this.errorCount,
            totalChars: this.targetText.length,
            correctChars: this.correctKeystrokes,
            timeSeconds: Math.round(timeElapsedMin * 60)
        };
    }

    updateStats() {
        this.callbacks.onStatsUpdate(this.getCalculatedStats());
    }
}
