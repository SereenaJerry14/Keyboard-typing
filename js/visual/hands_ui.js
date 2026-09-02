import { FINGERS, getFingerForKey } from '../config/finger_map.js';

export class HandsUI {
    constructor(containerElement, hintBannerElement) {
        this.container = containerElement;
        this.hintBanner = hintBannerElement;
        this.activeFingerId = null;
        this.fingerNodes = new Map();
        this.render();
    }

    render() {
        if (!this.container) return;
        this.container.innerHTML = '';

        const handsWrapper = document.createElement('div');
        handsWrapper.className = 'hands-display-wrapper';

        // Left Hand SVG
        const leftHandCard = document.createElement('div');
        leftHandCard.className = 'hand-card hand-card-left';
        leftHandCard.innerHTML = `
            <div class="hand-label">LEFT HAND</div>
            <div class="hand-svg-container">
                <svg viewBox="0 0 240 260" class="hand-svg hand-left" id="hand-left-svg">
                    <defs>
                        <filter id="glow-lp" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ff5c8a" flood-opacity="0.8"/>
                        </filter>
                        <filter id="glow-lr" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ff9248" flood-opacity="0.8"/>
                        </filter>
                        <filter id="glow-lm" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffd166" flood-opacity="0.8"/>
                        </filter>
                        <filter id="glow-li" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#06d6a0" flood-opacity="0.8"/>
                        </filter>
                        <filter id="glow-lt" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#118ab2" flood-opacity="0.8"/>
                        </filter>
                    </defs>
                    <!-- Palm base -->
                    <path class="palm-base" d="M 40,160 C 35,120 45,95 70,90 C 85,90 155,90 170,105 C 180,120 185,150 180,210 C 175,240 60,240 40,160 Z" />
                    
                    <!-- Left Pinky (LP) -->
                    <g class="finger-group" id="finger-LP" data-finger="LP">
                        <path class="finger-stem" d="M 32,150 C 26,110 26,60 40,50 C 49,42 56,60 52,140 Z" />
                        <circle class="finger-tip" cx="39" cy="50" r="11" fill="#ff5c8a" />
                        <text class="finger-text" x="39" y="54">A</text>
                        <text class="finger-id-tag" x="39" y="30">Pinky</text>
                    </g>

                    <!-- Left Ring (LR) -->
                    <g class="finger-group" id="finger-LR" data-finger="LR">
                        <path class="finger-stem" d="M 64,130 C 62,90 64,35 78,25 C 89,17 95,35 90,125 Z" />
                        <circle class="finger-tip" cx="78" cy="26" r="12" fill="#ff9248" />
                        <text class="finger-text" x="78" y="30">S</text>
                        <text class="finger-id-tag" x="78" y="6">Ring</text>
                    </g>

                    <!-- Left Middle (LM) -->
                    <g class="finger-group" id="finger-LM" data-finger="LM">
                        <path class="finger-stem" d="M 103,120 C 102,75 105,20 120,10 C 132,2 138,20 132,118 Z" />
                        <circle class="finger-tip" cx="120" cy="12" r="13" fill="#ffd166" />
                        <text class="finger-text" x="120" y="16">D</text>
                        <text class="finger-id-tag" x="120" y="-8">Mid</text>
                    </g>

                    <!-- Left Index (LI) -->
                    <g class="finger-group" id="finger-LI" data-finger="LI">
                        <path class="finger-stem" d="M 143,125 C 145,80 148,35 162,28 C 173,22 179,38 171,130 Z" />
                        <circle class="finger-tip" cx="162" cy="30" r="12" fill="#06d6a0" />
                        <text class="finger-text" x="162" y="34">F</text>
                        <text class="finger-id-tag" x="162" y="10">Index</text>
                    </g>

                    <!-- Left Thumb (LT) -->
                    <g class="finger-group" id="finger-LT" data-finger="LT">
                        <path class="finger-stem" d="M 172,145 C 190,135 220,140 225,160 C 228,175 205,190 180,185 Z" />
                        <circle class="finger-tip" cx="218" cy="162" r="11" fill="#118ab2" />
                        <text class="finger-text" x="218" y="166">␣</text>
                        <text class="finger-id-tag" x="218" y="190">Thumb</text>
                    </g>
                </svg>
            </div>
        `;

        // Right Hand SVG
        const rightHandCard = document.createElement('div');
        rightHandCard.className = 'hand-card hand-card-right';
        rightHandCard.innerHTML = `
            <div class="hand-label">RIGHT HAND</div>
            <div class="hand-svg-container">
                <svg viewBox="0 0 240 260" class="hand-svg hand-right" id="hand-right-svg">
                    <defs>
                        <filter id="glow-rt" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#118ab2" flood-opacity="0.8"/>
                        </filter>
                        <filter id="glow-ri" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#00f5d4" flood-opacity="0.8"/>
                        </filter>
                        <filter id="glow-rm" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#00bbf9" flood-opacity="0.8"/>
                        </filter>
                        <filter id="glow-rr" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#9b5de5" flood-opacity="0.8"/>
                        </filter>
                        <filter id="glow-rp" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#f15bb5" flood-opacity="0.8"/>
                        </filter>
                    </defs>
                    <!-- Palm base -->
                    <path class="palm-base" d="M 60,210 C 55,150 60,120 70,105 C 85,90 155,90 170,90 C 195,95 205,120 200,160 C 180,240 65,240 60,210 Z" />

                    <!-- Right Thumb (RT) -->
                    <g class="finger-group" id="finger-RT" data-finger="RT">
                        <path class="finger-stem" d="M 68,145 C 50,135 20,140 15,160 C 12,175 35,190 60,185 Z" />
                        <circle class="finger-tip" cx="22" cy="162" r="11" fill="#118ab2" />
                        <text class="finger-text" x="22" y="166">␣</text>
                        <text class="finger-id-tag" x="22" y="190">Thumb</text>
                    </g>

                    <!-- Right Index (RI) -->
                    <g class="finger-group" id="finger-RI" data-finger="RI">
                        <path class="finger-stem" d="M 97,125 C 95,80 92,35 78,28 C 67,22 61,38 69,130 Z" />
                        <circle class="finger-tip" cx="78" cy="30" r="12" fill="#00f5d4" />
                        <text class="finger-text" x="78" y="34">J</text>
                        <text class="finger-id-tag" x="78" y="10">Index</text>
                    </g>

                    <!-- Right Middle (RM) -->
                    <g class="finger-group" id="finger-RM" data-finger="RM">
                        <path class="finger-stem" d="M 137,120 C 138,75 135,20 120,10 C 108,2 102,20 108,118 Z" />
                        <circle class="finger-tip" cx="120" cy="12" r="13" fill="#00bbf9" />
                        <text class="finger-text" x="120" y="16">K</text>
                        <text class="finger-id-tag" x="120" y="-8">Mid</text>
                    </g>

                    <!-- Right Ring (RR) -->
                    <g class="finger-group" id="finger-RR" data-finger="RR">
                        <path class="finger-stem" d="M 176,130 C 178,90 176,35 162,25 C 151,17 145,35 150,125 Z" />
                        <circle class="finger-tip" cx="162" cy="26" r="12" fill="#9b5de5" />
                        <text class="finger-text" x="162" y="30">L</text>
                        <text class="finger-id-tag" x="162" y="6">Ring</text>
                    </g>

                    <!-- Right Pinky (RP) -->
                    <g class="finger-group" id="finger-RP" data-finger="RP">
                        <path class="finger-stem" d="M 208,150 C 214,110 214,60 200,50 C 191,42 184,60 188,140 Z" />
                        <circle class="finger-tip" cx="201" cy="50" r="11" fill="#f15bb5" />
                        <text class="finger-text" x="201" y="54">;</text>
                        <text class="finger-id-tag" x="201" y="30">Pinky</text>
                    </g>
                </svg>
            </div>
        `;

        handsWrapper.appendChild(leftHandCard);
        handsWrapper.appendChild(rightHandCard);
        this.container.appendChild(handsWrapper);

        // Cache finger elements
        Object.keys(FINGERS).forEach(fid => {
            const el = this.container.querySelector(`#finger-${fid}`);
            if (el) this.fingerNodes.set(fid, el);
        });
    }

