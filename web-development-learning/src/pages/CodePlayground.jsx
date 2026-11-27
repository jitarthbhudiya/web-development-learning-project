import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import "./CodePlayground.css";

const starterHTML = `<div class="demo-card">
  <h1>Hello, CodeStart!</h1>
  <p>Welcome to my first website.</p>
  <button onclick="changeMessage()">Click me</button>
  <p id="message" aria-live="polite"></p>
</div>`;

const starterCSS = `body {
  font-family: Arial, sans-serif;
  background: #f1f5f9;
  padding: 30px;
}
.demo-card {
  max-width: 500px;
  margin: 30px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px #00000015;
}
h1 { color: #2563eb; }
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 7px;
  cursor: pointer;
}`;

const starterJS = `function changeMessage() {
  document.getElementById("message").textContent =
    "Great job! Your JavaScript works!";
}`;

const languageTabs = [
  ["html", "HTML"],
  ["css", "CSS"],
  ["js", "JavaScript"],
];

function createPreviewDocument(html, css, js) {
  const safeCSS = css.replace(/<\/style/gi, "<\\/style");
  const safeJS = js.replace(/<\/script/gi, "<\\/script");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; font-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'; worker-src 'none'">
  <style>${safeCSS}</style>
</head>
<body>
  ${html}
  <script>
    window.addEventListener("error", function (event) {
      const error = document.createElement("p");
      error.setAttribute("role", "alert");
      error.style.cssText = "color:#b91c1c;font:14px monospace;padding:12px";
      error.textContent = "JavaScript error: " + event.message;
      document.body.appendChild(error);
    });
  <\/script>
  <script>${safeJS}<\/script>
</body>
</html>`;
}

export default function CodePlayground() {
  const [html, setHtml] = useState(starterHTML);
  const [css, setCss] = useState(starterCSS);
  const [js, setJs] = useState(starterJS);
  const [activeTab, setActiveTab] = useState("html");
  const [previewKey, setPreviewKey] = useState(0);
  const [copyMessage, setCopyMessage] = useState("");

  const srcDoc = useMemo(
    () => createPreviewDocument(html, css, js),
    [html, css, js]
  );

  function runCode() {
    setPreviewKey(previous => previous + 1);
  }

  function resetCode() {
    setHtml(starterHTML);
    setCss(starterCSS);
    setJs(starterJS);
    setActiveTab("html");
    setPreviewKey(previous => previous + 1);
    setCopyMessage("");
  }

  async function copyCode() {
    const allCode = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}\n\n// JavaScript\n${js}`;
    try {
      await navigator.clipboard.writeText(allCode);
      setCopyMessage("Code copied successfully.");
    } catch {
      setCopyMessage("Copy failed. Select and copy the code manually.");
    }
  }

  const activeCode = activeTab === "html" ? html : activeTab === "css" ? css : js;
  const setActiveCode = activeTab === "html" ? setHtml : activeTab === "css" ? setCss : setJs;
  const activeLanguage = languageTabs.find(([key]) => key === activeTab)?.[1] ?? "HTML";

  return <div className="page-wrap">
    <section className="page-hero"><div className="container">
      <div className="eyebrow">CODESTART LEARNING TOOLS</div>
      <h1>Live Code <span>Playground</span></h1>
      <p>Write HTML, style it with CSS, add JavaScript, and see your webpage come to life.</p>
    </div></section>
    <section className="section-pad"><div className="container playground-container">
      <SectionHeading eyebrow="LEARN BY BUILDING" title="Try code and see what it does" description="Edit the starter example, then run it to refresh your preview. Your code stays in this browser." />
      <div className="playground-toolbar">
        <div className="playground-tabs" role="tablist" aria-label="Code language">
          {languageTabs.map(([key, label]) => <button
            key={key}
            id={`playground-tab-${key}`}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            aria-controls="playground-editor"
            className={activeTab === key ? "active" : ""}
            onClick={() => setActiveTab(key)}
          >{label}</button>)}
        </div>
        <div className="playground-actions">
          <button type="button" className="playground-run" onClick={runCode}>Run preview</button>
          <button type="button" className="playground-copy" onClick={copyCode}>Copy code</button>
          <button type="button" className="playground-reset" onClick={resetCode}>Reset</button>
        </div>
      </div>
      <div className="playground-workspace">
        <section className="playground-editor-panel" aria-label="Code editor">
          <div className="playground-panel-heading">
            <span>CODE EDITOR</span>
            <span className="playground-language">{activeLanguage}</span>
          </div>
          <textarea
            id="playground-editor"
            className="playground-editor"
            role="tabpanel"
            aria-labelledby={`playground-tab-${activeTab}`}
            aria-label={`${activeLanguage} editor`}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            value={activeCode}
            onChange={event => setActiveCode(event.target.value)}
          />
          <div className="playground-editor-footer">Edits appear in the preview when you run your code.</div>
        </section>
        <section className="playground-preview-panel" aria-label="Live preview">
          <div className="playground-panel-heading">
            <span>LIVE PREVIEW</span>
            <span className="playground-preview-indicator">Sandboxed</span>
          </div>
          <iframe
            key={previewKey}
            title="Code playground preview"
            className="playground-preview"
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            srcDoc={srcDoc}
          />
        </section>
      </div>
      {copyMessage && <p className="playground-copy-message" role="status">{copyMessage}</p>}
      <div className="playground-tips">
        <SectionHeading eyebrow="QUICK START" title="How to use the playground" />
        <ol>
          <li>Choose HTML to edit your webpage structure.</li>
          <li>Choose CSS to change colors, sizes, and layout.</li>
          <li>Choose JavaScript to add interactive features.</li>
          <li>Select <strong>Run preview</strong> to refresh the result.</li>
          <li>Select <strong>Reset</strong> to restore the starter example.</li>
        </ol>
      </div>
      <p className="playground-safety-note">The preview runs your code in a restricted iframe, but this is not a guarantee that arbitrary code is completely safe. Do not paste passwords, API keys, personal information, or other secrets.</p>
    </div></section>
  </div>;
}
