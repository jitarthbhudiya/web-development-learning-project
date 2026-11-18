export const learningTopics = [
  {
    id: "html",
    title: "HTML",
    category: "HTML",
    summary: "Structure a page with meaningful, accessible elements.",
    notes: [
      "Use one main heading for the page and keep headings in a logical order.",
      "Choose semantic elements such as header, nav, main, article, and footer.",
      "Connect each form label to its input with matching for and id values.",
      "Most HTML elements have an opening and closing tag; void elements such as img do not."
    ],
    code: "<main>\n  <h1>My first page</h1>\n  <p>Built with semantic HTML.</p>\n  <a href=\"/about\">Learn more</a>\n</main>",
    links: [
      { label: "MDN HTML guide", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content" },
      { label: "HTML elements reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element" }
    ]
  },
  {
    id: "css",
    title: "CSS",
    category: "CSS",
    summary: "Style content and create layouts that adapt to different screens.",
    notes: [
      "A CSS rule has a selector and a declaration block containing property-value pairs.",
      "If a style does not appear, inspect the element and check computed styles and selector specificity.",
      "Prefer flexible units and layouts such as grid and flexbox over fixed page widths.",
      "Use a media query when the layout needs to change at a particular viewport size."
    ],
    code: ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n}",
    links: [
      { label: "MDN CSS guide", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics" },
      { label: "CSS reference", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference" }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript",
    category: "JavaScript",
    summary: "Add behavior, validate data, and respond to user actions.",
    notes: [
      "Use const by default and let when a variable needs reassignment.",
      "Check the browser console and the exact file and line in an error message.",
      "Use === for comparisons to avoid unexpected type conversion.",
      "Handle asynchronous work with async/await and catch failures explicitly."
    ],
    code: "const button = document.querySelector(\"#save\");\nbutton?.addEventListener(\"click\", () => {\n  console.log(\"Saved\");\n});",
    links: [
      { label: "MDN JavaScript guide", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting" },
      { label: "JavaScript reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference" }
    ]
  },
  {
    id: "react",
    title: "React",
    category: "React",
    summary: "Build interfaces from reusable components and state.",
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
    title: "Web tools",
    category: "Tools",
    summary: "Use browser and project tools to find the source of a problem.",
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
  }
];
