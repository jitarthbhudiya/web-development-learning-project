export default function CodeExample({ code, language = "bash" }) {
  return <div className="code-window">
    <div className="code-window-head"><span><i /> <i /> <i /></span><small>{language}</small><span className="code-label">EXAMPLE</span></div>
    <pre><code>{code}</code></pre>
  </div>;
}