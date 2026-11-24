export const learningTopics = [
  {
    id: "html",
    title: "HTML",
    category: "HTML",
    track: "Foundations",
    level: "Beginner",
    duration: "4 lessons",
    icon: "</>",
    summary: "Build clear page structure with semantic, accessible HTML.",
    modules: ["Document structure and semantic elements", "Headings, links, and navigation", "Images and embedded content", "Accessible forms and validation"],
    notes: [
      "Use one main heading for the page and keep headings in a logical order.",
      "Choose semantic elements such as header, nav, main, article, and footer.",
      "Connect each form label to its input with matching for and id values.",
      "Most HTML elements have an opening and closing tag; void elements such as img do not."
    ],
    code: "<main>\n  <h1>My first page</h1>\n  <p>Built with semantic HTML.</p>\n  <a href=\"/about\">Learn more</a>\n</main>",
    links: [
      { label: "CodeStart HTML notes", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content" },
      { label: "Explore HTML on web.dev", url: "https://web.dev/learn/html" }
    ]
  },
  {
    id: "css",
    title: "CSS",
    category: "CSS",
    track: "Foundations",
    level: "Beginner",
    duration: "5 lessons",
    icon: "#",
    summary: "Style content and create layouts that adapt to different screens.",
    modules: ["Selectors, cascade, and inheritance", "Typography, color, and spacing", "Flexbox and grid layouts", "Responsive layouts and media queries", "Transitions and motion preferences"],
    notes: [
      "A CSS rule has a selector and a declaration block containing property-value pairs.",
      "If a style does not appear, inspect the element and check computed styles and selector specificity.",
      "Prefer flexible units and layouts such as grid and flexbox over fixed page widths.",
      "Use a media query when the layout needs to change at a particular viewport size."
    ],
    code: ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n}",
    links: [
      { label: "CSS reference", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference" },
      { label: "Explore CSS on web.dev", url: "https://web.dev/learn/css" }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript",
    category: "JavaScript",
    track: "Foundations",
    level: "Beginner",
    duration: "5 lessons",
    icon: "JS",
    summary: "Add behavior, validate data, and respond to user actions.",
    modules: ["Values, variables, and types", "Conditions, loops, and functions", "DOM events and user input", "Promises and asynchronous requests", "Debugging with browser tools"],
    notes: [
      "Use const by default and let when a variable needs reassignment.",
      "Check the browser console and the exact file and line in an error message.",
      "Use === for comparisons to avoid unexpected type conversion.",
      "Handle asynchronous work with async/await and catch failures explicitly."
    ],
    code: "const button = document.querySelector(\"#save\");\nbutton?.addEventListener(\"click\", () => {\n  console.log(\"Saved\");\n});",
    links: [
      { label: "JavaScript reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference" },
      { label: "Explore JavaScript on web.dev", url: "https://web.dev/learn/javascript" }
    ]
  },
  {
    id: "react",
    title: "React",
    category: "React",
    track: "Frameworks",
    level: "Intermediate",
    duration: "4 lessons",
    icon: "⚛",
    summary: "Build interfaces from reusable components, props, and state.",
    modules: ["Components and JSX", "Props and rendering lists", "State and user interactions", "Effects and data fetching"],
    notes: [
      "Component names begin with a capital letter and return JSX.",
      "Pass data into components with props; use state for data that changes over time.",
      "Never mutate state directly. Create a new array or object when updating it.",
      "Give rendered list items stable keys and call Hooks at the top level of a component."
    ],
    code: "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}",
    links: [
      { label: "React learn", url: "https://react.dev/learn" },
      { label: "React reference", url: "https://react.dev/reference/react" }
    ]
  },
  {
    id: "tools",
    title: "Browser & developer tools",
    category: "Tools",
    track: "Practice",
    level: "Beginner",
    duration: "4 lessons",
    icon: "⌘",
    summary: "Use browser and project tools to inspect, debug, and improve your work.",
    modules: ["Inspecting elements and styles", "Console messages and breakpoints", "Network requests and storage", "Running a local project with npm"],
    notes: [
      "The browser console shows JavaScript errors and warnings.",
      "The Network panel helps diagnose failed requests, status codes, and missing assets.",
      "Run npm commands from the folder containing package.json.",
      "Read the first useful error in the terminal; later errors can be consequences of it."
    ],
    code: "npm.cmd install\nnpm.cmd run dev",
    links: [
      { label: "Chrome DevTools", url: "https://developer.chrome.com/docs/devtools/" },
      { label: "Vite guide", url: "https://vite.dev/guide/" }
    ]
  },
  {
    id: "accessibility",
    title: "Accessibility",
    category: "Accessibility",
    track: "Quality",
    level: "Beginner",
    duration: "4 lessons",
    icon: "A11Y",
    summary: "Make web experiences usable with different devices and ways of interacting.",
    modules: ["Semantic structure and accessible names", "Keyboard access and focus", "Color contrast and readable content", "Testing with assistive technology"],
    notes: ["Prefer native HTML controls over recreating them with generic elements.", "Every form control needs a programmatically associated label.", "Keep focus visible and make all actions possible using a keyboard.", "Do not rely on color alone to communicate meaning."],
    code: "<label for=\"email\">Email address</label>\n<input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" />",
    links: [
      { label: "Explore accessibility on web.dev", url: "https://web.dev/learn/accessibility" },
      { label: "WAI accessibility tutorials", url: "https://www.w3.org/WAI/tutorials/" }
    ]
  },
  {
    id: "performance",
    title: "Performance",
    category: "Performance",
    track: "Quality",
    level: "Intermediate",
    duration: "4 lessons",
    icon: "↗",
    summary: "Find slow experiences and make pages feel faster and more responsive.",
    modules: ["Measuring real user experience", "Reducing render-blocking work", "Loading images and fonts efficiently", "Improving interaction responsiveness"],
    notes: ["Measure before changing code so you know which work matters.", "Compress and appropriately size images before sending them to visitors.", "Load only the scripts and styles a page actually needs.", "Test on slower devices and networks as well as your development machine."],
    code: "<img src=\"landscape.webp\" alt=\"Mountain landscape\" width=\"800\" height=\"500\" loading=\"lazy\" />",
    links: [
      { label: "Explore performance on web.dev", url: "https://web.dev/learn/performance" },
      { label: "Web Vitals", url: "https://web.dev/articles/vitals" }
    ]
  },
  {
    id: "privacy",
    title: "Privacy & security basics",
    category: "Privacy",
    track: "Quality",
    level: "Beginner",
    duration: "3 lessons",
    icon: "◇",
    summary: "Build trust by collecting less data and protecting what users share.",
    modules: ["Collecting only necessary information", "Safe handling of user input", "Secure connections and browser permissions"],
    notes: ["Explain why information is needed before requesting it.", "Never expose API keys, passwords, or private credentials in browser code.", "Use HTTPS and review third-party scripts and embedded services.", "Treat user input as untrusted and validate it at the appropriate boundary."],
    code: "const publicConfig = { theme: \"light\" };\n// Keep private API keys on a trusted server, never in frontend code.",
    links: [
      { label: "Explore privacy on web.dev", url: "https://web.dev/learn/privacy" },
      { label: "OWASP cheat sheets", url: "https://cheatsheetseries.owasp.org/" }
    ]
  },
  {
    id: "images",
    title: "Images",
    category: "Images",
    track: "Design & media",
    level: "Beginner",
    duration: "3 lessons",
    icon: "▧",
    summary: "Choose, describe, and deliver images thoughtfully for different screens.",
    modules: ["Writing useful alternative text", "Choosing formats and image sizes", "Responsive image sources"],
    notes: ["Write alt text that communicates an image's purpose in context.", "Use empty alt text for decorative images so screen readers can skip them.", "Serve appropriately sized image files to avoid unnecessary downloads.", "Set image dimensions to reduce layout shifts while content loads."],
    code: "<img\n  src=\"team-800.webp\"\n  alt=\"The project team reviewing a design\"\n  width=\"800\"\n  height=\"533\"\n/>",
    links: [
      { label: "Explore images on web.dev", url: "https://web.dev/learn/images" },
      { label: "Responsive images guide", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images" }
    ]
  },
  {
    id: "design",
    title: "Responsive design",
    category: "Design",
    track: "Design & media",
    level: "Beginner",
    duration: "4 lessons",
    icon: "▣",
    summary: "Create layouts that stay clear and usable across screen sizes and input types.",
    modules: ["Designing from small screens upward", "Flexible grids and content sizing", "Breakpoints based on content", "Touch, pointer, and motion preferences"],
    notes: ["Let content determine when a layout needs a breakpoint.", "Use fluid widths and CSS grid or flexbox instead of fixed page widths.", "Check text zoom and narrow screens, not just device presets.", "Respect preferences such as reduced motion and increased contrast."],
    code: ".layout {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));\n  gap: 1rem;\n}",
    links: [
      { label: "Explore design on web.dev", url: "https://web.dev/learn/design" },
      { label: "CSS layout guide", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout" }
    ]
  },
  {
    id: "forms",
    title: "Forms",
    category: "Forms",
    track: "Practice",
    level: "Beginner",
    duration: "4 lessons",
    icon: "☷",
    summary: "Design forms that are understandable, keyboard friendly, and resilient.",
    modules: ["Labels and appropriate input types", "Built-in validation and helpful errors", "Submitting and processing form data", "Reducing friction on mobile"],
    notes: ["Use labels that remain visible and clearly identify each field.", "Choose input types that help users enter the right data.", "Explain validation errors and how to fix them near the affected field.", "A frontend form is not secure storage; validate data on a trusted server too."],
    code: "<label for=\"email\">Email</label>\n<input id=\"email\" name=\"email\" type=\"email\" required />",
    links: [
      { label: "Explore forms on web.dev", url: "https://web.dev/learn/forms" },
      { label: "HTML forms guide", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms" }
    ]
  },
  {
    id: "pwa",
    title: "Progressive web apps",
    category: "PWA",
    track: "Advanced",
    level: "Intermediate",
    duration: "4 lessons",
    icon: "▤",
    summary: "Understand installable web apps and carefully designed offline behavior.",
    modules: ["Web app manifests and installation", "Service worker lifecycle", "Caching strategies and updates", "Offline states and user expectations"],
    notes: ["A service worker can intercept requests, so keep its behavior intentional.", "Choose caching rules based on how fresh each resource must be.", "Tell users when content may be offline or out of date.", "Test updates and offline behavior in browser developer tools."],
    code: "if (\"serviceWorker\" in navigator) {\n  navigator.serviceWorker.register(\"/service-worker.js\");\n}",
    links: [
      { label: "Explore PWA on web.dev", url: "https://web.dev/learn/pwa" },
      { label: "Service worker API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" }
    ]
  },
  {
    id: "testing",
    title: "Testing",
    category: "Testing",
    track: "Practice",
    level: "Intermediate",
    duration: "4 lessons",
    icon: "✓",
    summary: "Catch regressions and build confidence with repeatable checks.",
    modules: ["Testing small units of behavior", "Checking user journeys in the browser", "Accessibility and visual checks", "Running tests in a development workflow"],
    notes: ["Test behavior users rely on rather than implementation details.", "Include realistic boundary cases and failure states.", "Keep tests independent so one failure does not hide another.", "Run checks after changes and investigate failures instead of skipping them."],
    code: "if (total !== expectedTotal) {\n  throw new Error(`Expected ${expectedTotal}, received ${total}`);\n}",
    links: [
      { label: "Explore testing on web.dev", url: "https://web.dev/learn/testing" },
      { label: "Testing Library", url: "https://testing-library.com/docs/" }
    ]
  },
  {
    id: "ai",
    title: "AI for web developers",
    category: "AI",
    track: "Advanced",
    level: "Intermediate",
    duration: "3 lessons",
    icon: "✦",
    summary: "Explore responsible ways to use AI features and tools in web projects.",
    modules: ["Where AI fits in a web experience", "Privacy, consent, and user expectations", "Evaluating outputs and handling failures"],
    notes: ["Be clear when users are interacting with generated or probabilistic output.", "Do not send personal or confidential data to an AI service without a clear, safe basis.", "Design a useful fallback for unavailable services and incorrect outputs.", "Verify generated code and factual claims before relying on them."],
    code: "try {\n  const result = await getSuggestion(userPrompt);\n  showSuggestion(result);\n} catch {\n  showMessage(\"Suggestions are temporarily unavailable.\");\n}",
    links: [
      { label: "Explore AI on web.dev", url: "https://web.dev/learn/ai" },
      { label: "Web AI resources", url: "https://developer.chrome.com/docs/ai/" }
    ]
  }
];
