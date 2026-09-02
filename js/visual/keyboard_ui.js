import { KEYBOARD_LAYOUT, FINGERS, getFingerForKey } from '../config/finger_map.js';
import { particles } from './particles.js';

export class KeyboardUI {
    constructor(containerElement) {
        this.container = containerElement;
        this.keyElements = new Map(); // keycode/char -> DOM element
        this.targetKeyEl = null;
        this.targetShiftEl = null;
        this.render();
    }

    render() {
        if (!this.container) return;
        this.container.innerHTML = '';

        const boardEl = document.createElement('div');
        boardEl.className = 'mech-keyboard';

        KEYBOARD_LAYOUT.forEach((row, rowIdx) => {
            const rowEl = document.createElement('div');
            rowEl.className = `kb-row kb-row-${rowIdx}`;

            row.forEach(keyDef => {
                const keyEl = document.createElement('div');
                keyEl.className = `kb-key kb-key-${keyDef.width.replace('.', '_')} ${keyDef.finger ? `finger-${keyDef.finger.toLowerCase()}` : ''}`;
                keyEl.dataset.code = keyDef.code;
                keyEl.dataset.key = keyDef.key;
                if (keyDef.shiftKey) keyEl.dataset.shiftKey = keyDef.shiftKey;
                if (keyDef.finger) keyEl.dataset.finger = keyDef.finger;

                // Color accent bar
                const accent = document.createElement('div');
                accent.className = 'key-accent';
                if (keyDef.finger && FINGERS[keyDef.finger]) {
                    accent.style.backgroundColor = FINGERS[keyDef.finger].color;
                }
                keyEl.appendChild(accent);

                // Cap content
                const capContent = document.createElement('div');
                capContent.className = 'key-cap-content';

                if (keyDef.shiftKey && keyDef.shiftKey !== keyDef.key.toUpperCase()) {
                    const shiftLabel = document.createElement('span');
                    shiftLabel.className = 'shift-label';
                    shiftLabel.textContent = keyDef.shiftKey;
                    capContent.appendChild(shiftLabel);
                }

                const mainLabel = document.createElement('span');
                mainLabel.className = 'main-label';
                mainLabel.textContent = keyDef.display || keyDef.key.toUpperCase();
                capContent.appendChild(mainLabel);

                // Tactile bump marker for F & J
                if (keyDef.bump) {
                    const bumpEl = document.createElement('div');
                    bumpEl.className = 'tactile-bump';
                    keyEl.appendChild(bumpEl);
                    keyEl.classList.add('has-bump');
                }

                keyEl.appendChild(capContent);
                rowEl.appendChild(keyEl);

                // Index by code and chars for instant lookup
                this.keyElements.set(keyDef.code, keyEl);
                this.keyElements.set(keyDef.key.toLowerCase(), keyEl);
                if (keyDef.shiftKey) {
                    this.keyElements.set(keyDef.shiftKey, keyEl);
                }
            });

            boardEl.appendChild(rowEl);
        });

        this.container.appendChild(boardEl);
    }

    getKeyElement(charOrCode) {
        if (!charOrCode) return null;
        if (this.keyElements.has(charOrCode)) {
            return this.keyElements.get(charOrCode);
        }
        const lower = charOrCode.toLowerCase();
        if (this.keyElements.has(lower)) {
            return this.keyElements.get(lower);
        }
        return null;
    }

    setTargetKey(char) {
        // Clear previous target highlights
        if (this.targetKeyEl) {
            this.targetKeyEl.classList.remove('is-target', 'target-pulse');
            this.targetKeyEl = null;
        }
        if (this.targetShiftEl) {
            this.targetShiftEl.classList.remove('is-target', 'target-pulse');
            this.targetShiftEl = null;
        }

        if (!char) return;

        let targetEl = null;
        if (char === ' ') {
            targetEl = this.getKeyElement('Space');
        } else {
            targetEl = this.getKeyElement(char);
        }

        if (targetEl) {
            targetEl.classList.add('is-target', 'target-pulse');
            this.targetKeyEl = targetEl;
        }

        // Check if target requires Shift (uppercase letter or symbol needing Shift)
        const isUpperLetter = /^[A-Z]$/.test(char);
        const shiftSymbols = '~!@#$%^&*()_+{}|:"<>?';
        const requiresShift = isUpperLetter || shiftSymbols.includes(char);

        if (requiresShift) {
            // Determine opposite shift key for ergonomic typing
            const finger = getFingerForKey(char);
            if (finger) {
                const shiftCode = finger.hand === 'left' ? 'ShiftRight' : 'ShiftLeft';
                const shiftEl = this.getKeyElement(shiftCode);
                if (shiftEl) {
                    shiftEl.classList.add('is-target');
                    this.targetShiftEl = shiftEl;
                }
            }
        }
    }

    triggerKeyPress(charOrCode, isCorrect = true) {
        const el = this.getKeyElement(charOrCode);
        if (!el) return;

        el.classList.remove('key-pressed', 'key-error');
        void el.offsetWidth; // force reflow

        if (isCorrect) {
            el.classList.add('key-pressed');
            setTimeout(() => el.classList.remove('key-pressed'), 140);

            // Spawn particle sparks at key position
            const rect = el.getBoundingClientRect();
            const finger = getFingerForKey(charOrCode);
            const color = finger ? finger.color : '#00f5d4';
            particles.spawnKeyParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, color, 6);
        } else {
            el.classList.add('key-error');
            setTimeout(() => el.classList.remove('key-error'), 250);
        }
    }
}
