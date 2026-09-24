// Coder Dojo Lesson & Snippet Catalog for Programmer Touch Typing

export const CODER_CATEGORIES = [
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

export const CODER_SNIPPETS = [
    // -------------------------------------------------------------
    // CATEGORY: SYMBOLS & OPERATORS
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // CATEGORY: JAVASCRIPT & TYPESCRIPT
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // CATEGORY: PYTHON
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // CATEGORY: C++ & JAVA
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // CATEGORY: HTML & CSS
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // CATEGORY: SQL QUERIES
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // CATEGORY: GIT & TERMINAL CLI
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // CATEGORY: VARIABLE CASING
    // -------------------------------------------------------------
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
