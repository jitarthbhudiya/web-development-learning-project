import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import { errorTopics } from "../data/errors.js";
const knownPatterns = [
  { pattern: /referenceerror|is not defined|not defined/, topic: "Reference errors" },
  { pattern: /typeerror|cannot read propert|is not a function|undefined is not an object/, topic: "Type errors" },
  { pattern: /each child in a list|unique key prop|missing.*key/, topic: "Missing React list keys" },
  { pattern: /invalid hook call|hook can only be called/, topic: "React errors" },
  { pattern: /failed to fetch|cors|networkerror|net::err_/, topic: "Network and API errors" },
  { pattern: /json\.parse|unexpected end of json|unexpected token.*json/, topic: "JSON parsing errors" },
  { pattern: /syntaxerror|unexpected token|unterminated|missing .* after argument list/, topic: "Syntax errors" },
  { pattern: /failed to resolve import|cannot find module|module not found|err_module_not_found/, topic: "Module and dependency errors" },
  { pattern: /vite.*not recognized|npm.ps1|execution policy/, topic: "Vite configuration errors" },
  { pattern: /overflow|horizontal scroll|responsive|mobile layout/, topic: "CSS layout and responsive errors" },
  { pattern: /closing tag|unclosed tag|html validation|duplicate id/, topic: "HTML errors" }
];

const ignoredWords = new Set(["this", "that", "with", "from", "your", "when", "what", "error", "code", "have", "does", "then", "into", "the", "and", "for", "not"]);

const webSearches = [
  { label: "Google", url: query => `https://www.google.com/search?q=${encodeURIComponent(query)}` },
  { label: "Bing", url: query => `https://www.bing.com/search?q=${encodeURIComponent(query)}` },
  { label: "DuckDuckGo", url: query => `https://duckduckgo.com/?q=${encodeURIComponent(query)}` },
  { label: "Stack Overflow", url: query => `https://stackoverflow.com/search?q=${encodeURIComponent(query)}` },
  { label: "GitHub", url: query => `https://github.com/search?q=${encodeURIComponent(query)}&type=code` },
  { label: "MDN", url: query => `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(query)}` }
];

function findSuggestions(input, language) {
  const normalized = input.toLowerCase();
  const matchedPattern = knownPatterns.find(item => item.pattern.test(normalized));
  const tokens = normalized.match(/[a-z][a-z0-9_-]{2,}/g) ?? [];
  const languageKey = language === "Auto-detect" ? "" : language.split(" ")[0].toLowerCase();
  const rankedTopics = errorTopics.map(topic => {
    const searchable = `${topic.title} ${topic.category} ${topic.description} ${topic.cause} ${topic.example} ${topic.fix}`.toLowerCase();
    const textScore = new Set(tokens.filter(token => !ignoredWords.has(token) && searchable.includes(token))).size;
    const languageScore = languageKey && topic.category.toLowerCase().includes(languageKey) ? 2 : 0;
    return { topic, score: textScore + languageScore };
  }).filter(item => item.score > 0);

  if (matchedPattern) {
    const primary = errorTopics.find(topic => topic.title === matchedPattern.topic);
    if (primary) return [primary];
  }

  return rankedTopics.sort((a, b) => b.score - a.score).slice(0, 3).map(item => item.topic);
}

function buildAnswer(suggestions) {
  if (suggestions.length === 0) {
    return "I couldn't find an exact match in my local guide library. Try including the complete error message and the technology you're using. You can also search the web sources below or browse the error library.";
  }
  const topic = suggestions[0];
  return `This looks most like ${topic.title.toLowerCase()}. ${topic.description} A common cause is ${topic.cause.toLowerCase()} What to try: ${topic.fix}`;
}

