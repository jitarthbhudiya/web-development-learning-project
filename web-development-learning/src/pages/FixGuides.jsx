import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import CodeExample from "../components/CodeExample.jsx";
import { fixGuides } from "../data/errors.js";
export default function FixGuides() {
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(fixGuides[0].id);
  const guides=useMemo(()=>fixGuides.filter(g=>`${g.title} ${g.category} ${g.summary}`.toLowerCase().includes(query.toLowerCase())),[query]);
  const active=guides.find(g=>g.id===selected)||guides[0];
  return <div className="page-wrap"><section className="page-hero"><div className="container"><div className="eyebrow">FROM CONFUSION TO CLARITY</div><h1>How to fix <span>errors</span></h1><p>Practical walkthroughs for common problems beginners face while building websites.</p></div></section>
    <section className="section-pad"><div className="container"><SectionHeading eyebrow="TROUBLESHOOTING DESK" title="Find the guide that matches your error" description="Select a problem to see its explanation and follow the steps in order."/>
      <div className="guide-layout"><aside className="guide-sidebar"><div className="search-field guide-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search guides..." aria-label="Search guides"/></div><div className="guide-list">{guides.map(g=><button key={g.id} className={`guide-option ${active?.id===g.id?"selected":""}`} onClick={()=>setSelected(g.id)}><span>{g.category}</span><strong>{g.title}</strong><i>→</i></button>)}{guides.length===0&&<p className="small-muted p-3">No guides match that search.</p>}</div></aside>
      {active ? <article className="guide-detail"><div className="category-pill">{active.category}</div><h2>{active.title}</h2><p className="guide-summary">{active.summary}</p><h3>Follow these steps</h3><div className="step-list">{active.steps.map((s,i)=><div className="guide-step" key={s}><span>{String(i+1).padStart(2,"0")}</span><p>{s}</p></div>)}</div><h3>Example commands or code</h3><CodeExample code={active.code.replaceAll("\\n","\n")} language="powershell / code"/><div className="tip-box"><b>Learning tip</b><p>Change one thing at a time, then test again. If the problem remains, read the newest complete error message and check whether it has changed.</p></div></article> : <div className="empty-state">No guide selected.</div>}
      </div>
    </div></section></div>;
}