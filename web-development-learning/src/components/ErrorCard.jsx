export default function ErrorCard({ item }) {
  return <article className="content-card error-card h-100">
    <div className="card-topline"><span className="category-pill">{item.category}</span><span className="level">{item.level}</span></div>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <div className="mini-detail"><strong>Common cause</strong><span>{item.cause}</span></div>
    <pre className="code-sample"><code>{item.example}</code></pre>
  </article>;
}