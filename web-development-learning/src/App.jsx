import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Errors from "./pages/Errors.jsx";
import FixGuides from "./pages/FixGuides.jsx";
import Contact from "./pages/Contact.jsx";
import Learn from "./pages/Learn.jsx";
import CodeHelper from "./pages/CodeHelper.jsx";
import AIHelper from "./pages/AIHelper.jsx";
import CodePlayground from "./pages/CodePlayground.jsx";

export default function App() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/errors" element={<Errors />} />
          <Route path="/fix-guides" element={<FixGuides />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/code-helper" element={<CodeHelper />} />
          <Route path="/ai-helper" element={<AIHelper />} />
          <Route path="/playground" element={<CodePlayground />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
