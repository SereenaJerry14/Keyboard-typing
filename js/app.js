import { KeyboardUI } from './visual/keyboard_ui.js';
import { HandsUI } from './visual/hands_ui.js';
import { particles } from './visual/particles.js';
import { sounds } from './audio/sound_engine.js';
import { TypingEngine } from './game/engine.js';
import { academy } from './game/academy_mode.js';
import { ArcadeManager } from './game/arcade_mode.js';
import { diagnostics } from './game/diagnostics.js';
import { LESSON_STAGES, SPEED_TEST_TEXTS, SHORTHAND_CATEGORIES, SHORTHAND_DICTIONARY } from './config/lessons.js';
import { FINGERS } from './config/finger_map.js';

class FingerFlowApp {
    constructor() {
        this.currentMode = 'academy'; // 'academy', 'shorthand', 'arcade', 'speedtest', 'diagnostics'
        this.keyboardUI = null;
        this.handsUI = null;
        this.typingEngine = null;
        this.arcadeManager = null;
        this.speedTestDuration = 30; // seconds
        this.speedTestTimer = null;
        this.speedTestTimeLeft = 30;
        this.currentShorthandCategory = 'all';
        this.currentShorthandIndex = 0;
    }

    init() {
        // 1. Initialize canvas particles
        const canvas = document.getElementById('particle-canvas');
        if (canvas) particles.init(canvas);

        // 2. Initialize Visual Keyboard & Hands
        const kbContainer = document.getElementById('keyboard-container');
        const handsContainer = document.getElementById('hands-container');
        const hintBanner = document.getElementById('finger-hint-banner');

        this.keyboardUI = new KeyboardUI(kbContainer);
        this.handsUI = new HandsUI(handsContainer, hintBanner);

        // 3. Initialize Core Typing Engine
        this.typingEngine = new TypingEngine({
            onCharChange: (char, finger) => {
                this.keyboardUI.setTargetKey(char);
                this.handsUI.highlightFingerForChar(char);
                this.updateTextDisplay();
            },
            onKeystroke: (info) => {
                this.keyboardUI.triggerKeyPress(info.key, info.isCorrect);
            },
            onStatsUpdate: (stats) => {
                this.updateHUDStats(stats);
            },
            onComplete: (stats) => {
                this.onLessonCompleted(stats);
            }
        });

        // 4. Initialize Arcade Manager
        const arcadeArena = document.getElementById('arcade-arena');
        const arcadeHud = document.getElementById('arcade-hud');
        this.arcadeManager = new ArcadeManager(arcadeArena, arcadeHud, {
            onTargetChange: (char, finger) => {
                this.keyboardUI.setTargetKey(char);
                this.handsUI.highlightFingerForChar(char);
            },
            onGameOver: (results) => {
                this.showArcadeGameOver(results);
            }
        });

        // 5. Wire DOM Event Listeners
        this.setupEventListeners();

        // 6. Start Default Mode
        this.switchMode('academy');
        this.renderAcademyCurriculum();
        this.loadCurrentAcademyLesson();
    }

