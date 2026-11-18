import { Link } from "react-router-dom";
export default function Footer() {
  return <footer className="footer">
    <div className="container footer-inner">
      <div><Link to="/" className="footer-brand">&lt;/&gt; CodeStart</Link><p>Helping beginners turn coding errors into learning opportunities.</p></div>
      <div className="footer-links"><Link to="/about">About</Link><Link to="/errors">Error library</Link><Link to="/fix-guides">Fix guides</Link><Link to="/contact">Contact</Link></div>
      <div className="copyright">© {new Date().getFullYear()} CodeStart. Keep learning, one line at a time.</div>
    </div>
  </footer>;
}