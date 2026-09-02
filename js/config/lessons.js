// Structured curriculum for 10-finger touch typing mastery
export const LESSON_STAGES = [
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

// Shorthand categories and expansion dictionary for interactive Shorthand Lab
export const SHORTHAND_CATEGORIES = [
    { id: 'all', name: 'All Shorthand', icon: '⚡' },
    { id: 'chat', name: 'Chat & Messaging', icon: '💬' },
    { id: 'business', name: 'Business & Office', icon: '💼' },
    { id: 'contractions', name: 'English Contractions', icon: '✍️' },
    { id: 'tech', name: 'Tech & Dev', icon: '💻' }
];

export const SHORTHAND_DICTIONARY = [
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

// Quick quotes for speed test mode
export const SPEED_TEST_TEXTS = [
    "Simplicity is the soul of efficiency. Good code is its own best documentation.",
    "Practice does not make perfect. Only perfect practice makes perfect.",
    "The keyboard is the instrument of the digital craftsman. Play it with precision and grace.",
    "Speed will come automatically when your accuracy and muscle memory are flawless.",
    "Do not look down at the keys. Trust your fingers and keep your eyes on the screen."
];
