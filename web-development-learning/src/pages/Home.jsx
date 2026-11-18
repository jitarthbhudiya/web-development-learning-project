import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
const topics = [
  { icon: "⌁", title: "HTML", text: "Build the structure and meaning of a web page." },
  { icon: "✳", title: "CSS", text: "Style pages with colour, spacing and layouts." },
  { icon: "JS", title: "JavaScript", text: "Make websites interactive and dynamic." },
  { icon: "⚛", title: "React", text: "Create reusable components and interfaces." }
];
const steps = ["Read the full error message", "Find the file and line mentioned", "Understand the likely cause", "Make one careful change", "Run the app and test again"];
export default function Home() {
  return <>
    <section className="hero-section"><div className="container hero-grid">
      <div className="hero-copy"><div className="hero-kicker"><span className="pulse-dot" /> A FRIENDLY PLACE TO START CODING</div>
        <h1>Build your skills.<br /><span>Debug with confidence.</span></h1>
        <p className="hero-lead">Learn how websites work, understand common coding errors, and follow practical guides to solve problems one step at a time.</p>
        <div className="hero-actions"><Link to="/fix-guides" className="btn-primary-custom">Explore fix guides <span>→</span></Link><Link to="/about" className="btn-text">Discover the project <span>↗</span></Link></div>
        <div className="hero-proof"><div className="avatar-stack"><b>H</b><b>C</b><b>JS</b></div><span>Made for curious beginners<br /><strong>No experience required</strong></span></div>
      </div>
      <div className="hero-visual"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="editor-card">
        <div className="editor-top"><span><i /><i /><i /></span><small>hello-world.jsx</small><b>● LIVE</b></div>
        <div className="editor-body"><div className="line"><em>01</em><code><span className="purple">function</span> <span className="yellow">Welcome</span>() {"{"}</code></div><div className="line"><em>02</em><code>&nbsp;&nbsp;<span className="purple">return</span> (</code></div><div className="line"><em>03</em><code>&nbsp;&nbsp;&nbsp;&nbsp;<span className="green">&lt;h1&gt;</span>Hello, developer!<span className="green">&lt;/h1&gt;</span></code></div><div className="line"><em>04</em><code>&nbsp;&nbsp;);</code></div><div className="line"><em>05</em><code>{"}"}</code></div><div className="editor-success"><span>✓</span> Your first component is ready</div></div>
      </div><div className="floating-note note-top"><span>✦</span> Learn by doing</div><div className="floating-note note-bottom"><span>✓</span> Every error has a clue</div><div className="hero-decoration">{"{ }"}</div></div>
    </div></section>
    <section className="stats-strip"><div className="container stats-grid"><div><strong>04</strong><span>Core technologies</span></div><div><strong>11+</strong><span>Error categories</span></div><div><strong>05</strong><span>Learning sections</span></div><div><strong>100%</strong><span>Beginner friendly</span></div></div></section>
    <section className="section-pad"><div className="container"><SectionHeading eyebrow="THE FOUNDATIONS" title="What you will learn" description="Start with the building blocks of the web and grow your skills at your own pace." centered />
      <div className="row g-4 mt-2">{topics.map((t, i) => <div className="col-sm-6 col-lg-3" key={t.title}><div className="topic-card h-100"><div className={`topic-icon topic-${i}`}>{t.icon}</div><h3>{t.title}</h3><p>{t.text}</p><span className="topic-number">0{i + 1}</span></div></div>)}</div>
    </div></section>
    <section className="mistake-section"><div className="container mistake-grid"><div><div className="eyebrow light-eyebrow">A BETTER WAY TO LEARN</div><h2>Mistakes are not the end.<br /><span>They are part of the process.</span></h2><p>Every developer sees errors. The important skill is learning how to read them, find their causes and work through a solution.</p><Link to="/errors" className="btn-light-custom">Explore common errors →</Link></div><div className="checklist-card"><div className="checklist-title"><span>✦</span> A simple debugging routine</div>{steps.map((s, i) => <div className="check-row" key={s}><span>{String(i + 1).padStart(2, "0")}</span>{s}<b>✓</b></div>)}</div></div></section>
    <section className="section-pad"><div className="container cta-panel"><div><div className="eyebrow">READY WHEN YOU ARE</div><h2>Your next breakthrough<br />could be one fix away.</h2><p>Choose an error, follow the steps, and keep building.</p></div><Link to="/fix-guides" className="btn-primary-custom">Find a solution <span>→</span></Link></div></section>
  </>;
}