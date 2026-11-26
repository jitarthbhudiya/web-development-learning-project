import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/errors", "Types of Errors"],
  ["/fix-guides", "How to Fix Errors"],
  ["/learn", "Learn & Explore"],
  ["/code-helper", "Code Helper"],
  ["/ai-helper", "AI Helper"],
  ["/contact", "Contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <nav className="navbar navbar-expand-lg container">
        <NavLink className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">&lt;/&gt;</span>
          <span>Code<span className="brand-light">Start</span><small>LEARN • BUILD • DEBUG</small></span>
        </NavLink>
        <button className="navbar-toggler menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <div className="navbar-nav ms-auto align-items-lg-center">
            {links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={() => setOpen(false)}>{label}</NavLink>)}
            <NavLink to="/fix-guides" className="nav-cta" onClick={() => setOpen(false)}>Start learning <span>↗</span></NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}