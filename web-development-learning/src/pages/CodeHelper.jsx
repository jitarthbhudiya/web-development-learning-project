import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import { errorTopics } from "../data/errors.js";

const knownPatterns = [
  { pattern: /referenceerror|is not defined|not defined/, topic: "Reference errors" },
  { pattern: /typeerror|cannot read propert|is not a function|undefined is not an object/, topic: "Type errors" },
  { pattern: /syntaxerror|unexpected token|unterminated|missing .* after argument list/, topic: "Syntax errors" },
  { pattern: /failed to resolve import|cannot find module|module not found|err_module_not_found/, topic: "Module and dependency errors" },
  { pattern: /each child in a list|unique key prop|missing.*key/, topic: "Missing React list keys" },
  { pattern: /invalid hook call|hook can only be called/, topic: "React errors" },
  { pattern: /failed to fetch|cors|networkerror|net::err_/, topic: "Network and API errors" },
  { pattern: /json\.parse|unexpected end of json|unexpected token.*json/, topic: "JSON parsing errors" },
  { pattern: /vite.*not recognized|npm.ps1|execution policy/, topic: "Vite configuration errors" },
  { pattern: /overflow|horizontal scroll|responsive|mobile layout/, topic: "CSS layout and responsive errors" },
  { pattern: /closing tag|unclosed tag|html validation|duplicate id/, topic: "HTML errors" }
];

const ignoredWords = new Set(["this", "that", "with", "from", "your", "when", "what", "error", "code", "have", "does", "then", "into", "the", "and", "for", "not"]);

function findSuggestions(input, language) {
  const normalized = input.toLowerCase();
  const matchedPattern = knownPatterns.find(item => item.pattern.test(normalized));
  const tokens = normalized.match(/[a-z][a-z0-9_-]{2,}/g) ?? [];
  const languageKey = language === "Auto-detect" ? "" : language.split(" ")[0].toLowerCase();
  const rankedTopics = errorTopics.map(topic => {
    const searchable = `${topic.title} ${topic.category} ${topic.description} ${topic.cause} ${topic.example} ${topic.fix}`.toLowerCase();
    const textScore = new Set(tokens.filter(token => !ignoredWords.has(token) && searchable.includes(token))).size;
    const languageScore = languageKey && topic.category.toLowerCase().includes(languageKey) ? 2 : 0;
    const score = textScore + languageScore;
    return { topic, score };
  }).filter(item => item.score > 0);

  if (matchedPattern) {
    const primary = errorTopics.find(topic => topic.title === matchedPattern.topic);
    if (primary) return [primary];
  }

  return rankedTopics.sort((a, b) => b.score - a.score).slice(0, 3).map(item => item.topic);
}

export default function CodeHelper() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("Auto-detect");
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const question = input.trim();
    if (!question) {
      setResult({ message: "Paste a code snippet or error message to get started.", suggestions: [] });
      return;
    }
    setResult({ message: "", suggestions: findSuggestions(question, language) });
  }

  return <div className="page-wrap">
    <section className="page-hero"><div className="container">
      <div className="eyebrow">PRIVATE, IN-BROWSER HELP</div>
      <h1>Code <span>helper</span></h1>
      <p>Paste a snippet, an error message, or a few search words. Get related explanations and practical next steps from the learning library.</p>
    </div></section>
    <section className="section-pad"><div className="container helper-container">
      <SectionHeading eyebrow="CODE COACH · LOCAL BETA" title="What are you stuck on?" description="This helper searches the site's curated troubleshooting notes in your browser. It does not send or save your code." />
      <form className="helper-form" onSubmit={handleSubmit}>
        <label htmlFor="code-language">Technology</label>
        <select id="code-language" value={language} onChange={event => setLanguage(event.target.value)}>
          {["Auto-detect", "HTML", "CSS", "JavaScript", "React", "Vite / npm"].map(option => <option key={option}>{option}</option>)}
        </select>
        <label htmlFor="code-question">Code snippet, error message, or search terms</label>
        <textarea id="code-question" value={input} onChange={event => setInput(event.target.value)} placeholder={"For example:\nTypeError: Cannot read properties of undefined\n\nOr paste a short code example and describe what you expected."} rows="8" />
        <div className="helper-form-footer"><span>Your input stays in this browser.</span><button type="submit" className="btn-primary-custom">Find suggestions <span>→</span></button></div>
      </form>

      {result && <section className="helper-results" aria-live="polite">
        <h2>{result.message ? "Add something to search" : "Suggested next steps"}</h2>
        {result.message ? <p>{result.message}</p> : result.suggestions.length > 0
          ? <div className="row g-4">{result.suggestions.map(topic => <div className="col-md-6" key={topic.id}>
            <article className="content-card helper-result-card h-100">
              <div className="category-pill">{topic.category}</div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <div className="mini-detail"><strong>Common cause</strong><span>{topic.cause}</span></div>
              <div className="mini-detail"><strong>Try this</strong><span>{topic.fix}</span></div>
              <pre className="code-sample"><code>{topic.example}</code></pre>
              <Link to="/errors" className="helper-link">Browse error library →</Link>
            </article>
          </div>)}</div>
          : <div className="notice-box"><strong>No direct match in the guide library yet</strong><p>Try searching for the exact error name, a short phrase such as “not defined” or “failed to resolve import”, or browse the <Link to="/errors">error library</Link> and <Link to="/fix-guides">fix guides</Link>.{language !== "Auto-detect" ? ` You selected ${language}; include the full console or terminal message for better matches.` : ""}</p></div>}
        {!result.message && <p className="helper-disclaimer">These are educational suggestions from a small local guide library, not an AI-generated diagnosis. Review and test changes before using them.</p>}
      </section>}
    </div></section>
  </div>;
}
