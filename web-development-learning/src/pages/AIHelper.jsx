import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";

const modes = [
  ["debug", "Fix an error"],
  ["explain", "Explain my code"],
  ["improve", "Improve my code"],
];
const languages = ["JavaScript", "HTML", "CSS", "React", "Node.js", "Other"];
const MAX_INPUT_LENGTH = 15000;

export default function AIHelper() {
  const [code, setCode] = useState("");
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [mode, setMode] = useState("debug");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!code.trim() && !question.trim()) {
      setError("Enter a question, paste code, or provide both.");
      return;
    }
    if (code.length + question.length > MAX_INPUT_LENGTH) {
      setError("Keep your question and code within 15,000 characters.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const response = await fetch("/api/ai-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, question, language, mode }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "The AI Helper could not process your request.");
      }
      if (typeof result?.answer !== "string" || !result.answer.trim()) {
        throw new Error("The AI Helper returned an empty answer. Please try again.");
      }
      setAnswer(result.answer);
    } catch (requestError) {
      setError(requestError instanceof Error
        ? requestError.message
        : "Unable to connect to the AI Helper. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyAnswer() {
    try {
      await navigator.clipboard.writeText(answer);
    } catch {
      setError("Could not copy the answer. You can still select and copy it manually.");
    }
  }

  function clearForm() {
    setCode("");
    setQuestion("");
    setAnswer("");
    setError("");
  }

  return <div className="page-wrap">
    <section className="page-hero"><div className="container">
      <div className="eyebrow">CODESTART AI TUTOR</div>
      <h1>AI Code <span>helper</span></h1>
      <p>Describe what is confusing, share a relevant code sample, and get a beginner-friendly explanation.</p>
    </div></section>
    <section className="section-pad"><div className="container helper-container">
      <SectionHeading eyebrow="LEARN BY SOLVING" title="What can I help you with?" description="Choose a task and share only the code or error needed to explain the problem." />
      <form className="ai-helper-form" onSubmit={handleSubmit}>
        <div className="ai-helper-fields">
          <div>
            <label htmlFor="ai-mode">What do you need help with?</label>
            <select id="ai-mode" value={mode} onChange={event => setMode(event.target.value)}>
              {modes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="ai-language">Programming language</label>
            <select id="ai-language" value={language} onChange={event => setLanguage(event.target.value)}>
              {languages.map(option => <option key={option}>{option}</option>)}
            </select>
          </div>
        </div>
        <label htmlFor="ai-question">Describe your problem</label>
        <textarea
          id="ai-question"
          className="ai-question-input"
          value={question}
          onChange={event => setQuestion(event.target.value)}
          placeholder="For example: Why is my React component not displaying?"
          rows="3"
        />
        <label htmlFor="ai-code">Paste your code or error message</label>
        <textarea
          id="ai-code"
          className="ai-code-input"
          value={code}
          onChange={event => setCode(event.target.value)}
          placeholder="Paste only the relevant HTML, CSS, JavaScript, or error message."
          rows="10"
          spellCheck="false"
        />
        <p className="ai-character-count">{code.length + question.length} / {MAX_INPUT_LENGTH} characters</p>
        {error && <p className="ai-error" role="alert">{error}</p>}
        <div className="ai-helper-buttons">
          <button type="submit" className="btn-primary-custom" disabled={loading}>
            {loading ? "Analysing..." : "Get AI solution"} <span aria-hidden="true">→</span>
          </button>
          <button type="button" className="ai-clear-button" onClick={clearForm} disabled={loading}>Clear</button>
        </div>
      </form>
      {loading && <div className="ai-loading" role="status"><span className="ai-loader" />CodeStart AI is analysing your request...</div>}
      {answer && <section className="ai-answer" aria-labelledby="ai-answer-title" aria-live="polite">
        <div className="ai-answer-heading">
          <h2 id="ai-answer-title">AI solution</h2>
          <button type="button" className="ai-copy-button" onClick={copyAnswer}>Copy answer</button>
        </div>
        <pre className="ai-answer-content">{answer}</pre>
      </section>}
      <p className="ai-privacy-note">Your submission is sent to the AI service to generate an answer. Do not include passwords, API keys, personal information, or other confidential code. AI suggestions can be incorrect; review and test them carefully.</p>
    </div></section>
  </div>;
}
