// FingerFlow Consolidated Bundle (Works seamlessly via file:// and http://)
(function() {
    'use strict';

    // 1. CONFIG: FINGER MAP
    const FINGERS = {
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

    const KEY_FINGER_MAP = {
        // Left Pinky
        '`': 'LP', '~': 'LP', '1': 'LP', '!': 'LP', 'q': 'LP', 'Q': 'LP', 'a': 'LP', 'A': 'LP', 'z': 'LP', 'Z': 'LP',
        'Tab': 'LP', 'CapsLock': 'LP', 'ShiftLeft': 'LP', 'ControlLeft': 'LP',
        // Left Ring
        '2': 'LR', '@': 'LR', 'w': 'LR', 'W': 'LR', 's': 'LR', 'S': 'LR', 'x': 'LR', 'X': 'LR',
        // Left Middle
        '3': 'LM', '#': 'LM', 'e': 'LM', 'E': 'LM', 'd': 'LM', 'D': 'LM', 'c': 'LM', 'C': 'LM',
        // Left Index
        '4': 'LI', '$': 'LI', '5': 'LI', '%': 'LI', 'r': 'LI', 'R': 'LI', 't': 'LI', 'T': 'LI',
        'f': 'LI', 'F': 'LI', 'g': 'LI', 'G': 'LI', 'v': 'LI', 'V': 'LI', 'b': 'LI', 'B': 'LI',
        // Thumbs
        ' ': 'RT', 'Space': 'RT',
        // Right Index
        '6': 'RI', '^': 'RI', '7': 'RI', '&': 'RI', 'y': 'RI', 'Y': 'RI', 'u': 'RI', 'U': 'RI',
        'h': 'RI', 'H': 'RI', 'j': 'RI', 'J': 'RI', 'n': 'RI', 'N': 'RI', 'm': 'RI', 'M': 'RI',
        // Right Middle
        '8': 'RM', '*': 'RM', 'i': 'RM', 'I': 'RM', 'k': 'RM', 'K': 'RM', ',': 'RM', '<': 'RM',
        // Right Ring
        '9': 'RR', '(': 'RR', 'o': 'RR', 'O': 'RR', 'l': 'RR', 'L': 'RR', '.': 'RR', '>': 'RR',
        // Right Pinky
        '0': 'RP', ')': 'RP', '-': 'RP', '_': 'RP', '=': 'RP', '+': 'RP', 'p': 'RP', 'P': 'RP',
        '[': 'RP', '{': 'RP', ']': 'RP', '}': 'RP', '\\': 'RP', '|': 'RP', ';': 'RP', ':': 'RP',
        "'": 'RP', '"': 'RP', '/': 'RP', '?': 'RP', 'Enter': 'RP', '\n': 'RP', 'Backspace': 'RP', 'ShiftRight': 'RP'
    };

    const KEYBOARD_LAYOUT = [
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
        [
            { code: 'ControlLeft', key: 'Ctrl', display: 'Ctrl', finger: 'LP', width: '1.5u' },
            { code: 'AltLeft', key: 'Alt', display: 'Alt', finger: 'LT', width: '1.25u' },
            { code: 'Space', key: ' ', display: 'Spacebar', finger: 'RT', width: '6.5u' },
            { code: 'AltRight', key: 'Alt', display: 'Alt', finger: 'RT', width: '1.25u' },
            { code: 'ControlRight', key: 'Ctrl', display: 'Ctrl', finger: 'RP', width: '1.5u' }
        ]
    ];

    function getFingerForKey(char) {
        if (!char) return null;
        if (KEY_FINGER_MAP[char]) {
            return FINGERS[KEY_FINGER_MAP[char]] || null;
        }
        const lower = char.toLowerCase();
        if (KEY_FINGER_MAP[lower]) {
            return FINGERS[KEY_FINGER_MAP[lower]] || null;
        }
        return null;
    }

    function getShiftRequirement(char) {
        if (!char) return null;
        const isUpperLetter = /^[A-Z]$/.test(char);
        const shiftSymbols = '~!@#$%^&*()_+{}|:"<>?';
        const requiresShift = isUpperLetter || shiftSymbols.includes(char);

        if (!requiresShift) return null;

        const finger = getFingerForKey(char);
        if (!finger) return null;

        const shiftCode = finger.hand === 'left' ? 'ShiftRight' : 'ShiftLeft';
        const shiftFinger = finger.hand === 'left' ? FINGERS['RP'] : FINGERS['LP'];

        return {
            requiresShift: true,
            shiftCode,
            shiftFinger
        };
    }

    // 2. CONFIG: LESSONS
    const LESSON_STAGES = [
        {
            id: 'stage-1',
            title: 'Stage 1: Home Row Foundations',
            description: 'Anchor your fingers on the resting positions (F & J tactile bumps).',
            lessons: [
                {
                    id: 's1-l1',
                    title: 'Anchor Keys: F & J',
                    focusFingers: ['LI', 'RI'],
                    description: 'Feel the tactile bumps on F (Left Index) and J (Right Index).',
                    text: 'f j ff jj fj jf fff jjj fjf jfj ffjj jjff f j f j'
                },
                {
                    id: 's1-l2',
                    title: 'Left Hand Home Row: D & S & A',
                    focusFingers: ['LP', 'LR', 'LM', 'LI'],
                    description: 'Add D (Middle), S (Ring), and A (Pinky) on the left hand.',
                    text: 'asdf fdsa asdf fdsa aassddff ffddssaa asdf asdf asdf'
                },
                {
                    id: 's1-l3',
                    title: 'Right Hand Home Row: K & L & ;',
                    focusFingers: ['RI', 'RM', 'RR', 'RP'],
                    description: 'Add K (Middle), L (Ring), and ; (Pinky) on the right hand.',
                    text: 'jkl; ;lkj jkl; ;lkj jjkkll;; ;;llkkjj jkl; jkl; jkl;'
                },
                {
                    id: 's1-l4',
                    title: 'Full Home Row & Spacebar',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Combine all 8 home row keys with thumb spacebar taps.',
                    text: 'asdf jkl; a s d f j k l ; dad sad lad fall ask flask'
                },
                {
                    id: 's1-l5',
                    title: 'Home Row Word Sprint',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Type actual words formed exclusively on the home row.',
                    text: 'all fall salad flash flask salsa falls alfalfa salads dads lads'
                }
            ]
        },
        {
            id: 'stage-2',
            title: 'Stage 2: Index Finger Extensions',
            description: 'Train your index fingers to reach inner columns (G, H, T, Y, V, B, N, M).',
            lessons: [
                {
                    id: 's2-l1',
                    title: 'Inner Reach: G & H',
                    focusFingers: ['LI', 'RI'],
                    description: 'Reach inward: Left Index reaches G, Right Index reaches H.',
                    text: 'fgf jhj fgf jhj fghj jhgf g h gh hg glad half flash dash'
                },
                {
                    id: 's2-l2',
                    title: 'Upper Index: R & U',
                    focusFingers: ['LI', 'RI'],
                    description: 'Reach up: Left Index reaches R, Right Index reaches U.',
                    text: 'frf juj frf juj r u ru ur fur jug jar rug rust just rural'
                },
                {
                    id: 's2-l3',
                    title: 'Upper Inner: T & Y',
                    focusFingers: ['LI', 'RI'],
                    description: 'Stretch up-inward: Left Index reaches T, Right Index reaches Y.',
                    text: 'ftf jyj ftf jyj t y ty yt that year they try stay youth truly'
                },
                {
                    id: 's2-l4',
                    title: 'Lower Index: V, B, N, M',
                    focusFingers: ['LI', 'RI'],
                    description: 'Reach downward: Left Index for V & B, Right Index for N & M.',
                    text: 'fvf fbf jnj jmj v b n m van ban man mob vast must band'
                },
                {
                    id: 's2-l5',
                    title: 'Index Finger Velocity Drill',
                    focusFingers: ['LI', 'RI'],
                    description: 'High-speed index finger dexterity workout across all rows.',
                    text: 'turn burnt bright myth rhyme rhythm mighty giant bravado thumb'
                }
            ]
        },
        {
            id: 'stage-3',
            title: 'Stage 3: Middle & Ring Fingers',
            description: 'Build strength and independence for E, I, D, K, C, Comma, W, O, S, L, X, Period.',
            lessons: [
                {
                    id: 's3-l1',
                    title: 'Top Middle: E & I',
                    focusFingers: ['LM', 'RM'],
                    description: 'Reach up: Left Middle reaches E, Right Middle reaches I.',
                    text: 'ded kik ded kik e i ei ie time like file side life dive elite'
                },
                {
                    id: 's3-l2',
                    title: 'Bottom Middle: C & Comma',
                    focusFingers: ['LM', 'RM'],
                    description: 'Reach down: Left Middle reaches C, Right Middle reaches Comma.',
                    text: 'dcd k,k dcd k,k c , ice, cake, click, check, cycle, cosmic'
                },
                {
                    id: 's3-l3',
                    title: 'Top Ring: W & O',
                    focusFingers: ['LR', 'RR'],
                    description: 'Reach up: Left Ring reaches W, Right Ring reaches O.',
                    text: 'sws lol sws lol w o wo ow slow wood work world look room book'
                },
                {
                    id: 's3-l4',
                    title: 'Bottom Ring: X & Period',
                    focusFingers: ['LR', 'RR'],
                    description: 'Reach down: Left Ring reaches X, Right Ring reaches Period.',
                    text: 'sxs l.l sxs l.l x . fix. next. box. exit. pixel. relax. flex.'
                },
                {
                    id: 's3-l5',
                    title: 'Middle & Ring Harmony',
                    focusFingers: ['LM', 'LR', 'RM', 'RR'],
                    description: 'Fluid sentences exercising middle and ring finger coordination.',
                    text: 'we work with excellent wisdom while old trees bloom slowly'
                }
            ]
        },
        {
            id: 'stage-4',
            title: 'Stage 4: Pinky Reach & Punctuation',
            description: 'Master the outer edges: Q, P, Z, Slash, Shift keys, and Semicolons.',
            lessons: [
                {
                    id: 's4-l1',
                    title: 'Top Pinky: Q & P',
                    focusFingers: ['LP', 'RP'],
                    description: 'Reach up: Left Pinky reaches Q, Right Pinky reaches P.',
                    text: 'aqa p;p aqa p;p q p qp pq quick paper speed jump quiet peak'
                },
                {
                    id: 's4-l2',
                    title: 'Bottom Pinky: Z & Slash',
                    focusFingers: ['LP', 'RP'],
                    description: 'Reach down: Left Pinky reaches Z, Right Pinky reaches /.',
                    text: 'aza ;/; aza ;/; z / zebra zap zone zoom zip / and / zero'
                },
                {
                    id: 's4-l3',
                    title: 'Capital Letters (Shift Keys)',
                    focusFingers: ['LP', 'RP'],
                    description: 'Opposite Pinky rule: hold Right Shift for left hand, Left Shift for right.',
                    text: 'Apex Quick Zebra Jupiter Falcon Orbit Titan Saturn Phoenix'
                },
                {
                    id: 's4-l4',
                    title: 'Pinky Power Sentence Challenge',
                    focusFingers: ['LP', 'RP', 'LR', 'RR'],
                    description: 'Full sentence with uppercase, commas, periods, and apostrophes.',
                    text: 'The quick brown fox jumps over the lazy dog; it\'s quite a prize.'
                }
            ]
        },
        {
            id: 'stage-5',
            title: 'Stage 5: Numbers & Symbols',
            description: 'Reach smoothly up to the number row and special characters.',
            lessons: [
                {
                    id: 's5-l1',
                    title: 'Left Hand Numbers: 1, 2, 3, 4, 5',
                    focusFingers: ['LP', 'LR', 'LM', 'LI'],
                    description: '1 (Pinky), 2 (Ring), 3 (Middle), 4 & 5 (Index).',
                    text: '1 2 3 4 5 12 34 45 15 24 135 241 54321 12345 54123'
                },
                {
                    id: 's5-l2',
                    title: 'Right Hand Numbers: 6, 7, 8, 9, 0',
                    focusFingers: ['RI', 'RM', 'RR', 'RP'],
                    description: '6 & 7 (Index), 8 (Middle), 9 (Ring), 0 (Pinky).',
                    text: '6 7 8 9 0 67 89 90 78 69 67890 09876 76098 87069'
                },
                {
                    id: 's5-l3',
                    title: 'Mixed Numbers & Basic Math',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Number patterns, equations, and code-style numerals.',
                    text: '10 + 25 = 35; 48 * 2 = 96; 700 - 150 = 550; 2026 / 2 = 1013'
                },
                {
                    id: 's5-l4',
                    title: 'Code & Special Characters',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Brackets, braces, quotes, and symbols used in programming.',
                    text: 'const data = { id: 42, name: "FingerFlow", active: true };'
                }
            ]
        },
        {
            id: 'stage-6',
            title: 'Stage 6: Speed & Flow Mastery',
            description: 'Fluid prose, thought-speed flow, and comprehensive typing workouts.',
            lessons: [
                {
                    id: 's6-l1',
                    title: 'Velocity Sprint: Common English Words',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'The most frequent words in the English language typed with zero hesitation.',
                    text: 'the of and a to in is you that it he was for on are as with his they I at be this have from or one had by word but not what all were we when your can said'
                },
                {
                    id: 's6-l2',
                    title: 'Rhythm & Precision: Technology & Mindset',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Focus on consistent cadence and rhythmic keystroke pacing.',
                    text: 'Touch typing transforms your computer into a seamless extension of thought. Muscle memory replaces conscious effort, allowing ideas to flow freely onto the screen.'
                },
                {
                    id: 's6-l3',
                    title: 'Grand Mastery: The Final Gauntlet',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Full dexterity test across numbers, symbols, capitalization, and intricate vocabulary.',
                    text: 'Mastering every key—from 1 to 0, "A" to "Z", and punctuation like { [ & ] }—unlocks peak typing speed above 100 WPM with 99% accuracy!'
                }
            ]
        },
        {
            id: 'stage-7',
            title: 'Stage 7: Shorthand, Acronyms & Fast Contractions',
            description: 'Build lightning-fast muscle memory for common abbreviations, texting acronyms, and contractions.',
            lessons: [
                {
                    id: 's7-l1',
                    title: 'Chat & Internet Shorthand',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Fast texting acronyms: btw, brb, idk, imo, tbh, fwiw, ttyl, omw, rn, lmk, afaik, nvm, np, gg.',
                    text: 'btw brb idk imo tbh fwiw ttyl omw rn lmk afaik nvm np gg tldr btw brb imo tbh lmk rn'
                },
                {
                    id: 's7-l2',
                    title: 'Corporate & Workplace Acronyms',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Essential business shorthand: ASAP, FYI, ETA, EOD, FTE, ROI, KPI, B2B, FAQ, Q&A, RSVP, POV.',
                    text: 'ASAP FYI ETA EOD ROI KPI B2B FAQ RSVP POV TBA TBD ASAP FYI ETA EOD KPI FAQ RSVP'
                },
                {
                    id: 's7-l3',
                    title: 'English Contractions & Apostrophe Speed',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Rapid apostrophe transitions: don\'t, won\'t, can\'t, shouldn\'t, they\'re, you\'ll, it\'s, let\'s.',
                    text: 'don\'t won\'t can\'t wouldn\'t shouldn\'t they\'re you\'ll it\'s let\'s we\'ve isn\'t haven\'t'
                },
                {
                    id: 's7-l4',
                    title: 'Developer & Tech Shorthand',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Code & web acronyms: HTML, CSS, JS, TS, API, URL, SDK, CLI, JSON, CRUD, SQL, GIT, PR, CI/CD, SSH, HTTP.',
                    text: 'HTML CSS JS TS API URL SDK CLI JSON CRUD SQL GIT PR SSH HTTP HTTPS API CLI JSON CRUD'
                },
                {
                    id: 's7-l5',
                    title: 'Speed Shorthand Gauntlet',
                    focusFingers: ['LP', 'LR', 'LM', 'LI', 'LT', 'RT', 'RI', 'RM', 'RR', 'RP'],
                    description: 'Realistic fast-paced sentences with mixed shorthand expressions.',
                    text: 'Pls review the PR asap! FYI the ETA is by EOD today. TBH idk if the API url is live rn; lmk asap.'
                }
            ]
        }
    ];

    const SHORTHAND_CATEGORIES = [
        { id: 'all', name: 'All Shorthand', icon: '⚡' },
        { id: 'chat', name: 'Chat & Messaging', icon: '💬' },
        { id: 'business', name: 'Business & Office', icon: '💼' },
        { id: 'contractions', name: 'English Contractions', icon: '✍️' },
        { id: 'tech', name: 'Tech & Dev', icon: '💻' }
    ];

    const SHORTHAND_DICTIONARY = [
        // Chat & Messaging
        { code: 'ASAP', expansion: 'As Soon As Possible', category: 'chat', drill: 'Please send the report ASAP so we can finalize it.' },
        { code: 'BTW', expansion: 'By The Way', category: 'chat', drill: 'BTW did you notice the new update released this morning?' },
        { code: 'TBH', expansion: 'To Be Honest', category: 'chat', drill: 'TBH that solution is the fastest and cleanest approach.' },
        { code: 'IDK', expansion: 'I Don\'t Know', category: 'chat', drill: 'IDK the exact time yet, but I will check shortly.' },
        { code: 'IMO', expansion: 'In My Opinion', category: 'chat', drill: 'IMO touch typing is the highest leverage skill you can master.' },
        { code: 'FWIW', expansion: 'For What It\'s Worth', category: 'chat', drill: 'FWIW the benchmark showed a sixty percent speed increase.' },
        { code: 'BRB', expansion: 'Be Right Back', category: 'chat', drill: 'BRB stepping away for a quick cup of coffee.' },
        { code: 'LMK', expansion: 'Let Me Know', category: 'chat', drill: 'LMK when you are free to discuss the upcoming roadmap.' },
        { code: 'RN', expansion: 'Right Now', category: 'chat', drill: 'I am testing the new high speed typing engine rn.' },
        { code: 'TL;DR', expansion: 'Too Long; Didn\'t Read', category: 'chat', drill: 'TL;DR keep your fingers anchored on home row for maximum speed.' },
        { code: 'OMW', expansion: 'On My Way', category: 'chat', drill: 'OMW to the meeting room right now.' },
        { code: 'AFAIK', expansion: 'As Far As I Know', category: 'chat', drill: 'AFAIK the deployment succeeded without any errors.' },

        // Business & Corporate
        { code: 'FYI', expansion: 'For Your Information', category: 'business', drill: 'FYI all client deliverables are scheduled for Friday.' },
        { code: 'ETA', expansion: 'Estimated Time of Arrival', category: 'business', drill: 'What is the ETA on the updated financial forecast?' },
        { code: 'EOD', expansion: 'End Of Day', category: 'business', drill: 'Please submit your timesheet before EOD today.' },
        { code: 'ROI', expansion: 'Return On Investment', category: 'business', drill: 'We observed a 3x ROI within the first quarter.' },
        { code: 'KPI', expansion: 'Key Performance Indicator', category: 'business', drill: 'Tracking typing WPM and accuracy is our core KPI.' },
        { code: 'B2B', expansion: 'Business To Business', category: 'business', drill: 'Our enterprise B2B software is expanding rapidly.' },
        { code: 'FAQ', expansion: 'Frequently Asked Questions', category: 'business', drill: 'Review the FAQ section before reaching out to support.' },
        { code: 'RSVP', expansion: 'Répondez S\'il Vous Plaît (Please Respond)', category: 'business', drill: 'Please RSVP by tomorrow noon to confirm attendance.' },
        { code: 'POV', expansion: 'Point Of View', category: 'business', drill: 'From an engineering POV, this architecture scales effortlessly.' },
        { code: 'TBD', expansion: 'To Be Decided / Determined', category: 'business', drill: 'The final venue is still TBD pending budget review.' },

        // English Contractions
        { code: 'don\'t', expansion: 'do not', category: 'contractions', drill: 'Don\'t look down at the keyboard; trust your muscle memory.' },
        { code: 'won\'t', expansion: 'will not', category: 'contractions', drill: 'You won\'t hesitate once your fingers learn the home row anchors.' },
        { code: 'can\'t', expansion: 'cannot', category: 'contractions', drill: 'You can\'t build speed without first locking down 98% accuracy.' },
        { code: 'they\'re', expansion: 'they are', category: 'contractions', drill: 'They\'re practicing daily and their WPM is climbing fast.' },
        { code: 'you\'ll', expansion: 'you will', category: 'contractions', drill: 'With daily practice you\'ll surpass one hundred words per minute.' },
        { code: 'it\'s', expansion: 'it is', category: 'contractions', drill: 'It\'s all about rhythm, precision, and smooth finger flow.' },
        { code: 'should\'ve', expansion: 'should have', category: 'contractions', drill: 'We should\'ve started touch typing training years ago.' },
        { code: 'let\'s', expansion: 'let us', category: 'contractions', drill: 'Let\'s type smoothly without looking at our hands.' },

        // Tech & Developer
        { code: 'HTML/CSS', expansion: 'HyperText Markup Language & Cascading Style Sheets', category: 'tech', drill: 'Build semantic HTML and style with modern CSS tokens.' },
        { code: 'API / SDK', expansion: 'Application Programming Interface & Dev Kit', category: 'tech', drill: 'Query the REST API using the client SDK with token auth.' },
        { code: 'JSON / SQL', expansion: 'JavaScript Object Notation & Structured Query Language', category: 'tech', drill: 'Parse the JSON payload and persist records into the SQL database.' },
        { code: 'GIT / PR', expansion: 'Git Version Control & Pull Request', category: 'tech', drill: 'Commit your changes to git and create a clean PR for review.' },
        { code: 'CI/CD', expansion: 'Continuous Integration / Continuous Delivery', category: 'tech', drill: 'Automated CI/CD pipelines run tests on every pull request.' },
        { code: 'CLI / GUI', expansion: 'Command Line Interface / Graphical User Interface', category: 'tech', drill: 'Power users type commands in the CLI faster than clicking in a GUI.' }
    ];

    const SPEED_TEST_TEXTS = [
        "Simplicity is the soul of efficiency. Good code is its own best documentation.",
        "Practice does not make perfect. Only perfect practice makes perfect.",
        "The keyboard is the instrument of the digital craftsman. Play it with precision and grace.",
        "Speed will come automatically when your accuracy and muscle memory are flawless.",
        "Do not look down at the keys. Trust your fingers and keep your eyes on the screen."
    ];

    const CODER_CATEGORIES = [
        { id: 'all', name: 'All Snippets', icon: '💻' },
        { id: 'symbols', name: 'Symbols & Brackets', icon: '🔣' },
        { id: 'javascript', name: 'JavaScript / TS', icon: '📜' },
        { id: 'python', name: 'Python', icon: '🐍' },
        { id: 'cpp_java', name: 'C++ & Java', icon: '⚡' },
        { id: 'html_css', name: 'HTML & CSS', icon: '🌐' },
        { id: 'sql', name: 'SQL Queries', icon: '🗄️' },
        { id: 'terminal', name: 'Git & Terminal', icon: '🖥️' },
        { id: 'casing', name: 'Variable Casing', icon: '🐫' },
    ];

    const CODER_SNIPPETS = [
        {
            id: 'sym-01',
            title: 'Equality, Logic & Nullish Operators',
            category: 'symbols',
            filename: 'operators.js',
            lang: 'javascript',
            difficulty: 'Easy',
            description: 'Build fast muscle memory for triple equals, logic chords, and nullish coalescing.',
            text: 'if (data !== null && count >= 0 || isReady === true) {\n  const value = result ?? fallback;\n  const isMatch = (a === b) && (x <= y);\n}'
        },
        {
            id: 'sym-02',
            title: 'Bracket Pairs & Nested Braces',
            category: 'symbols',
            filename: 'brackets.json',
            lang: 'json',
            difficulty: 'Medium',
            description: 'Practice right pinky reach for curly braces, square brackets, and parentheses.',
            text: '{\n  "users": [ { "id": 101, "tags": ["admin", "core"] } ],\n  "config": { "retries": 3, "enabled": true },\n  "flags": [false, true, null]\n}'
        },
        {
            id: 'sym-03',
            title: 'Arrow Functions & Math Assignment',
            category: 'symbols',
            filename: 'math_arrows.ts',
            lang: 'typescript',
            difficulty: 'Medium',
            description: 'Combine arrows `=>`, dereference `->`, and compound operators `+=`, `-=`, `*=`.',
            text: 'const multiply = (x: number, y: number): number => x * y;\nlet total = 0;\ntotal += 15;\ntotal -= 3;\ntotal *= 2;\nreturn total % 4 === 0;'
        },
        {
            id: 'sym-04',
            title: 'Template Strings & Interpolations',
            category: 'symbols',
            filename: 'strings.js',
            lang: 'javascript',
            difficulty: 'Easy',
            description: 'Master backticks, dollar signs, and curly braces for template literals.',
            text: 'const msg = `User: ${user.name} (${user.id}) | Score: ${points * 100}%`;\nconsole.log(`[LOG] -> ${timestamp}: ${msg}`);'
        },
        {
            id: 'js-01',
            title: 'Async / Await API Fetcher',
            category: 'javascript',
            filename: 'api_client.ts',
            lang: 'typescript',
            difficulty: 'Medium',
            description: 'Type idiomatic asynchronous JavaScript with error handling and promises.',
            text: 'async function fetchUserData(endpoint: string) {\n  try {\n    const response = await fetch(endpoint);\n    if (!response.ok) throw new Error("Fetch failed");\n    return await response.json();\n  } catch (err) {\n    console.error(err);\n    return null;\n  }\n}'
        },
        {
            id: 'js-02',
            title: 'React useState & useEffect Hook',
            category: 'javascript',
            filename: 'CounterWidget.tsx',
            lang: 'typescript',
            difficulty: 'Medium',
            description: 'React state hook declaration, effect dependencies, and arrow callbacks.',
            text: 'const [count, setCount] = useState<number>(0);\n\nuseEffect(() => {\n  const timer = setInterval(() => setCount(c => c + 1), 1000);\n  return () => clearInterval(timer);\n}, []);'
        },
        {
            id: 'js-03',
            title: 'Array Transform: Filter, Map & Reduce',
            category: 'javascript',
            filename: 'transforms.js',
            lang: 'javascript',
            difficulty: 'Hard',
            description: 'Rapid chaining of higher-order array methods and inline arrow functions.',
            text: 'const activeRevenue = orders\n  .filter(o => o.status === "completed" && o.amount > 0)\n  .map(o => ({ id: o.id, net: o.amount * 0.9 }))\n  .reduce((acc, curr) => acc + curr.net, 0);'
        },
        {
            id: 'js-04',
            title: 'TypeScript Interface & Generic Types',
            category: 'javascript',
            filename: 'types.ts',
            lang: 'typescript',
            difficulty: 'Medium',
            description: 'Angle brackets `<T>`, optional properties `?:`, and union types `|`.',
            text: 'export interface ApiResponse<T> {\n  status: "success" | "error";\n  data?: T;\n  statusCode: number;\n  timestamp: string;\n}'
        },
        {
            id: 'py-01',
            title: 'List Comprehensions & Filtering',
            category: 'python',
            filename: 'comprehensions.py',
            lang: 'python',
            difficulty: 'Easy',
            description: 'Pythonic list, set, and dict comprehension syntax with colons and conditionals.',
            text: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\neven_squares = [x**2 for x in numbers if x % 2 == 0]\nname_len = {name: len(name) for name in ["Alice", "Bob", "Charlie"]}'
        },
        {
            id: 'py-02',
            title: 'Function Decorators & Type Hints',
            category: 'python',
            filename: 'service.py',
            lang: 'python',
            difficulty: 'Medium',
            description: 'At-symbol `@` decorators, `self.`, type hints `->`, and f-strings.',
            text: 'class UserService:\n    def __init__(self, db_conn: str) -> None:\n        self._conn = db_conn\n\n    @property\n    def is_connected(self) -> bool:\n        return self._conn is not None'
        },
        {
            id: 'py-03',
            title: 'Dictionary Iteration & Exception Handling',
            category: 'python',
            filename: 'processor.py',
            lang: 'python',
            difficulty: 'Medium',
            description: '`try/except/finally` blocks and dictionary unpacking in Python.',
            text: 'def parse_config(raw_data: dict) -> dict:\n    try:\n        return {k.strip(): v for k, v in raw_data.items() if v}\n    except AttributeError as err:\n        print(f"[Error] Invalid dict structure: {err}")\n        return {}'
        },
        {
            id: 'cpp-01',
            title: 'C++ Vector & Stream Output',
            category: 'cpp_java',
            filename: 'main.cpp',
            lang: 'cpp',
            difficulty: 'Medium',
            description: 'Scope resolution `::`, stream insertion `<<`, references `&`, and templates.',
            text: '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores = {95, 88, 72, 100};\n    for (const auto& s : scores) {\n        std::cout << "Score: " << s << std::endl;\n    }\n    return 0;\n}'
        },
        {
            id: 'java-01',
            title: 'Java Stream Pipeline & Method Ref',
            category: 'cpp_java',
            filename: 'UserController.java',
            lang: 'java',
            difficulty: 'Hard',
            description: 'Java method references `::`, generics `<String>`, and Stream terminal operators.',
            text: 'public List<String> getActiveUserNames(List<User> users) {\n    return users.stream()\n        .filter(User::isActive)\n        .map(User::getUsername)\n        .sorted()\n        .collect(Collectors.toList());\n}'
        },
        {
            id: 'html-01',
            title: 'HTML5 Semantic UI Component',
            category: 'html_css',
            filename: 'card.html',
            lang: 'html',
            difficulty: 'Easy',
            description: 'HTML tags `<>`, closing tags `</>`, quotes `""`, and element attributes.',
            text: '<section class="hero-card" id="main-banner">\n  <header class="card-header">\n    <h2 class="title">Developer Dojo</h2>\n  </header>\n  <button type="submit" class="btn btn-primary" disabled>Start Drill</button>\n</section>'
        },
        {
            id: 'css-01',
            title: 'CSS Flexbox & CSS Variables',
            category: 'html_css',
            filename: 'layout.css',
            lang: 'css',
            difficulty: 'Medium',
            description: 'Curly braces, colons, semicolons, dashes `--var`, and CSS units `rem/px/vw`.',
            text: '.container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n  background: var(--bg-surface);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}'
        },
        {
            id: 'sql-01',
            title: 'SQL Join & Aggregate Grouping',
            category: 'sql',
            filename: 'report.sql',
            lang: 'sql',
            difficulty: 'Medium',
            description: 'Uppercase SQL keywords, aliases, aggregations `COUNT/SUM`, and `HAVING`.',
            text: 'SELECT u.id, u.username, COUNT(o.id) AS total_orders, SUM(o.amount) AS total_spent\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nWHERE o.status = "PAID"\nGROUP BY u.id, u.username\nHAVING COUNT(o.id) >= 3\nORDER BY total_spent DESC\nLIMIT 20;'
        },
        {
            id: 'sql-02',
            title: 'SQL Window Functions & Partition',
            category: 'sql',
            filename: 'analytics.sql',
            lang: 'sql',
            difficulty: 'Hard',
            description: 'Analytical window functions `ROW_NUMBER()`, `PARTITION BY`, and nested clauses.',
            text: 'SELECT emp_id, department, salary,\n  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept,\n  AVG(salary) OVER (PARTITION BY department) AS dept_avg\nFROM employee_salaries;'
        },
        {
            id: 'term-01',
            title: 'Git Branch, Add & Semantic Commit',
            category: 'terminal',
            filename: 'bash_git.sh',
            lang: 'bash',
            difficulty: 'Easy',
            description: 'Double dashes `--`, quotes, pipes, and standard Git branch commands.',
            text: 'git checkout -b feature/auth-middleware\ngit add src/auth/ token.ts\ngit commit -m "feat(auth): add jwt validation guard"\ngit push origin feature/auth-middleware'
        },
        {
            id: 'term-02',
            title: 'Docker Run & Environment Flags',
            category: 'terminal',
            filename: 'deploy.sh',
            lang: 'bash',
            difficulty: 'Medium',
            description: 'Flags `-d`, `-p`, `--name`, environment flags `-e`, and container image tags.',
            text: 'docker run -d --name redis-cache -p 6379:6379 -v redis_data:/data redis:7.0-alpine\ndocker logs -f --tail 50 redis-cache'
        },
        {
            id: 'case-01',
            title: 'camelCase Variable Sprint',
            category: 'casing',
            filename: 'camel_case.js',
            lang: 'javascript',
            difficulty: 'Easy',
            description: 'Train fast Shift tapping within variable names without losing typing cadence.',
            text: 'const handleUserLoginSubmit = (authResponsePayload) => {\n  const isSessionTokenValid = validateAuthToken(authResponsePayload);\n  if (isSessionTokenValid) navigateToUserProfile();\n};'
        },
        {
            id: 'case-02',
            title: 'PascalCase & SCREAMING_SNAKE Constants',
            category: 'casing',
            filename: 'constants.ts',
            lang: 'typescript',
            difficulty: 'Medium',
            description: 'Shift coordination for PascalCase class names and all-caps underscore constants.',
            text: 'export const MAX_CONNECTION_POOL_SIZE = 50;\nexport const DEFAULT_REQUEST_TIMEOUT_MS = 3000;\n\nexport class DatabaseConnectionFactory {\n  public static createDefaultInstance(): ConnectionPoolManager {\n    return new ConnectionPoolManager(MAX_CONNECTION_POOL_SIZE);\n  }\n}'
        },
        {
            id: 'case-03',
            title: 'snake_case & kebab-case Sprint',
            category: 'casing',
            filename: 'naming_styles.py',
            lang: 'python',
            difficulty: 'Easy',
            description: 'Rapid underscore `_` and hyphen `-` usage with right pinky.',
            text: 'user_first_name = "Alex"\nuser_account_balance = 1450.75\nis_verified_account = True\ncss_class_selector = "btn-secondary-outline--active"'
        }
    ];

    // 3. SOUND SYNTHESIZER
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.switchSound = 'blue';
            this.volume = 0.5;
            this.scaleNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
            this.initialized = false;
        }

        init() {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    this.ctx = new AudioContext();
                    this.initialized = true;
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        setSwitchType(type) {
            this.switchSound = type;
        }

        setVolume(val) {
            this.volume = Math.max(0, Math.min(1, val));
        }

        playKeyClick(isSpace = false) {
            if (this.switchSound === 'mute' || this.volume === 0) return;
            this.init();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;

            if (this.switchSound === 'blue') {
                const clickOsc = this.ctx.createOscillator();
                const clickGain = this.ctx.createGain();
                clickOsc.type = 'triangle';
                clickOsc.frequency.setValueAtTime(isSpace ? 1800 : 2600 + Math.random() * 400, now);
                clickOsc.frequency.exponentialRampToValueAtTime(300, now + 0.015);
                clickGain.gain.setValueAtTime(0.3 * this.volume, now);
                clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
                clickOsc.connect(clickGain);
                clickGain.connect(this.ctx.destination);
                clickOsc.start(now);
                clickOsc.stop(now + 0.02);

                const thudOsc = this.ctx.createOscillator();
                const thudGain = this.ctx.createGain();
                thudOsc.type = 'sine';
                thudOsc.frequency.setValueAtTime(isSpace ? 120 : 180 + Math.random() * 30, now + 0.005);
                thudOsc.frequency.exponentialRampToValueAtTime(40, now + 0.04);
                thudGain.gain.setValueAtTime(0.4 * this.volume, now + 0.005);
                thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
                thudOsc.connect(thudGain);
                thudGain.connect(this.ctx.destination);
                thudOsc.start(now + 0.005);
                thudOsc.stop(now + 0.05);

            } else if (this.switchSound === 'brown') {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(isSpace ? 160 : 280 + Math.random() * 50, now);
                osc.frequency.exponentialRampToValueAtTime(60, now + 0.035);
                gain.gain.setValueAtTime(0.5 * this.volume, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.045);

            } else if (this.switchSound === 'red') {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(isSpace ? 140 : 220, now);
                osc.frequency.exponentialRampToValueAtTime(70, now + 0.025);
                gain.gain.setValueAtTime(0.35 * this.volume, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.035);

            } else if (this.switchSound === 'typewriter') {
                const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.04, this.ctx.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                for (let i = 0; i < noiseBuffer.length; i++) {
                    output[i] = Math.random() * 2 - 1;
                }
                const noise = this.ctx.createBufferSource();
                noise.buffer = noiseBuffer;
                const filter = this.ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(3200, now);
                filter.Q.setValueAtTime(3, now);
                const gain = this.ctx.createGain();
                gain.gain.setValueAtTime(0.6 * this.volume, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(this.ctx.destination);
                noise.start(now);
            }
        }

        playError() {
            if (this.switchSound === 'mute' || this.volume === 0) return;
            this.init();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(130, now);
            osc.frequency.linearRampToValueAtTime(90, now + 0.12);
            gain.gain.setValueAtTime(0.25 * this.volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.14);
        }

        playStreakChime(streakCount) {
            if (this.switchSound === 'mute' || this.volume === 0) return;
            if (streakCount <= 0 || streakCount % 5 !== 0) return;
            this.init();
            if (!this.ctx) return;

            const noteIndex = Math.min(Math.floor(streakCount / 5) % this.scaleNotes.length, this.scaleNotes.length - 1);
            const freq = this.scaleNotes[noteIndex];
            const now = this.ctx.currentTime;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.2 * this.volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.35);
        }

        playSuccessFanfare() {
            if (this.switchSound === 'mute' || this.volume === 0) return;
            this.init();
            if (!this.ctx) return;

            const chords = [523.25, 659.25, 783.99, 1046.50];
            chords.forEach((freq, idx) => {
                const startTime = this.ctx.currentTime + idx * 0.08;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.3 * this.volume, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.45);
            });
        }
    }

    const sounds = new SoundEngine();

    // 4. PARTICLES
    class ParticleEngine {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.animId = null;
        }

        init(canvasElement) {
            this.canvas = canvasElement;
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            window.addEventListener('resize', () => this.resize());
            this.loop();
        }

        resize() {
            if (!this.canvas) return;
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        spawnKeyParticles(x, y, color = '#00f5d4', count = 8) {
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1.5 + Math.random() * 3.5;
                this.particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1.5,
                    size: 2 + Math.random() * 3,
                    color,
                    alpha: 1,
                    decay: 0.02 + Math.random() * 0.03
                });
            }
        }

        spawnComboBurst(x, y, color = '#ff5c8a') {
            this.spawnKeyParticles(x, y, color, 24);
        }

        loop() {
            if (!this.ctx || !this.canvas) return;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.08;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.alpha);
                this.ctx.fillStyle = p.color;
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }

            this.animId = requestAnimationFrame(() => this.loop());
        }
    }

    const particles = new ParticleEngine();

    // 5. KEYBOARD UI
    class KeyboardUI {
        constructor(containerElement) {
            this.container = containerElement;
            this.keyElements = new Map();
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

                    const accent = document.createElement('div');
                    accent.className = 'key-accent';
                    if (keyDef.finger && FINGERS[keyDef.finger]) {
                        accent.style.backgroundColor = FINGERS[keyDef.finger].color;
                    }
                    keyEl.appendChild(accent);

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

                    if (keyDef.bump) {
                        const bumpEl = document.createElement('div');
                        bumpEl.className = 'tactile-bump';
                        keyEl.appendChild(bumpEl);
                        keyEl.classList.add('has-bump');
                    }

                    keyEl.appendChild(capContent);
                    rowEl.appendChild(keyEl);

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

            const isUpperLetter = /^[A-Z]$/.test(char);
            const shiftSymbols = '~!@#$%^&*()_+{}|:"<>?';
            const requiresShift = isUpperLetter || shiftSymbols.includes(char);

            if (requiresShift) {
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
            void el.offsetWidth;

            if (isCorrect) {
                el.classList.add('key-pressed');
                setTimeout(() => el.classList.remove('key-pressed'), 140);

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

    // 6. HANDS UI
    class HandsUI {
        constructor(containerElement, hintBannerElement) {
            this.container = containerElement;
            this.hintBanner = hintBannerElement;
            this.activeFingerId = null;
            this.activeShiftFingerId = null;
            this.fingerNodes = new Map();
            this.render();
        }

        render() {
            if (!this.container) return;
            this.container.innerHTML = '';

            const handsWrapper = document.createElement('div');
            handsWrapper.className = 'hands-display-wrapper';

            const leftHandCard = document.createElement('div');
            leftHandCard.className = 'hand-card hand-card-left';
            leftHandCard.innerHTML = `
                <div class="hand-label">LEFT HAND</div>
                <div class="hand-svg-container">
                    <svg viewBox="0 0 240 260" class="hand-svg hand-left" id="hand-left-svg">
                        <path class="palm-base" d="M 40,160 C 35,120 45,95 70,90 C 85,90 155,90 170,105 C 180,120 185,150 180,210 C 175,240 60,240 40,160 Z" />
                        <g class="finger-group" id="finger-LP" data-finger="LP">
                            <path class="finger-stem" d="M 32,150 C 26,110 26,60 40,50 C 49,42 56,60 52,140 Z" />
                            <circle class="finger-tip" cx="39" cy="50" r="11" fill="#ff5c8a" />
                            <text class="finger-text" x="39" y="54">A</text>
                            <text class="finger-id-tag" x="39" y="30">Pinky</text>
                        </g>
                        <g class="finger-group" id="finger-LR" data-finger="LR">
                            <path class="finger-stem" d="M 64,130 C 62,90 64,35 78,25 C 89,17 95,35 90,125 Z" />
                            <circle class="finger-tip" cx="78" cy="26" r="12" fill="#ff9248" />
                            <text class="finger-text" x="78" y="30">S</text>
                            <text class="finger-id-tag" x="78" y="6">Ring</text>
                        </g>
                        <g class="finger-group" id="finger-LM" data-finger="LM">
                            <path class="finger-stem" d="M 103,120 C 102,75 105,20 120,10 C 132,2 138,20 132,118 Z" />
                            <circle class="finger-tip" cx="120" cy="12" r="13" fill="#ffd166" />
                            <text class="finger-text" x="120" y="16">D</text>
                            <text class="finger-id-tag" x="120" y="-8">Mid</text>
                        </g>
                        <g class="finger-group" id="finger-LI" data-finger="LI">
                            <path class="finger-stem" d="M 143,125 C 145,80 148,35 162,28 C 173,22 179,38 171,130 Z" />
                            <circle class="finger-tip" cx="162" cy="30" r="12" fill="#06d6a0" />
                            <text class="finger-text" x="162" y="34">F</text>
                            <text class="finger-id-tag" x="162" y="10">Index</text>
                        </g>
                        <g class="finger-group" id="finger-LT" data-finger="LT">
                            <path class="finger-stem" d="M 172,145 C 190,135 220,140 225,160 C 228,175 205,190 180,185 Z" />
                            <circle class="finger-tip" cx="218" cy="162" r="11" fill="#118ab2" />
                            <text class="finger-text" x="218" y="166">␣</text>
                            <text class="finger-id-tag" x="218" y="190">Thumb</text>
                        </g>
                    </svg>
                </div>
            `;

            const rightHandCard = document.createElement('div');
            rightHandCard.className = 'hand-card hand-card-right';
            rightHandCard.innerHTML = `
                <div class="hand-label">RIGHT HAND</div>
                <div class="hand-svg-container">
                    <svg viewBox="0 0 240 260" class="hand-svg hand-right" id="hand-right-svg">
                        <path class="palm-base" d="M 60,210 C 55,150 60,120 70,105 C 85,90 155,90 170,90 C 195,95 205,120 200,160 C 180,240 65,240 60,210 Z" />
                        <g class="finger-group" id="finger-RT" data-finger="RT">
                            <path class="finger-stem" d="M 68,145 C 50,135 20,140 15,160 C 12,175 35,190 60,185 Z" />
                            <circle class="finger-tip" cx="22" cy="162" r="11" fill="#118ab2" />
                            <text class="finger-text" x="22" y="166">␣</text>
                            <text class="finger-id-tag" x="22" y="190">Thumb</text>
                        </g>
                        <g class="finger-group" id="finger-RI" data-finger="RI">
                            <path class="finger-stem" d="M 97,125 C 95,80 92,35 78,28 C 67,22 61,38 69,130 Z" />
                            <circle class="finger-tip" cx="78" cy="30" r="12" fill="#00f5d4" />
                            <text class="finger-text" x="78" y="34">J</text>
                            <text class="finger-id-tag" x="78" y="10">Index</text>
                        </g>
                        <g class="finger-group" id="finger-RM" data-finger="RM">
                            <path class="finger-stem" d="M 137,120 C 138,75 135,20 120,10 C 108,2 102,20 108,118 Z" />
                            <circle class="finger-tip" cx="120" cy="12" r="13" fill="#00bbf9" />
                            <text class="finger-text" x="120" y="16">K</text>
                            <text class="finger-id-tag" x="120" y="-8">Mid</text>
                        </g>
                        <g class="finger-group" id="finger-RR" data-finger="RR">
                            <path class="finger-stem" d="M 176,130 C 178,90 176,35 162,25 C 151,17 145,35 150,125 Z" />
                            <circle class="finger-tip" cx="162" cy="26" r="12" fill="#9b5de5" />
                            <text class="finger-text" x="162" y="30">L</text>
                            <text class="finger-id-tag" x="162" y="6">Ring</text>
                        </g>
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

            Object.keys(FINGERS).forEach(fid => {
                const el = this.container.querySelector(`#finger-${fid}`);
                if (el) this.fingerNodes.set(fid, el);
            });
        }

        highlightFingerForChar(char) {
            if (this.activeFingerId) {
                const prevEl = this.fingerNodes.get(this.activeFingerId);
                if (prevEl) prevEl.classList.remove('active-finger', 'pulse-glow');
                this.activeFingerId = null;
            }
            if (this.activeShiftFingerId) {
                const prevShiftEl = this.fingerNodes.get(this.activeShiftFingerId);
                if (prevShiftEl) prevShiftEl.classList.remove('active-shift-finger', 'pulse-glow');
                this.activeShiftFingerId = null;
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

            // Check if Shift is required
            const shiftReq = getShiftRequirement(char);
            if (shiftReq && shiftReq.shiftFinger) {
                this.activeShiftFingerId = shiftReq.shiftFinger.id;
                const shiftFingerEl = this.fingerNodes.get(shiftReq.shiftFinger.id);
                if (shiftFingerEl) {
                    shiftFingerEl.classList.add('active-shift-finger', 'pulse-glow');
                }
            }

            if (this.hintBanner) {
                let displayChar = char;
                if (char === ' ') displayChar = 'SPACEBAR';
                else if (char === '\n') displayChar = 'ENTER ↵';

                const reachDesc = this.getReachDescription(char, finger);

                if (shiftReq && shiftReq.shiftFinger) {
                    this.hintBanner.innerHTML = `
                        <div class="finger-instruction-badge" style="border-color: ${finger.color}">
                            <span class="finger-dot" style="background: ${shiftReq.shiftFinger.color}"></span>
                            <span class="finger-name-label" style="color: ${shiftReq.shiftFinger.color}">Hold ${shiftReq.shiftFinger.name} (Shift)</span>
                            <span class="finger-arrow-sep">+</span>
                            <span class="finger-dot" style="background: ${finger.color}"></span>
                            <span class="finger-name-label" style="color: ${finger.color}">${finger.name}</span>
                            <span class="finger-arrow-sep">➔</span>
                            <span class="finger-target-key">Type <strong class="key-badge">${displayChar}</strong></span>
                            <span class="finger-reach-info">${reachDesc}</span>
                        </div>
                    `;
                } else {
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
        }

        getReachDescription(char, finger) {
            if (char === ' ') return '(Resting position on Spacebar)';
            if (char === '\n') return '(Right Pinky reaches to Enter ↵)';
            const home = finger.homeKey;
            if (char.toLowerCase() === home.toLowerCase()) {
                return '(Home row anchor position)';
            }
            const topRow = 'qwertyuiop1234567890~!@#$%^&*()';
            const bottomRow = 'zxcvbnm,./<>?';
            const bracketPinky = '{}[];:\'"\\|-_=+';

            const lower = char.toLowerCase();
            if (bracketPinky.includes(char)) return '(Pinky stretch on bracket/symbol row)';
            if (topRow.includes(lower) || topRow.includes(char)) return '(Reach UP from home row)';
            if (bottomRow.includes(lower) || bottomRow.includes(char)) return '(Reach DOWN from home row)';
            if (lower === 'g' || lower === 'h') return '(Reach INWARD horizontally)';
            return '(Reach from home anchor)';
        }
    }

    // 7. DIAGNOSTICS TRACKER
    class DiagnosticsTracker {
        constructor() {
            this.fingerStats = this.loadStats();
            this.lastKeystrokeTime = null;
        }

        loadStats() {
            try {
                const saved = localStorage.getItem('fingerflow_diagnostics');
                if (saved) return JSON.parse(saved);
            } catch (e) {}
            const initial = {};
            Object.keys(FINGERS).forEach(fid => {
                initial[fid] = {
                    id: fid,
                    totalHits: 0,
                    correctHits: 0,
                    errors: 0,
                    totalLatencyMs: 0,
                    latencyCount: 0
                };
            });
            return initial;
        }

        saveStats() {
            try {
                localStorage.setItem('fingerflow_diagnostics', JSON.stringify(this.fingerStats));
            } catch (e) {}
        }

        recordKeystroke(char, isCorrect, fingerId) {
            if (!fingerId || !this.fingerStats[fingerId]) return;
            const now = performance.now();
            let latency = 0;
            if (this.lastKeystrokeTime) {
                latency = Math.min(2000, Math.max(20, now - this.lastKeystrokeTime));
            }
            this.lastKeystrokeTime = now;

            const stat = this.fingerStats[fingerId];
            stat.totalHits++;
            if (isCorrect) {
                stat.correctHits++;
                if (latency > 0) {
                    stat.totalLatencyMs += latency;
                    stat.latencyCount++;
                }
            } else {
                stat.errors++;
            }
            this.saveStats();
        }

        resetSessionTimer() {
            this.lastKeystrokeTime = null;
        }

        getFingerMetrics(fingerId) {
            const stat = this.fingerStats[fingerId];
            if (!stat || stat.totalHits === 0) {
                return { accuracy: 100, avgLatency: 0, totalHits: 0, errors: 0 };
            }
            const accuracy = Math.round((stat.correctHits / stat.totalHits) * 100);
            const avgLatency = stat.latencyCount > 0 ? Math.round(stat.totalLatencyMs / stat.latencyCount) : 0;
            return { accuracy, avgLatency, totalHits: stat.totalHits, errors: stat.errors };
        }

        getAllMetrics() {
            const metrics = {};
            Object.keys(FINGERS).forEach(fid => {
                metrics[fid] = {
                    ...FINGERS[fid],
                    ...this.getFingerMetrics(fid)
                };
            });
            return metrics;
        }

        getWeakestFinger() {
            let weakest = null;
            let lowestScore = Infinity;
            Object.keys(FINGERS).forEach(fid => {
                const m = this.getFingerMetrics(fid);
                if (m.totalHits < 5) return;
                const score = m.accuracy * 10 - (m.avgLatency / 10);
                if (score < lowestScore) {
                    lowestScore = score;
                    weakest = fid;
                }
            });
            return weakest ? FINGERS[weakest] : null;
        }

        generateDrillForFinger(fingerId) {
            const fingerKeys = [];
            Object.entries(KEY_FINGER_MAP).forEach(([key, fId]) => {
                if (fId === fingerId && key.length === 1 && /^[a-zA-Z0-9,./;'`\-=\[\]]$/.test(key)) {
                    if (!fingerKeys.includes(key.toLowerCase())) {
                        fingerKeys.push(key.toLowerCase());
                    }
                }
            });
            if (fingerKeys.length === 0) return 'asdf jkl; asdf jkl;';

            const patterns = [];
            fingerKeys.forEach(k => patterns.push(`${k}${k} ${k}${k}${k} ${k}`));
            for (let i = 0; i < fingerKeys.length; i++) {
                for (let j = i + 1; j < fingerKeys.length; j++) {
                    patterns.push(`${fingerKeys[i]}${fingerKeys[j]} ${fingerKeys[j]}${fingerKeys[i]}`);
                }
            }
            const tokens = [];
            for (let i = 0; i < 20; i++) {
                let word = '';
                const len = 2 + Math.floor(Math.random() * 3);
                for (let j = 0; j < len; j++) {
                    word += fingerKeys[Math.floor(Math.random() * fingerKeys.length)];
                }
                tokens.push(word);
            }
            return `${patterns.slice(0, 4).join(' ')} ${tokens.join(' ')}`;
        }

        resetAllStats() {
            try { localStorage.removeItem('fingerflow_diagnostics'); } catch(e){}
            this.fingerStats = this.loadStats();
        }
    }

    const diagnostics = new DiagnosticsTracker();

    // 8. TYPING ENGINE
    class TypingEngine {
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

            this.charStates = [];
            this.callbacks = {
                onCharChange: callbacks.onCharChange || (() => {}),
                onKeystroke: callbacks.onKeystroke || (() => {}),
                onStatsUpdate: callbacks.onStatsUpdate || (() => {}),
                onComplete: callbacks.onComplete || (() => {}),
            };
        }

        loadText(text) {
            this.reset();
            this.targetText = (text || '').replace(/\r\n/g, '\n').trim();
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
            if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'].includes(pressedKey)) {
                return false;
            }

            if (!this.isActive) {
                this.startTimer();
            }

            const targetChar = this.getCurrentChar();
            if (!targetChar) return false;

            const targetFinger = getFingerForKey(targetChar);
            const isSpace = targetChar === ' ' || targetChar === '\n';
            const isMatch = (pressedKey === targetChar) || (targetChar === '\n' && (pressedKey === 'Enter' || pressedKey === '\n'));

            this.totalKeystrokes++;

            if (isMatch) {
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

    // 9. ACADEMY MANAGER
    class AcademyManager {
        constructor() {
            this.progress = this.loadProgress();
            this.currentStageIndex = 0;
            this.currentLessonIndex = 0;
        }

        loadProgress() {
            try {
                const saved = localStorage.getItem('fingerflow_academy_progress');
                if (saved) return JSON.parse(saved);
            } catch (e) {}
            return {
                unlockedLessons: ['s1-l1'],
                lessonScores: {},
                totalStars: 0
            };
        }

        saveProgress() {
            try {
                localStorage.setItem('fingerflow_academy_progress', JSON.stringify(this.progress));
            } catch (e) {}
        }

        calculateStars(wpm, accuracy) {
            if (accuracy < 80) return 0;
            if (accuracy >= 98 && wpm >= 35) return 3;
            if (accuracy >= 94 && wpm >= 20) return 2;
            if (accuracy >= 85) return 1;
            return 1;
        }

        recordLessonCompletion(lessonId, stats) {
            const stars = this.calculateStars(stats.wpm, stats.accuracy);
            const existing = this.progress.lessonScores[lessonId] || { stars: 0, bestWpm: 0, bestAcc: 0 };

            const newStars = Math.max(existing.stars, stars);
            const bestWpm = Math.max(existing.bestWpm, stats.wpm);
            const bestAcc = Math.max(existing.bestAcc, stats.accuracy);

            this.progress.lessonScores[lessonId] = { stars: newStars, bestWpm, bestAcc };

            const allLessons = [];
            LESSON_STAGES.forEach(st => st.lessons.forEach(l => allLessons.push(l.id)));
            const currentIndex = allLessons.indexOf(lessonId);
            if (currentIndex >= 0 && currentIndex + 1 < allLessons.length) {
                const nextLessonId = allLessons[currentIndex + 1];
                if (!this.progress.unlockedLessons.includes(nextLessonId)) {
                    this.progress.unlockedLessons.push(nextLessonId);
                }
            }

            let total = 0;
            Object.values(this.progress.lessonScores).forEach(score => {
                total += score.stars;
            });
            this.progress.totalStars = total;
            this.saveProgress();
            return { stars, isNewUnlock: true };
        }

        isLessonUnlocked(lessonId) {
            return this.progress.unlockedLessons.includes(lessonId);
        }

        getLessonScore(lessonId) {
            return this.progress.lessonScores[lessonId] || { stars: 0, bestWpm: 0, bestAcc: 0 };
        }

        getCurrentLesson() {
            const stage = LESSON_STAGES[this.currentStageIndex];
            if (!stage) return null;
            return stage.lessons[this.currentLessonIndex] || null;
        }

        selectLesson(stageIndex, lessonIndex) {
            this.currentStageIndex = stageIndex;
            this.currentLessonIndex = lessonIndex;
            return this.getCurrentLesson();
        }

        nextLesson() {
            const stage = LESSON_STAGES[this.currentStageIndex];
            if (this.currentLessonIndex + 1 < stage.lessons.length) {
                this.currentLessonIndex++;
                return this.getCurrentLesson();
            } else if (this.currentStageIndex + 1 < LESSON_STAGES.length) {
                this.currentStageIndex++;
                this.currentLessonIndex = 0;
                return this.getCurrentLesson();
            }
            return null;
        }
    }

    const academy = new AcademyManager();

    // 10. ARCADE MANAGER
    const WORD_BANK = [
        'sky', 'flow', 'code', 'fast', 'hand', 'fire', 'neon', 'wave', 'glow', 'type',
        'star', 'spark', 'laser', 'focus', 'swift', 'pulse', 'orbit', 'cyber', 'flash',
        'rhythm', 'matrix', 'stream', 'engine', 'strike', 'galaxy', 'meteor', 'vortex',
        'quantum', 'phantom', 'circuit', 'dynamo', 'gravity', 'velocity'
    ];

    class ArcadeManager {
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

            this.meteors = [];
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

    // 11. MAIN APP CLASS
    class FingerFlowApp {
        constructor() {
            this.currentMode = 'academy'; // 'academy', 'shorthand', 'coder', 'arcade', 'speedtest', 'diagnostics'
            this.keyboardUI = null;
            this.handsUI = null;
            this.typingEngine = null;
            this.arcadeManager = null;
            this.speedTestDuration = 30;
            this.speedTestTimer = null;
            this.currentShorthandCategory = 'all';
            this.currentShorthandIndex = 0;
            this.currentCoderCategory = 'all';
            this.currentCoderIndex = 0;
        }

        init() {
            const canvas = document.getElementById('particle-canvas');
            if (canvas) particles.init(canvas);

            const kbContainer = document.getElementById('keyboard-container');
            const handsContainer = document.getElementById('hands-container');
            const hintBanner = document.getElementById('finger-hint-banner');

            this.keyboardUI = new KeyboardUI(kbContainer);
            this.handsUI = new HandsUI(handsContainer, hintBanner);

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

            this.setupEventListeners();
            this.switchMode('academy');
            this.renderAcademyCurriculum();
            this.loadCurrentAcademyLesson();
        }

        setupEventListeners() {
            window.addEventListener('keydown', (e) => this.handleGlobalKeyDown(e));

            // Clicking anywhere focuses the window and unlocks WebAudio
            window.addEventListener('click', () => {
                sounds.init();
            }, { once: false });

            // Theme Toggle Button
            const themeBtn = document.getElementById('theme-toggle-btn');
            const themeIcon = document.getElementById('theme-icon');
            const themeText = document.getElementById('theme-text');

            const applyTheme = (theme) => {
                if (theme === 'dark') {
                    document.body.classList.add('theme-dark');
                    if (themeIcon) themeIcon.textContent = '☀️';
                    if (themeText) themeText.textContent = 'Light';
                } else {
                    document.body.classList.remove('theme-dark');
                    if (themeIcon) themeIcon.textContent = '🌙';
                    if (themeText) themeText.textContent = 'Dark';
                }
            };

            const savedTheme = localStorage.getItem('fingerflow_theme') || 'light';
            applyTheme(savedTheme);

            if (themeBtn) {
                themeBtn.addEventListener('click', () => {
                    const isDark = document.body.classList.contains('theme-dark');
                    const nextTheme = isDark ? 'light' : 'dark';
                    applyTheme(nextTheme);
                    try { localStorage.setItem('fingerflow_theme', nextTheme); } catch(e){}
                });
            }

            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const mode = tab.dataset.mode;
                    this.switchMode(mode);
                });
            });

            const switchSelect = document.getElementById('switch-type-select');
            if (switchSelect) {
                switchSelect.addEventListener('change', (e) => {
                    sounds.setSwitchType(e.target.value);
                });
            }

            const volumeSlider = document.getElementById('volume-slider');
            if (volumeSlider) {
                volumeSlider.addEventListener('input', (e) => {
                    sounds.setVolume(parseFloat(e.target.value));
                });
            }

            const restartBtn = document.getElementById('btn-restart-lesson');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => {
                    if (this.currentMode === 'academy') {
                        this.loadCurrentAcademyLesson();
                    } else if (this.currentMode === 'speedtest') {
                        this.startSpeedTest();
                    } else if (this.currentMode === 'shorthand') {
                        this.loadShorthandDrill(this.currentShorthandIndex);
                    } else if (this.currentMode === 'coder') {
                        this.loadCoderDrill(this.currentCoderIndex);
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

            // Coder Control Buttons
            const coderRandBtn = document.getElementById('btn-coder-random');
            if (coderRandBtn) {
                coderRandBtn.addEventListener('click', () => this.startRandomCoder());
            }

            const coderResetBtn = document.getElementById('btn-coder-reset');
            if (coderResetBtn) {
                coderResetBtn.addEventListener('click', () => this.loadCoderDrill(this.currentCoderIndex));
            }

            const coderNextBtn = document.getElementById('btn-coder-next');
            if (coderNextBtn) {
                coderNextBtn.addEventListener('click', () => this.nextCoderDrill());
            }

            const arcadeStartBtn = document.getElementById('btn-start-arcade');
            if (arcadeStartBtn) {
                arcadeStartBtn.addEventListener('click', () => {
                    document.getElementById('arcade-overlay').style.display = 'none';
                    this.arcadeManager.start();
                });
            }

            const modalNextBtn = document.getElementById('modal-btn-next');
            if (modalNextBtn) {
                modalNextBtn.addEventListener('click', () => {
                    document.getElementById('completion-modal').classList.remove('is-open');
                    if (this.currentMode === 'shorthand') {
                        this.nextShorthandDrill();
                    } else if (this.currentMode === 'coder') {
                        this.nextCoderDrill();
                    } else {
                        const next = academy.nextLesson();
                        if (next) {
                            this.renderAcademyCurriculum();
                            this.loadCurrentAcademyLesson();
                        } else {
                            this.loadCurrentAcademyLesson();
                        }
                    }
                });
            }

            const modalRetryBtn = document.getElementById('modal-btn-retry');
            if (modalRetryBtn) {
                modalRetryBtn.addEventListener('click', () => {
                    document.getElementById('completion-modal').classList.remove('is-open');
                    if (this.currentMode === 'shorthand') {
                        this.loadShorthandDrill(this.currentShorthandIndex);
                    } else if (this.currentMode === 'coder') {
                        this.loadCoderDrill(this.currentCoderIndex);
                    } else {
                        this.loadCurrentAcademyLesson();
                    }
                });
            }

            const arcadeRetryBtn = document.getElementById('arcade-modal-btn-retry');
            if (arcadeRetryBtn) {
                arcadeRetryBtn.addEventListener('click', () => {
                    document.getElementById('arcade-gameover-modal').classList.remove('is-open');
                    this.arcadeManager.start();
                });
            }

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

            const resetStatsBtn = document.getElementById('btn-reset-diagnostics');
            if (resetStatsBtn) {
                resetStatsBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to reset all finger stats?')) {
                        diagnostics.resetAllStats();
                        this.renderDiagnosticsDashboard();
                    }
                });
            }

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
            sounds.init();

            if (e.code === 'Space' || e.code === 'Tab' || (e.code === 'Enter' && this.currentMode === 'coder')) {
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                }
            }

            if (this.currentMode === 'academy' || this.currentMode === 'speedtest' || this.currentMode === 'shorthand' || this.currentMode === 'coder') {
                if (e.key.length === 1 || e.key === 'Enter') {
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

            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.mode === mode);
            });

            document.querySelectorAll('.mode-view').forEach(view => {
                view.style.display = 'none';
            });

            if (mode !== 'arcade' && this.arcadeManager) {
                this.arcadeManager.stop();
            }

            const targetView = document.getElementById(`view-${mode}`);
            if (targetView) targetView.style.display = 'block';

            if (mode === 'academy') {
                this.loadCurrentAcademyLesson();
            } else if (mode === 'shorthand') {
                this.renderShorthandLab();
                this.loadShorthandDrill(this.currentShorthandIndex);
            } else if (mode === 'coder') {
                this.renderCoderLab();
                this.loadCoderDrill(this.currentCoderIndex);
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

            const titleEl = document.getElementById('active-lesson-title');
            const descEl = document.getElementById('active-lesson-desc');
            if (titleEl) titleEl.textContent = lesson.title;
            if (descEl) descEl.textContent = lesson.description;

            this.typingEngine.loadText(lesson.text);
        }

        updateTextDisplay() {
            if (this.currentMode === 'coder') {
                this.updateCoderDisplay();
                return;
            }

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

        updateCoderDisplay() {
            const codeArea = document.getElementById('typing-text-display-coder');
            const gutter = document.getElementById('coder-line-gutter');
            if (!codeArea || !gutter) return;

            const text = this.typingEngine.targetText;
            const currIdx = this.typingEngine.currentIndex;
            const charStates = this.typingEngine.charStates;

            const lines = text.split('\n');
            let runningCharCount = 0;
            let activeLineIdx = 0;

            for (let l = 0; l < lines.length; l++) {
                const lineLen = lines[l].length + 1;
                if (currIdx >= runningCharCount && currIdx < runningCharCount + lineLen) {
                    activeLineIdx = l;
                    break;
                }
                if (l === lines.length - 1 && currIdx >= runningCharCount) {
                    activeLineIdx = l;
                }
                runningCharCount += lineLen;
            }

            let gutterHtml = '';
            for (let l = 0; l < lines.length; l++) {
                const isActiveLine = l === activeLineIdx;
                gutterHtml += `<div class="coder-gutter-line ${isActiveLine ? 'is-active-line' : ''}">${l + 1}</div>`;
            }
            gutter.innerHTML = gutterHtml;

            let codeHtml = '';
            let charIndex = 0;

            for (let l = 0; l < lines.length; l++) {
                const lineText = lines[l];
                const isActiveLine = l === activeLineIdx;
                let lineCharsHtml = '';

                for (let c = 0; c < lineText.length; c++) {
                    const char = lineText[c];
                    const state = charStates[charIndex];
                    let charClass = 'char-pending';

                    if (charIndex === currIdx) {
                        charClass = 'char-current';
                    } else if (state === 'correct') {
                        charClass = 'char-correct';
                    } else if (state === 'error') {
                        charClass = 'char-incorrect';
                    }

                    const tokenClass = this.getCoderTokenClass(char);
                    const displayChar = char === ' ' ? '&nbsp;' : this.escapeHtml(char);
                    lineCharsHtml += `<span class="type-char ${charClass} ${charClass === 'char-pending' ? tokenClass : ''}">${displayChar}</span>`;
                    charIndex++;
                }

                if (l < lines.length - 1) {
                    const state = charStates[charIndex];
                    let charClass = 'char-pending';
                    if (charIndex === currIdx) {
                        charClass = 'char-current';
                    } else if (state === 'correct') {
                        charClass = 'char-correct';
                    } else if (state === 'error') {
                        charClass = 'char-incorrect';
                    }
                    lineCharsHtml += `<span class="type-char char-newline ${charClass}" title="Press Enter ↵">↵</span>`;
                    charIndex++;
                }

                codeHtml += `<div class="ide-code-line ${isActiveLine ? 'is-active-line' : ''}">${lineCharsHtml}</div>`;
            }

            codeArea.innerHTML = codeHtml;

            const activeLineEl = codeArea.querySelector('.ide-code-line.is-active-line');
            if (activeLineEl) {
                activeLineEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        getCoderTokenClass(char) {
            if ('{}[]()'.includes(char)) return 'token-sym';
            if ('=+-*/%<>!&|^~?:'.includes(char)) return 'token-op';
            if ('0123456789'.includes(char)) return 'token-num';
            if ("'\"`".includes(char)) return 'token-str';
            return '';
        }

        escapeHtml(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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

            if (this.currentMode === 'coder') {
                const modal = document.getElementById('completion-modal');
                const modalStars = document.getElementById('modal-stars');
                const modalWpm = document.getElementById('modal-wpm');
                const modalAcc = document.getElementById('modal-acc');
                const modalStreak = document.getElementById('modal-streak');

                if (modalWpm) modalWpm.textContent = `${stats.wpm} WPM`;
                if (modalAcc) modalAcc.textContent = `${stats.accuracy}%`;
                if (modalStreak) modalStreak.textContent = stats.streak;

                if (modalStars) {
                    let starsCount = 1;
                    if (stats.wpm >= 35 && stats.accuracy >= 95) starsCount = 3;
                    else if (stats.wpm >= 20 && stats.accuracy >= 88) starsCount = 2;

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

        renderCoderLab() {
            const catBar = document.getElementById('coder-categories-bar');
            if (catBar) {
                catBar.innerHTML = '';
                CODER_CATEGORIES.forEach(cat => {
                    const pill = document.createElement('button');
                    pill.className = `coder-cat-pill ${cat.id === this.currentCoderCategory ? 'active' : ''}`;
                    pill.innerHTML = `<span>${cat.icon}</span> ${cat.name}`;
                    pill.addEventListener('click', () => {
                        this.currentCoderCategory = cat.id;
                        this.renderCoderLab();
                    });
                    catBar.appendChild(pill);
                });
            }

            this.renderCoderGrid();
        }

        renderCoderGrid() {
            const grid = document.getElementById('coder-snippets-grid');
            if (!grid) return;

            grid.innerHTML = '';
            const filtered = CODER_SNIPPETS.map((s, idx) => ({ ...s, originalIdx: idx }))
                .filter(s => this.currentCoderCategory === 'all' || s.category === this.currentCoderCategory);

            filtered.forEach(item => {
                const card = document.createElement('div');
                const isActive = item.originalIdx === this.currentCoderIndex;
                card.className = `coder-snippet-card ${isActive ? 'is-active-drill' : ''}`;
                card.id = `coder-card-${item.originalIdx}`;

                const diffClass = item.difficulty.toLowerCase();

                card.innerHTML = `
                    <div class="coder-card-top">
                        <span class="coder-card-filename">${item.filename}</span>
                        <span class="coder-diff-badge diff-${diffClass}">${item.difficulty}</span>
                    </div>
                    <div class="coder-card-title">${item.title}</div>
                    <div class="coder-card-desc">${item.description}</div>
                    <pre class="coder-card-preview"><code>${this.escapeHtml(item.text.slice(0, 90))}${item.text.length > 90 ? '...' : ''}</code></pre>
                    <div class="coder-card-bottom">
                        <span class="coder-card-lang">${item.lang}</span>
                        <span class="coder-card-btn">Practice ➔</span>
                    </div>
                `;

                card.addEventListener('click', () => {
                    this.loadCoderDrill(item.originalIdx);
                });

                grid.appendChild(card);
            });
        }

        loadCoderDrill(index) {
            if (index < 0 || index >= CODER_SNIPPETS.length) index = 0;
            this.currentCoderIndex = index;
            const item = CODER_SNIPPETS[index];
            if (!item) return;

            const fileTabName = document.getElementById('coder-file-name');
            const fileTabLang = document.getElementById('coder-file-lang');
            const fileTabIcon = document.getElementById('coder-file-icon');
            const titleEl = document.getElementById('coder-drill-title');
            const descEl = document.getElementById('coder-drill-desc');
            const diffBadge = document.getElementById('coder-diff-badge');

            if (fileTabName) fileTabName.textContent = item.filename;
            if (fileTabLang) fileTabLang.textContent = item.lang.toUpperCase();
            if (fileTabIcon) {
                const icons = { javascript: '📜', typescript: '📜', python: '🐍', cpp: '⚡', java: '⚡', html: '🌐', css: '🌐', sql: '🗄️', bash: '🖥️', json: '🔣' };
                fileTabIcon.textContent = icons[item.lang] || '💻';
            }
            if (titleEl) titleEl.textContent = item.title;
            if (descEl) descEl.textContent = item.description;
            if (diffBadge) {
                diffBadge.textContent = item.difficulty;
                diffBadge.className = `coder-diff-badge diff-${item.difficulty.toLowerCase()}`;
            }

            this.renderCoderGrid();
            this.typingEngine.loadText(item.text);

            const card = document.getElementById(`coder-card-${index}`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        startRandomCoder() {
            const filtered = CODER_SNIPPETS.map((s, idx) => ({ ...s, originalIdx: idx }))
                .filter(s => this.currentCoderCategory === 'all' || s.category === this.currentCoderCategory);
            if (filtered.length > 0) {
                const randItem = filtered[Math.floor(Math.random() * filtered.length)];
                this.loadCoderDrill(randItem.originalIdx);
            }
        }

        nextCoderDrill() {
            const nextIdx = (this.currentCoderIndex + 1) % CODER_SNIPPETS.length;
            this.loadCoderDrill(nextIdx);
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

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const app = new FingerFlowApp();
            app.init();
        });
    } else {
        const app = new FingerFlowApp();
        app.init();
    }
})();
