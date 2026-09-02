import { getFingerForKey } from '../config/finger_map.js';
import { sounds } from '../audio/sound_engine.js';
import { particles } from '../visual/particles.js';
import { diagnostics } from './diagnostics.js';

const WORD_BANK = [
    'sky', 'flow', 'code', 'fast', 'hand', 'fire', 'neon', 'wave', 'glow', 'type',
    'star', 'spark', 'laser', 'focus', 'swift', 'pulse', 'orbit', 'cyber', 'flash',
    'rhythm', 'matrix', 'stream', 'engine', 'strike', 'galaxy', 'meteor', 'vortex',
    'quantum', 'phantom', 'circuit', 'dynamo', 'gravity', 'velocity'
];

export class ArcadeManager {
    constructor(arenaElement, hudElement, callbacks = {}) {
        this.arena = arenaElement;
        this.hud = hudElement;
        this.callbacks = callbacks;

        this.isRunning = false;
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('fingerflow_arcade_highscore') || '0', 10);
        this.health = 100;
        this.wave = 1;
        this.combo = 0;
        this.multiplier = 1;

        this.meteors = []; // { id, word, remaining, x, y, speed, element, locked }
        this.activeTargetMeteor = null;
        this.spawnTimer = null;
        this.gameLoopId = null;
        this.nextMeteorId = 1;
    }

    start() {
        this.reset();
        this.isRunning = true;
        this.scheduleNextSpawn();
        this.loop();
    }

    stop() {
        this.isRunning = false;
        if (this.spawnTimer) clearTimeout(this.spawnTimer);
        if (this.gameLoopId) cancelAnimationFrame(this.gameLoopId);
        if (this.arena) this.arena.innerHTML = '';
        this.meteors = [];
        this.activeTargetMeteor = null;
    }

    reset() {
        this.stop();
        this.score = 0;
        this.health = 100;
        this.wave = 1;
        this.combo = 0;
        this.multiplier = 1;
        this.meteors = [];
        this.activeTargetMeteor = null;
        this.updateHUD();
    }

    scheduleNextSpawn() {
        if (!this.isRunning) return;
        const interval = Math.max(900, 2600 - (this.wave * 180));
        this.spawnTimer = setTimeout(() => {
            if (this.isRunning) {
                this.spawnMeteor();
                this.scheduleNextSpawn();
            }
        }, interval);
    }

    spawnMeteor() {
        if (!this.arena) return;

        // Pick word based on wave
        const wordPool = this.wave === 1
            ? WORD_BANK.filter(w => w.length <= 4)
            : this.wave <= 3
                ? WORD_BANK.filter(w => w.length <= 5)
                : WORD_BANK;

        const word = wordPool[Math.floor(Math.random() * wordPool.length)];
        const arenaWidth = this.arena.clientWidth || 700;
        const x = 40 + Math.random() * (arenaWidth - 140);
        const speed = 0.6 + (this.wave * 0.15) + (Math.random() * 0.3);

        const el = document.createElement('div');
        el.className = 'arcade-meteor';
        el.style.left = `${x}px`;
        el.style.top = '0px';

        const firstChar = word[0];
        const finger = getFingerForKey(firstChar);
        if (finger) {
            el.style.setProperty('--finger-color', finger.color);
        }

        el.innerHTML = this.renderMeteorContent(word, 0);
        this.arena.appendChild(el);

        const meteor = {
            id: this.nextMeteorId++,
            word,
            charIndex: 0,
            x,
            y: 0,
            speed,
            element: el
        };

        this.meteors.push(meteor);
    }

    renderMeteorContent(word, matchedCount) {
        let html = '<div class="meteor-core">';
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const finger = getFingerForKey(char);
            const color = finger ? finger.color : '#fff';
            if (i < matchedCount) {
                html += `<span class="char-done" style="color: #666;">${char}</span>`;
            } else if (i === matchedCount) {
                html += `<span class="char-active" style="color: ${color}; text-shadow: 0 0 8px ${color};">${char}</span>`;
            } else {
                html += `<span class="char-pending" style="color: ${color}; opacity: 0.8;">${char}</span>`;
            }
        }
        html += '</div>';
        return html;
    }

    handleKeyInput(char) {
        if (!this.isRunning || this.meteors.length === 0) return false;

        // If we have an active locked target
        if (this.activeTargetMeteor) {
            const m = this.activeTargetMeteor;
            const targetChar = m.word[m.charIndex];
            const finger = getFingerForKey(targetChar);

            if (char === targetChar) {
                m.charIndex++;
                sounds.playKeyClick();
                if (finger) diagnostics.recordKeystroke(targetChar, true, finger.id);

                this.onMeteorHit(m);

                if (m.charIndex >= m.word.length) {
                    this.destroyMeteor(m);
                } else {
                    m.element.innerHTML = this.renderMeteorContent(m.word, m.charIndex);
                    // Update next key highlight
                    const nextChar = m.word[m.charIndex];
                    if (this.callbacks.onTargetChange) {
                        this.callbacks.onTargetChange(nextChar, getFingerForKey(nextChar));
                    }
                }
                return true;
            } else {
                sounds.playError();
                if (finger) diagnostics.recordKeystroke(targetChar, false, finger.id);
                this.combo = 0;
                this.multiplier = 1;
                this.updateHUD();
                return false;
            }
        }

        // Look for any meteor starting with this char (prefer lowest/closest to danger line)
        const candidates = this.meteors
            .filter(m => m.word[0] === char)
            .sort((a, b) => b.y - a.y);

        if (candidates.length > 0) {
            const m = candidates[0];
            this.activeTargetMeteor = m;
            m.element.classList.add('is-locked');
            m.charIndex = 1;

            const finger = getFingerForKey(char);
            sounds.playKeyClick();
            if (finger) diagnostics.recordKeystroke(char, true, finger.id);

            this.onMeteorHit(m);

            if (m.charIndex >= m.word.length) {
                this.destroyMeteor(m);
            } else {
                m.element.innerHTML = this.renderMeteorContent(m.word, m.charIndex);
                const nextChar = m.word[m.charIndex];
                if (this.callbacks.onTargetChange) {
                    this.callbacks.onTargetChange(nextChar, getFingerForKey(nextChar));
                }
            }
            return true;
        } else {
            sounds.playError();
            this.combo = 0;
            this.multiplier = 1;
            this.updateHUD();
            return false;
        }
    }

    onMeteorHit(meteor) {
        this.combo++;
        this.multiplier = Math.min(5, 1 + Math.floor(this.combo / 10));
        this.score += 10 * this.multiplier;
        sounds.playStreakChime(this.combo);

        const rect = meteor.element.getBoundingClientRect();
        particles.spawnKeyParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#00f5d4', 6);
        this.updateHUD();
    }

    destroyMeteor(meteor) {
        const rect = meteor.element.getBoundingClientRect();
        particles.spawnComboBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ff5c8a');

        if (meteor.element.parentNode) {
            meteor.element.remove();
        }

        this.meteors = this.meteors.filter(m => m.id !== meteor.id);
        if (this.activeTargetMeteor === meteor) {
            this.activeTargetMeteor = null;
            if (this.callbacks.onTargetChange) {
                this.callbacks.onTargetChange(null, null);
            }
        }

        // Check wave upgrade
        if (this.score >= this.wave * 350) {
            this.wave++;
            sounds.playSuccessFanfare();
        }

        this.updateHUD();
    }

    loop() {
        if (!this.isRunning) return;

        const arenaHeight = this.arena.clientHeight || 360;

        for (let i = this.meteors.length - 1; i >= 0; i--) {
            const m = this.meteors[i];
            m.y += m.speed;
            m.element.style.top = `${m.y}px`;

            // Check collision with baseline
            if (m.y >= arenaHeight - 40) {
                this.health -= 15;
                sounds.playError();
                m.element.classList.add('meteor-explode');
                setTimeout(() => {
                    if (m.element.parentNode) m.element.remove();
                }, 200);

                this.meteors.splice(i, 1);
                if (this.activeTargetMeteor === m) {
                    this.activeTargetMeteor = null;
                    if (this.callbacks.onTargetChange) {
                        this.callbacks.onTargetChange(null, null);
                    }
                }

                this.combo = 0;
                this.multiplier = 1;
                this.updateHUD();

                if (this.health <= 0) {
                    this.gameOver();
                    return;
                }
            }
        }

        this.gameLoopId = requestAnimationFrame(() => this.loop());
    }

    gameOver() {
        this.stop();
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('fingerflow_arcade_highscore', this.highScore.toString());
        }
        if (this.callbacks.onGameOver) {
            this.callbacks.onGameOver({
                score: this.score,
                highScore: this.highScore,
                wave: this.wave
            });
        }
    }

    updateHUD() {
        if (!this.hud) return;
        this.hud.innerHTML = `
            <div class="arcade-hud-stat">
                <span class="hud-label">SCORE</span>
                <span class="hud-value hud-score">${this.score}</span>
            </div>
            <div class="arcade-hud-stat">
                <span class="hud-label">MULTIPLIER</span>
                <span class="hud-value hud-mult">${this.multiplier}x</span>
            </div>
            <div class="arcade-hud-stat">
                <span class="hud-label">WAVE</span>
                <span class="hud-value hud-wave">${this.wave}</span>
            </div>
            <div class="arcade-hud-stat hud-health-stat">
                <span class="hud-label">SHIELD</span>
                <div class="health-bar-container">
                    <div class="health-bar-fill" style="width: ${Math.max(0, this.health)}%; background: ${this.health > 40 ? '#06d6a0' : '#ff5c8a'}"></div>
                </div>
            </div>
        `;
    }
}