    setupEventListeners() {
        // Global Keyboard Event Interceptor
        window.addEventListener('keydown', (e) => this.handleGlobalKeyDown(e));

        // Navigation Tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const mode = tab.dataset.mode;
                this.switchMode(mode);
            });
        });

        // Switch Sound Selector
        const switchSelect = document.getElementById('switch-type-select');
        if (switchSelect) {
            switchSelect.addEventListener('change', (e) => {
                sounds.setSwitchType(e.target.value);
            });
        }

        // Volume Slider
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                sounds.setVolume(parseFloat(e.target.value));
            });
        }

        // Restart Lesson Button
        const restartBtn = document.getElementById('btn-restart-lesson');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                if (this.currentMode === 'academy') {
                    this.loadCurrentAcademyLesson();
                } else if (this.currentMode === 'speedtest') {
                    this.startSpeedTest();
                }
            });
        }

        // Shorthand Control Buttons
        const shorthandRandBtn = document.getElementById('btn-shorthand-random');
        if (shorthandRandBtn) {
            shorthandRandBtn.addEventListener('click', () => this.startRandomShorthand());
        }

        const shorthandResetBtn = document.getElementById('btn-shorthand-reset');
        if (shorthandResetBtn) {
            shorthandResetBtn.addEventListener('click', () => this.loadShorthandDrill(this.currentShorthandIndex));
        }

        const shorthandNextBtn = document.getElementById('btn-shorthand-next');
        if (shorthandNextBtn) {
            shorthandNextBtn.addEventListener('click', () => this.nextShorthandDrill());
        }

        // Arcade Start Button
        const arcadeStartBtn = document.getElementById('btn-start-arcade');
        if (arcadeStartBtn) {
            arcadeStartBtn.addEventListener('click', () => {
                document.getElementById('arcade-overlay').style.display = 'none';
                this.arcadeManager.start();
            });
        }

        // Modal Action Buttons
        const modalNextBtn = document.getElementById('modal-btn-next');
        if (modalNextBtn) {
            modalNextBtn.addEventListener('click', () => {
                document.getElementById('completion-modal').classList.remove('is-open');
                const next = academy.nextLesson();
                if (next) {
                    this.renderAcademyCurriculum();
                    this.loadCurrentAcademyLesson();
                } else {
                    this.loadCurrentAcademyLesson();
                }
            });
        }

        const modalRetryBtn = document.getElementById('modal-btn-retry');
        if (modalRetryBtn) {
            modalRetryBtn.addEventListener('click', () => {
                document.getElementById('completion-modal').classList.remove('is-open');
                this.loadCurrentAcademyLesson();
            });
        }

        const arcadeRetryBtn = document.getElementById('arcade-modal-btn-retry');
        if (arcadeRetryBtn) {
            arcadeRetryBtn.addEventListener('click', () => {
                document.getElementById('arcade-gameover-modal').classList.remove('is-open');
                this.arcadeManager.start();
            });
        }

        // Weakest Finger Drill Trigger
        const trainWeakBtn = document.getElementById('btn-train-weakest');
        if (trainWeakBtn) {
            trainWeakBtn.addEventListener('click', () => {
                const weakest = diagnostics.getWeakestFinger();
                const fingerId = weakest ? weakest.id : 'LP';
                const drillText = diagnostics.generateDrillForFinger(fingerId);
                this.switchMode('speedtest');
                this.startCustomDrill(`Drill: ${FINGERS[fingerId].name} Workout`, drillText);
            });
        }

        // Reset Stats Button
        const resetStatsBtn = document.getElementById('btn-reset-diagnostics');
        if (resetStatsBtn) {
            resetStatsBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset all finger stats?')) {
                    diagnostics.resetAllStats();
                    this.renderDiagnosticsDashboard();
                }
            });
        }

        // Speed Test Duration Buttons
        document.querySelectorAll('.time-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.speedTestDuration = parseInt(pill.dataset.seconds, 10);
                this.startSpeedTest();
            });
        });
    }

    handleGlobalKeyDown(e) {
        // Prevent scrolling on space or tab
        if (e.code === 'Space' || e.code === 'Tab') {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        }

        // Pass to active game mode
        if (this.currentMode === 'academy' || this.currentMode === 'speedtest' || this.currentMode === 'shorthand') {
            if (e.key.length === 1) {
                this.typingEngine.handleKeyInput(e.key, e);
            }
        } else if (this.currentMode === 'arcade') {
            if (e.key.length === 1) {
                this.arcadeManager.handleKeyInput(e.key);
                this.keyboardUI.triggerKeyPress(e.key, true);
            }
        }
    }

    switchMode(mode) {
        this.currentMode = mode;

        // Update nav tabs UI
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.mode === mode);
        });

        // Hide all mode containers
        document.querySelectorAll('.mode-view').forEach(view => {
            view.style.display = 'none';
        });

        // Stop arcade if active
        if (mode !== 'arcade' && this.arcadeManager) {
            this.arcadeManager.stop();
        }

        // Show target mode
        const targetView = document.getElementById(`view-${mode}`);
        if (targetView) targetView.style.display = 'block';

        if (mode === 'academy') {
            this.loadCurrentAcademyLesson();
        } else if (mode === 'shorthand') {
            this.renderShorthandLab();
            this.loadShorthandDrill(this.currentShorthandIndex);
        } else if (mode === 'arcade') {
            document.getElementById('arcade-overlay').style.display = 'flex';
        } else if (mode === 'diagnostics') {
            this.renderDiagnosticsDashboard();
        } else if (mode === 'speedtest') {
            this.startSpeedTest();
        }
    }

    renderAcademyCurriculum() {
        const curriculumEl = document.getElementById('academy-curriculum-list');
        if (!curriculumEl) return;

        curriculumEl.innerHTML = '';

        LESSON_STAGES.forEach((stage, sIdx) => {
            const stageCard = document.createElement('div');
            stageCard.className = `stage-card ${sIdx === academy.currentStageIndex ? 'is-active-stage' : ''}`;

            let lessonsHtml = '<div class="lesson-items-grid">';
            stage.lessons.forEach((lesson, lIdx) => {
                const isUnlocked = academy.isLessonUnlocked(lesson.id);
                const score = academy.getLessonScore(lesson.id);
                const isCurrent = sIdx === academy.currentStageIndex && lIdx === academy.currentLessonIndex;

                let starsHtml = '';
                for (let s = 1; s <= 3; s++) {
                    starsHtml += `<span class="star-icon ${s <= score.stars ? 'star-filled' : 'star-empty'}">★</span>`;
                }

                lessonsHtml += `
                    <button class="lesson-btn ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'selected' : ''}" 
                            data-stage="${sIdx}" data-lesson="${lIdx}" ${!isUnlocked ? 'disabled' : ''}>
                        <div class="lesson-btn-top">
                            <span class="lesson-title">${lesson.title}</span>
                            <span class="lesson-stars">${starsHtml}</span>
                        </div>
                        <div class="lesson-btn-bottom">
                            <span class="lesson-desc">${lesson.description}</span>
                            ${score.bestWpm ? `<span class="lesson-best">${score.bestWpm} WPM</span>` : ''}
                        </div>
                    </button>
                `;
            });
            lessonsHtml += '</div>';

            stageCard.innerHTML = `
                <div class="stage-header">
                    <h3 class="stage-title">${stage.title}</h3>
                    <p class="stage-desc">${stage.description}</p>
                </div>
                ${lessonsHtml}
            `;

            curriculumEl.appendChild(stageCard);
        });

        // Attach click listeners to lesson buttons
        curriculumEl.querySelectorAll('.lesson-btn.unlocked').forEach(btn => {
            btn.addEventListener('click', () => {
                const sIdx = parseInt(btn.dataset.stage, 10);
                const lIdx = parseInt(btn.dataset.lesson, 10);
                academy.selectLesson(sIdx, lIdx);
                this.renderAcademyCurriculum();
                this.loadCurrentAcademyLesson();
            });
        });
    }

    loadCurrentAcademyLesson() {
        const lesson = academy.getCurrentLesson();
        if (!lesson) return;

        // Update Title & Badge
        const titleEl = document.getElementById('active-lesson-title');
        const descEl = document.getElementById('active-lesson-desc');
        if (titleEl) titleEl.textContent = lesson.title;
        if (descEl) descEl.textContent = lesson.description;

        this.typingEngine.loadText(lesson.text);
    }

    updateTextDisplay() {
        const containers = [
            document.getElementById('typing-text-display'),
            document.getElementById('typing-text-display-speed'),
            document.getElementById('typing-text-display-shorthand')
        ].filter(Boolean);

        if (containers.length === 0) return;

        const text = this.typingEngine.targetText;
        const currIdx = this.typingEngine.currentIndex;
        const charStates = this.typingEngine.charStates;

        let html = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const displayChar = char === ' ' ? '&nbsp;' : char;
            const state = charStates[i];

            let charClass = 'char-pending';
            if (i === currIdx) {
                charClass = 'char-current';
            } else if (state === 'correct') {
                charClass = 'char-correct';
            } else if (state === 'error') {
                charClass = 'char-incorrect';
            }

            html += `<span class="type-char ${charClass}">${displayChar}</span>`;
        }

        containers.forEach(container => {
            container.innerHTML = html;
            const activeCharEl = container.querySelector('.char-current');
            if (activeCharEl) {
                activeCharEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    }

    updateHUDStats(stats) {
        const wpmEl = document.getElementById('stat-wpm');
        const accEl = document.getElementById('stat-accuracy');
        const streakEl = document.getElementById('stat-streak');
        const progressEl = document.getElementById('stat-progress');

        if (wpmEl) wpmEl.textContent = stats.wpm;
        if (accEl) accEl.textContent = `${stats.accuracy}%`;
        if (streakEl) streakEl.textContent = stats.streak;

        if (progressEl) {
            const pct = stats.totalChars > 0 ? Math.round((stats.correctChars / stats.totalChars) * 100) : 0;
            progressEl.style.width = `${pct}%`;
        }
    }

    onLessonCompleted(stats) {
        if (this.currentMode === 'shorthand') {
            const currentItem = SHORTHAND_DICTIONARY[this.currentShorthandIndex];
            const modal = document.getElementById('completion-modal');
            const modalStars = document.getElementById('modal-stars');
            const modalWpm = document.getElementById('modal-wpm');
            const modalAcc = document.getElementById('modal-acc');
            const modalStreak = document.getElementById('modal-streak');

            if (modalWpm) modalWpm.textContent = `${stats.wpm} WPM`;
            if (modalAcc) modalAcc.textContent = `${stats.accuracy}%`;
            if (modalStreak) modalStreak.textContent = `${stats.maxStreak}`;

            if (modalStars) {
                const starsCount = stats.accuracy >= 98 && stats.wpm >= 50 ? 3 : stats.accuracy >= 90 ? 2 : 1;
                let starsHtml = '';
                for (let s = 1; s <= 3; s++) {
                    starsHtml += `<span class="modal-star ${s <= starsCount ? 'star-gold animate-pop' : 'star-dim'}">★</span>`;
                }
                modalStars.innerHTML = starsHtml;
            }

            if (modal) modal.classList.add('is-open');
            return;
        }

        const lesson = academy.getCurrentLesson();
        if (!lesson) return;

        const result = academy.recordLessonCompletion(lesson.id, stats);
        this.renderAcademyCurriculum();

        // Show Modal
        const modal = document.getElementById('completion-modal');
        const modalStars = document.getElementById('modal-stars');
        const modalWpm = document.getElementById('modal-wpm');
        const modalAcc = document.getElementById('modal-acc');
        const modalStreak = document.getElementById('modal-streak');

        if (modalWpm) modalWpm.textContent = `${stats.wpm} WPM`;
        if (modalAcc) modalAcc.textContent = `${stats.accuracy}%`;
        if (modalStreak) modalStreak.textContent = `${stats.maxStreak}`;

        if (modalStars) {
            let starsHtml = '';
            for (let s = 1; s <= 3; s++) {
                starsHtml += `<span class="modal-star ${s <= result.stars ? 'star-gold animate-pop' : 'star-dim'}">★</span>`;
            }
            modalStars.innerHTML = starsHtml;
        }

        if (modal) modal.classList.add('is-open');
    }

    renderShorthandLab() {
        const categoriesBar = document.getElementById('shorthand-categories-bar');
        const dictGrid = document.getElementById('shorthand-dict-grid');

        if (categoriesBar && categoriesBar.children.length === 0) {
            categoriesBar.innerHTML = '';
            SHORTHAND_CATEGORIES.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = `shorthand-cat-pill ${this.currentShorthandCategory === cat.id ? 'active' : ''}`;
                btn.innerHTML = `<span>${cat.icon}</span> ${cat.name}`;
                btn.addEventListener('click', () => {
                    this.currentShorthandCategory = cat.id;
                    categoriesBar.querySelectorAll('.shorthand-cat-pill').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.renderShorthandGrid();
                });
                categoriesBar.appendChild(btn);
            });
        }

        this.renderShorthandGrid();
    }

    renderShorthandGrid() {
        const dictGrid = document.getElementById('shorthand-dict-grid');
        if (!dictGrid) return;

        dictGrid.innerHTML = '';
        const filtered = SHORTHAND_DICTIONARY.map((item, originalIdx) => ({ ...item, originalIdx }))
            .filter(item => this.currentShorthandCategory === 'all' || item.category === this.currentShorthandCategory);

        filtered.forEach(item => {
            const card = document.createElement('div');
            const isActive = item.originalIdx === this.currentShorthandIndex;
            card.className = `shorthand-dict-card ${isActive ? 'is-active-drill' : ''}`;
            card.id = `shorthand-card-${item.originalIdx}`;

            card.innerHTML = `
                <div class="shorthand-card-top">
                    <span class="shorthand-card-code">${item.code}</span>
                    <span class="shorthand-card-cat-tag">${item.category}</span>
                </div>
                <div class="shorthand-card-expansion">${item.expansion}</div>
                <div class="shorthand-card-preview">${item.drill}</div>
                <div class="shorthand-card-action">
                    <span>${isActive ? '⚡ Active Drill' : 'Click to drill'}</span>
                    <span>➔</span>
                </div>
            `;

            card.addEventListener('click', () => {
                this.loadShorthandDrill(item.originalIdx);
            });

            dictGrid.appendChild(card);
        });
    }

    loadShorthandDrill(index) {
        if (index < 0 || index >= SHORTHAND_DICTIONARY.length) index = 0;
        this.currentShorthandIndex = index;
        const item = SHORTHAND_DICTIONARY[index];
        if (!item) return;

        const titleEl = document.getElementById('shorthand-title');
        const pillEl = document.getElementById('shorthand-active-pill');
        const descEl = document.getElementById('shorthand-desc');

        if (titleEl) titleEl.textContent = `Shorthand Speed Drill: ${item.code}`;
        if (pillEl) pillEl.textContent = item.code;
        if (descEl) descEl.innerHTML = `Expansion: <strong>${item.expansion}</strong> <small style="opacity:0.75">(${item.category})</small>`;

        this.renderShorthandGrid();
        this.typingEngine.loadText(item.drill);

        const card = document.getElementById(`shorthand-card-${index}`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    startRandomShorthand() {
        const randIdx = Math.floor(Math.random() * SHORTHAND_DICTIONARY.length);
        this.loadShorthandDrill(randIdx);
    }

    nextShorthandDrill() {
        const nextIdx = (this.currentShorthandIndex + 1) % SHORTHAND_DICTIONARY.length;
        this.loadShorthandDrill(nextIdx);
    }

    showArcadeGameOver(results) {
        const modal = document.getElementById('arcade-gameover-modal');
        const scoreEl = document.getElementById('arcade-modal-score');
        const highEl = document.getElementById('arcade-modal-highscore');
        const waveEl = document.getElementById('arcade-modal-wave');

        if (scoreEl) scoreEl.textContent = results.score;
        if (highEl) highEl.textContent = results.highScore;
        if (waveEl) waveEl.textContent = results.wave;

        if (modal) modal.classList.add('is-open');
    }

    startSpeedTest() {
        const sampleText = SPEED_TEST_TEXTS[Math.floor(Math.random() * SPEED_TEST_TEXTS.length)];
        this.startCustomDrill('Speed Sprint', sampleText);
    }

    startCustomDrill(title, text) {
        const titleEl = document.getElementById('speedtest-title');
        if (titleEl) titleEl.textContent = title;
        this.typingEngine.loadText(text);
    }

    renderDiagnosticsDashboard() {
        const grid = document.getElementById('diagnostics-finger-grid');
        const summaryCard = document.getElementById('diagnostics-summary-card');
        if (!grid) return;

        grid.innerHTML = '';
        const allMetrics = diagnostics.getAllMetrics();
        const weakest = diagnostics.getWeakestFinger();

        if (summaryCard) {
            if (weakest) {
                const m = diagnostics.getFingerMetrics(weakest.id);
                summaryCard.innerHTML = `
                    <div class="weakest-banner" style="border-left: 4px solid ${weakest.color}">
                        <div class="weakest-info">
                            <span class="weakest-title">⚠️ Priority Focus: <strong style="color: ${weakest.color}">${weakest.name}</strong></span>
                            <span class="weakest-stats">Accuracy: ${m.accuracy}% | Avg Latency: ${m.avgLatency}ms | Errors: ${m.errors}</span>
                        </div>
                        <button class="btn btn-primary" id="btn-train-weakest-now">Train This Finger</button>
                    </div>
                `;
                const trainBtn = document.getElementById('btn-train-weakest-now');
                if (trainBtn) {
                    trainBtn.addEventListener('click', () => {
                        const drill = diagnostics.generateDrillForFinger(weakest.id);
                        this.switchMode('speedtest');
                        this.startCustomDrill(`Drill: ${weakest.name} Mastery`, drill);
                    });
                }
            } else {
                summaryCard.innerHTML = `
                    <div class="weakest-banner" style="border-left: 4px solid #06d6a0">
                        <span class="weakest-title">✨ Excellent Balance! Keep typing lessons to gather more per-finger telemetry.</span>
                    </div>
                `;
            }
        }

        Object.values(allMetrics).forEach(f => {
            const card = document.createElement('div');
            card.className = 'finger-diag-card';
            card.style.setProperty('--card-color', f.color);

            const accColor = f.accuracy >= 95 ? '#06d6a0' : f.accuracy >= 85 ? '#ffd166' : '#ff5c8a';

            card.innerHTML = `
                <div class="diag-card-top">
                    <span class="diag-finger-dot" style="background: ${f.color}"></span>
                    <span class="diag-finger-name">${f.name}</span>
                    <span class="diag-finger-hand">${f.hand.toUpperCase()}</span>
                </div>
                <div class="diag-card-metrics">
                    <div class="diag-metric">
                        <span class="metric-label">Accuracy</span>
                        <span class="metric-val" style="color: ${accColor}">${f.accuracy}%</span>
                    </div>
                    <div class="diag-metric">
                        <span class="metric-label">Avg Speed</span>
                        <span class="metric-val">${f.avgLatency ? `${f.avgLatency}ms` : '—'}</span>
                    </div>
                    <div class="diag-metric">
                        <span class="metric-label">Keystrokes</span>
                        <span class="metric-val">${f.totalHits}</span>
                    </div>
                </div>
                <div class="diag-bar-container">
                    <div class="diag-bar-fill" style="width: ${f.accuracy}%; background: ${f.color}"></div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new FingerFlowApp();
    app.init();
});
