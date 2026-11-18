import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import ErrorCard from "../components/ErrorCard.jsx";
import { errorTopics } from "../data/errors.js";
export default function Errors() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(errorTopics.map(x => x.category))];
  const filtered = useMemo(() => errorTopics.filter(x => (category === "All" || x.category === category) && `${x.title} ${x.description} ${x.cause} ${x.category}`.toLowerCase().includes(query.toLowerCase())), [query, category]);
  return <div className="page-wrap"><section className="page-hero"><div className="container"><div className="eyebrow">UNDERSTAND THE MESSAGE</div><h1>Types of <span>errors</span></h1><p>Explore common web development errors, what causes them and what to check first.</p></div></section>
    <section className="section-pad"><div className="container"><SectionHeading eyebrow="ERROR LIBRARY" title="A problem has a name. Start there." description="Search the library or filter by technology to find a useful explanation." />
      <div className="filter-bar"><div className="search-field"><span>⌕</span><input aria-label="Search errors" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search errors, causes or keywords..." /></div><select aria-label="Filter by category" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div>
      <div className="results-line">{filtered.length} {filtered.length === 1 ? "topic" : "topics"} found</div>
      <div className="row g-4">{filtered.map(item=><div className="col-md-6 col-lg-4" key={item.id}><ErrorCard item={item}/></div>)}</div>
      {filtered.length===0 && <div className="empty-state"><h3>No matching errors found</h3><p>Try another keyword or select “All” categories.</p><button className="btn-primary-custom" onClick={()=>{setQuery("");setCategory("All");}}>Clear filters</button></div>}
    </div></section></div>;
}