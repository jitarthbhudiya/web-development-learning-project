import { useState } from "react";
import CodeExample from "../components/CodeExample.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { learningTopics } from "../data/learning.js";

export default function Learn() {
  const [selectedId, setSelectedId] = useState(learningTopics[0].id);
  const selected = learningTopics.find(topic => topic.id === selectedId) ?? learningTopics[0];

  return <div className="page-wrap">
    <section className="page-hero"><div className="container">
      <div className="eyebrow">LEARN THE BUILDING BLOCKS</div>
      <h1>Web development <span>notes</span></h1>
      <p>Short explanations, practical examples, and trusted references for the technologies behind the web.</p>
    </div></section>
    <section className="section-pad"><div className="container">
      <SectionHeading eyebrow="LEARNING LIBRARY" title="Choose a topic and explore" description="Select a technology to see its key ideas, a starter example, and links to official documentation." />
      <div className="learning-tabs" aria-label="Learning topics">
        {learningTopics.map(topic => <button
          key={topic.id}
          type="button"
          aria-pressed={selected.id === topic.id}
          className={`learning-tab ${selected.id === topic.id ? "selected" : ""}`}
          onClick={() => setSelectedId(topic.id)}
        >{topic.title}</button>)}
      </div>
      <article className="learning-detail">
        <div className="category-pill">{selected.category}</div>
        <h2>{selected.title}</h2>
        <p className="guide-summary">{selected.summary}</p>
        <h3>Quick notes</h3>
        <ul className="learning-notes">{selected.notes.map(note => <li key={note}>{note}</li>)}</ul>
        <h3>Example</h3>
        <CodeExample code={selected.code} language={selected.title} />
        <h3>Keep learning</h3>
        <div className="resource-links">{selected.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}</div>
      </article>
    </div></section>
  </div>;
}