export default function CodeHelper() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("Auto-detect");
  const [messages, setMessages] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const liveSuggestions = useMemo(
    () => input.trim().length >= 4 ? findSuggestions(input, language).slice(0, 3) : [],
    [input, language]
  );

  function ask(question) {
    const text = question.trim();
    if (!text) {
      setValidationMessage("Paste an error, a code snippet, or a few search words first.");
      return;
    }

    const suggestions = findSuggestions(text, language);
    const id = `${Date.now()}-${Math.random()}`;
    setMessages(current => [...current, {
      id,
      question: text,
      answer: buildAnswer(suggestions),
      suggestions
    }]);
    setInput("");
    setValidationMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    ask(input);
  }

  return <div className="page-wrap">
    <section className="page-hero"><div className="container">
      <div className="eyebrow">CODE ASSISTANT · LOCAL GUIDE + WEB SEARCH</div>
      <h1>Code <span>helper</span></h1>
      <p>Paste an error or code snippet to get a quick explanation, then search the web and coding references for more solutions.</p>
    </div></section>
    <section className="section-pad"><div className="container helper-container">
      <SectionHeading eyebrow="YOUR TROUBLESHOOTING CHAT" title="What are you stuck on?" description="Get instant suggestions from the local guide library, then search coding resources for more help." />
      <div className="assistant-panel">
        <div className="assistant-status"><span aria-hidden="true">✦</span><div><strong>CodeStart helper</strong><small>Local guide assistant · ready</small></div></div>
        <div className="assistant-thread" aria-live="polite">
          {messages.length === 0 && <div className="assistant-welcome">
            <p>Hi! Paste the full error message or a short code snippet, and I’ll suggest a likely fix from the guide library.</p>
            <span>Try one:</span>
            <div className="prompt-chips">
              {["ReferenceError: name is not defined", "Failed to resolve import", "TypeError: Cannot read properties of undefined"].map(prompt =>
                <button key={prompt} type="button" onClick={() => ask(prompt)}>{prompt}</button>
              )}
            </div>
          </div>}
          {messages.map(message => <article className="chat-turn" key={message.id}>
            <div className="chat-bubble user-bubble"><span>You</span><p>{message.question}</p></div>
            <div className="chat-bubble bot-bubble"><span>CodeStart guide helper</span><p>{message.answer}</p>
              {message.suggestions.length > 0 && <div className="chat-matches">
                <strong>Related guide{message.suggestions.length > 1 ? "s" : ""}</strong>
                {message.suggestions.map(topic => <details className="chat-match" key={topic.id}>
                  <summary>{topic.title} <span>{topic.category}</span></summary>
                  <p>{topic.fix}</p>
                  <code>{topic.example}</code>
                  <Link to="/errors">Browse all error types →</Link>
                </details>)}
              </div>}
              <div className="web-search-block">
                <strong>Search the web for this issue</strong>
                <p>Choose a source to open results in a new tab. Your submitted text will be sent to that search provider.</p>
                <div className="web-search-links">{webSearches.map(search => <a
                  key={search.label}
                  href={search.url(message.question.slice(0, 500))}
                  target="_blank"
                  rel="noopener noreferrer"
                >{search.label}<span aria-hidden="true"> ↗</span></a>)}</div>
              </div>
            </div>
          </article>)}
        </div>
        <form className="helper-form assistant-form" onSubmit={handleSubmit}>
          <label htmlFor="code-language">Technology (optional)</label>
          <select id="code-language" value={language} onChange={event => setLanguage(event.target.value)}>
            {["Auto-detect", "HTML", "CSS", "JavaScript", "React", "Vite / npm"].map(option => <option key={option}>{option}</option>)}
          </select>
          <label htmlFor="code-question">Paste your code or error message</label>
          <textarea id="code-question" value={input} onChange={event => { setInput(event.target.value); setValidationMessage(""); }} placeholder={"For example:\nTypeError: Cannot read properties of undefined\n\nPaste only the relevant code and error. Do not include passwords or API keys."} rows="6" />
          {liveSuggestions.length > 0 && <div className="live-matches"><span>Possible matches as you type</span>{liveSuggestions.map(topic => <button key={topic.id} type="button" onClick={() => ask(topic.title)}>{topic.title}</button>)}</div>}
          {validationMessage && <p className="helper-validation" role="alert">{validationMessage}</p>}
          <div className="helper-form-footer"><span>Your text stays in this browser unless you open an external search link.</span><button type="submit" className="btn-primary-custom">Ask the helper <span>→</span></button></div>
        </form>
        <p className="helper-disclaimer">This helper matches your question against the local guide library; it does not use generative AI. External searches open only when clicked, and send your query to the selected provider.</p>
      </div>
    </div></section>
  </div>;
}