    highlightFingerForChar(char) {
        // Clear previous active
        if (this.activeFingerId) {
            const prevEl = this.fingerNodes.get(this.activeFingerId);
            if (prevEl) prevEl.classList.remove('active-finger', 'pulse-glow');
        }

        if (!char) {
            if (this.hintBanner) this.hintBanner.innerHTML = '<span class="hint-idle">Press any key to begin...</span>';
            return;
        }

        const finger = getFingerForKey(char);
        if (!finger) return;

        this.activeFingerId = finger.id;
        const targetEl = this.fingerNodes.get(finger.id);
        if (targetEl) {
            targetEl.classList.add('active-finger', 'pulse-glow');
        }

        // Update instruction banner
        if (this.hintBanner) {
            const displayChar = char === ' ' ? 'SPACEBAR' : char;
            const reachDesc = this.getReachDescription(char, finger);
            this.hintBanner.innerHTML = `
                <div class="finger-instruction-badge" style="border-color: ${finger.color}">
                    <span class="finger-dot" style="background: ${finger.color}"></span>
                    <span class="finger-name-label" style="color: ${finger.color}">${finger.name}</span>
                    <span class="finger-arrow-sep">➔</span>
                    <span class="finger-target-key">Press <strong class="key-badge">${displayChar}</strong></span>
                    <span class="finger-reach-info">${reachDesc}</span>
                </div>
            `;
        }
    }

    getReachDescription(char, finger) {
        if (char === ' ') return '(Resting position on Spacebar)';
        const home = finger.homeKey;
        if (char.toLowerCase() === home.toLowerCase()) {
            return '(Home row anchor position)';
        }

        const topRow = 'qwertyuiop1234567890';
        const bottomRow = 'zxcvbnm,./';

        const lower = char.toLowerCase();
        if (topRow.includes(lower)) {
            return '(Reach UP from home row)';
        }
        if (bottomRow.includes(lower)) {
            return '(Reach DOWN from home row)';
        }
        if (lower === 'g' || lower === 'h') {
            return '(Reach INWARD horizontally)';
        }
        return '(Reach from home anchor)';
    }
}
