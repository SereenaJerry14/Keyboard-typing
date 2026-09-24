// Complete Finger Mapping Configuration for Standard 10-Finger Touch Typing
export const FINGERS = {
    LP: { id: 'LP', name: 'Left Pinky', hand: 'left', color: '#ff5c8a', class: 'finger-lp', homeKey: 'a' },
    LR: { id: 'LR', name: 'Left Ring', hand: 'left', color: '#ff9248', class: 'finger-lr', homeKey: 's' },
    LM: { id: 'LM', name: 'Left Middle', hand: 'left', color: '#ffd166', class: 'finger-lm', homeKey: 'd' },
    LI: { id: 'LI', name: 'Left Index', hand: 'left', color: '#06d6a0', class: 'finger-li', homeKey: 'f' },
    LT: { id: 'LT', name: 'Left Thumb', hand: 'left', color: '#118ab2', class: 'finger-lt', homeKey: 'space' },
    RT: { id: 'RT', name: 'Right Thumb', hand: 'right', color: '#118ab2', class: 'finger-rt', homeKey: 'space' },
    RI: { id: 'RI', name: 'Right Index', hand: 'right', color: '#00f5d4', class: 'finger-ri', homeKey: 'j' },
    RM: { id: 'RM', name: 'Right Middle', hand: 'right', color: '#00bbf9', class: 'finger-rm', homeKey: 'k' },
    RR: { id: 'RR', name: 'Right Ring', hand: 'right', color: '#9b5de5', class: 'finger-rr', homeKey: 'l' },
    RP: { id: 'RP', name: 'Right Pinky', hand: 'right', color: '#f15bb5', class: 'finger-rp', homeKey: ';' },
};

// Map each character and key code to the designated finger
export const KEY_FINGER_MAP = {
    // Left Pinky
    '`': 'LP', '~': 'LP',
    '1': 'LP', '!': 'LP',
    'q': 'LP', 'Q': 'LP',
    'a': 'LP', 'A': 'LP',
    'z': 'LP', 'Z': 'LP',
    'Tab': 'LP', 'CapsLock': 'LP', 'ShiftLeft': 'LP', 'ControlLeft': 'LP',

    // Left Ring
    '2': 'LR', '@': 'LR',
    'w': 'LR', 'W': 'LR',
    's': 'LR', 'S': 'LR',
    'x': 'LR', 'X': 'LR',

    // Left Middle
    '3': 'LM', '#': 'LM',
    'e': 'LM', 'E': 'LM',
    'd': 'LM', 'D': 'LM',
    'c': 'LM', 'C': 'LM',

    // Left Index
    '4': 'LI', '$': 'LI',
    '5': 'LI', '%': 'LI',
    'r': 'LI', 'R': 'LI',
    't': 'LI', 'T': 'LI',
    'f': 'LI', 'F': 'LI',
    'g': 'LI', 'G': 'LI',
    'v': 'LI', 'V': 'LI',
    'b': 'LI', 'B': 'LI',

    // Thumbs
    ' ': 'RT', // Default right thumb for spacebar, can use either
    'Space': 'RT',

    // Right Index
    '6': 'RI', '^': 'RI',
    '7': 'RI', '&': 'RI',
    'y': 'RI', 'Y': 'RI',
    'u': 'RI', 'U': 'RI',
    'h': 'RI', 'H': 'RI',
    'j': 'RI', 'J': 'RI',
    'n': 'RI', 'N': 'RI',
    'm': 'RI', 'M': 'RI',

    // Right Middle
    '8': 'RM', '*': 'RM',
    'i': 'RM', 'I': 'RM',
    'k': 'RM', 'K': 'RM',
    ',': 'RM', '<': 'RM',

    // Right Ring
    '9': 'RR', '(': 'RR',
    'o': 'RR', 'O': 'RR',
    'l': 'RR', 'L': 'RR',
    '.': 'RR', '>': 'RR',

    // Right Pinky
    '0': 'RP', ')': 'RP',
    '-': 'RP', '_': 'RP',
    '=': 'RP', '+': 'RP',
    'p': 'RP', 'P': 'RP',
    '[': 'RP', '{': 'RP',
    ']': 'RP', '}': 'RP',
    '\\': 'RP', '|': 'RP',
    ';': 'RP', ':': 'RP',
        "'": 'RP', '"': 'RP',
        '/': 'RP', '?': 'RP',
        'Enter': 'RP', '\n': 'RP', 'Backspace': 'RP', 'ShiftRight': 'RP'
    };

    // Keyboard physical visual layout definition
    export const KEYBOARD_LAYOUT = [
        // Number Row
        [
            { code: 'Backquote', key: '`', shiftKey: '~', finger: 'LP', width: '1u' },
            { code: 'Digit1', key: '1', shiftKey: '!', finger: 'LP', width: '1u' },
            { code: 'Digit2', key: '2', shiftKey: '@', finger: 'LR', width: '1u' },
            { code: 'Digit3', key: '3', shiftKey: '#', finger: 'LM', width: '1u' },
            { code: 'Digit4', key: '4', shiftKey: '$', finger: 'LI', width: '1u' },
            { code: 'Digit5', key: '5', shiftKey: '%', finger: 'LI', width: '1u' },
            { code: 'Digit6', key: '6', shiftKey: '^', finger: 'RI', width: '1u' },
            { code: 'Digit7', key: '7', shiftKey: '&', finger: 'RI', width: '1u' },
            { code: 'Digit8', key: '8', shiftKey: '*', finger: 'RM', width: '1u' },
            { code: 'Digit9', key: '9', shiftKey: '(', finger: 'RR', width: '1u' },
            { code: 'Digit0', key: '0', shiftKey: ')', finger: 'RP', width: '1u' },
            { code: 'Minus', key: '-', shiftKey: '_', finger: 'RP', width: '1u' },
            { code: 'Equal', key: '=', shiftKey: '+', finger: 'RP', width: '1u' },
            { code: 'Backspace', key: 'Backspace', display: '⌫', finger: 'RP', width: '2u' }
        ],
        // Top Row
        [
            { code: 'Tab', key: 'Tab', display: 'Tab ⇥', finger: 'LP', width: '1.5u' },
            { code: 'KeyQ', key: 'q', shiftKey: 'Q', finger: 'LP', width: '1u' },
            { code: 'KeyW', key: 'w', shiftKey: 'W', finger: 'LR', width: '1u' },
            { code: 'KeyE', key: 'e', shiftKey: 'E', finger: 'LM', width: '1u' },
            { code: 'KeyR', key: 'r', shiftKey: 'R', finger: 'LI', width: '1u' },
            { code: 'KeyT', key: 't', shiftKey: 'T', finger: 'LI', width: '1u' },
            { code: 'KeyY', key: 'y', shiftKey: 'Y', finger: 'RI', width: '1u' },
            { code: 'KeyU', key: 'u', shiftKey: 'U', finger: 'RI', width: '1u' },
            { code: 'KeyI', key: 'i', shiftKey: 'I', finger: 'RM', width: '1u' },
            { code: 'KeyO', key: 'o', shiftKey: 'O', finger: 'RR', width: '1u' },
            { code: 'KeyP', key: 'p', shiftKey: 'P', finger: 'RP', width: '1u' },
            { code: 'BracketLeft', key: '[', shiftKey: '{', finger: 'RP', width: '1u' },
            { code: 'BracketRight', key: ']', shiftKey: '}', finger: 'RP', width: '1u' },
            { code: 'Backslash', key: '\\', shiftKey: '|', finger: 'RP', width: '1.5u' }
        ],
        // Home Row
        [
            { code: 'CapsLock', key: 'CapsLock', display: 'Caps', finger: 'LP', width: '1.75u' },
            { code: 'KeyA', key: 'a', shiftKey: 'A', finger: 'LP', width: '1u' },
            { code: 'KeyS', key: 's', shiftKey: 'S', finger: 'LR', width: '1u' },
            { code: 'KeyD', key: 'd', shiftKey: 'D', finger: 'LM', width: '1u' },
            { code: 'KeyF', key: 'f', shiftKey: 'F', finger: 'LI', bump: true, width: '1u' },
            { code: 'KeyG', key: 'g', shiftKey: 'G', finger: 'LI', width: '1u' },
            { code: 'KeyH', key: 'h', shiftKey: 'H', finger: 'RI', width: '1u' },
            { code: 'KeyJ', key: 'j', shiftKey: 'J', finger: 'RI', bump: true, width: '1u' },
            { code: 'KeyK', key: 'k', shiftKey: 'K', finger: 'RM', width: '1u' },
            { code: 'KeyL', key: 'l', shiftKey: 'L', finger: 'RR', width: '1u' },
            { code: 'Semicolon', key: ';', shiftKey: ':', finger: 'RP', width: '1u' },
            { code: 'Quote', key: "'", shiftKey: '"', finger: 'RP', width: '1u' },
            { code: 'Enter', key: 'Enter', display: 'Enter ↵', finger: 'RP', width: '2.25u' }
        ],
        // Bottom Row
        [
            { code: 'ShiftLeft', key: 'Shift', display: 'Shift ⇧', finger: 'LP', width: '2.25u' },
            { code: 'KeyZ', key: 'z', shiftKey: 'Z', finger: 'LP', width: '1u' },
            { code: 'KeyX', key: 'x', shiftKey: 'X', finger: 'LR', width: '1u' },
            { code: 'KeyC', key: 'c', shiftKey: 'C', finger: 'LM', width: '1u' },
            { code: 'KeyV', key: 'v', shiftKey: 'V', finger: 'LI', width: '1u' },
            { code: 'KeyB', key: 'b', shiftKey: 'B', finger: 'LI', width: '1u' },
            { code: 'KeyN', key: 'n', shiftKey: 'N', finger: 'RI', width: '1u' },
            { code: 'KeyM', key: 'm', shiftKey: 'M', finger: 'RI', width: '1u' },
            { code: 'Comma', key: ',', shiftKey: '<', finger: 'RM', width: '1u' },
            { code: 'Period', key: '.', shiftKey: '>', finger: 'RR', width: '1u' },
            { code: 'Slash', key: '/', shiftKey: '?', finger: 'RP', width: '1u' },
            { code: 'ShiftRight', key: 'Shift', display: 'Shift ⇧', finger: 'RP', width: '2.75u' }
        ],
        // Space Row
        [
            { code: 'ControlLeft', key: 'Ctrl', display: 'Ctrl', finger: 'LP', width: '1.5u' },
            { code: 'AltLeft', key: 'Alt', display: 'Alt', finger: 'LT', width: '1.25u' },
            { code: 'Space', key: ' ', display: 'Spacebar', finger: 'RT', width: '6.5u' },
            { code: 'AltRight', key: 'Alt', display: 'Alt', finger: 'RT', width: '1.25u' },
            { code: 'ControlRight', key: 'Ctrl', display: 'Ctrl', finger: 'RP', width: '1.5u' }
        ]
    ];

    export function getFingerForKey(char) {
        if (!char) return null;
        if (KEY_FINGER_MAP[char]) {
            const fingerId = KEY_FINGER_MAP[char];
            return FINGERS[fingerId] || null;
        }
        const lower = char.toLowerCase();
        if (KEY_FINGER_MAP[lower]) {
            const fingerId = KEY_FINGER_MAP[lower];
            return FINGERS[fingerId] || null;
        }
        return null;
    }

    export function getShiftRequirement(char) {
        if (!char) return null;
        const isUpperLetter = /^[A-Z]$/.test(char);
        const shiftSymbols = '~!@#$%^&*()_+{}|:"<>?';
        const requiresShift = isUpperLetter || shiftSymbols.includes(char);

        if (!requiresShift) return null;

        const finger = getFingerForKey(char);
        if (!finger) return null;

        // If finger is left hand -> use Right Shift (Right Pinky RP)
        // If finger is right hand -> use Left Shift (Left Pinky LP)
        const shiftCode = finger.hand === 'left' ? 'ShiftRight' : 'ShiftLeft';
        const shiftFinger = finger.hand === 'left' ? FINGERS['RP'] : FINGERS['LP'];

        return {
            requiresShift: true,
            shiftCode,
            shiftFinger
        };
    }

