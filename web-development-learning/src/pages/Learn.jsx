import { useEffect, useMemo, useState } from "react";
import CodeExample from "../components/CodeExample.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { learningTopics } from "../data/learning.js";
import QuickQuiz from "./components/QuickQuiz";
const progressStorageKey = "codestart-learning-progress";
const tracks = ["All topics", ...new Set(learningTopics.map(topic => topic.track))];

export default function Learn() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All topics");
  const [selectedId, setSelectedId] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(progressStorageKey) || "[]");
      if (Array.isArray(saved) && saved.every(item => typeof item === "string")) {
        setCompletedLessons(saved);
      }
    } catch {
      setStorageWarning("Progress could not be loaded from this browser. You can still use the courses for this visit.");
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(progressStorageKey, JSON.stringify(completedLessons));
    } catch {
      setStorageWarning("Progress could not be saved in this browser. Your current checklist remains available until you leave this page.");
    }
  }, [completedLessons, storageReady]);

  const filteredTopics = useMemo(() => {
    const search = query.trim().toLowerCase();
    return learningTopics.filter(topic => {
      const matchesTrack = track === "All topics" || topic.track === track;
      const searchable = `${topic.title} ${topic.summary} ${topic.category} ${topic.track} ${topic.modules.join(" ")}`.toLowerCase();
      return matchesTrack && (!search || searchable.includes(search));
    });
  }, [query, track]);

  const selected = learningTopics.find(topic => topic.id === selectedId);
  const completedCount = topic => topic.modules.filter((_, index) => completedLessons.includes(`${topic.id}:${index}`)).length;
  const totalLessons = learningTopics.reduce((total, topic) => total + topic.modules.length, 0);
  const totalCompleted = learningTopics.reduce((total, topic) => total + completedCount(topic), 0);

  function toggleLesson(topicId, index) {
    const lessonId = `${topicId}:${index}`;
    setCompletedLessons(current => current.includes(lessonId)
      ? current.filter(item => item !== lessonId)
      : [...current, lessonId]);
  }

  function clearProgress() {
    setCompletedLessons([]);
  }

  return <div className="page-wrap">
    <section className="page-hero"><div className="container">
      <div className="eyebrow">LEARN THE BUILDING BLOCKS</div>
      <h1>Web development <span>courses</span></h1>
      <p>Choose a guided topic, follow short lessons at your own pace, and explore trusted learning resources from across the web.</p>
    </div></section>
    <section className="section-pad"><div className="container">
      <SectionHeading eyebrow="LEARNING PATHS" title="Pick a skill to build" description="Browse practical learning paths spanning the foundations, accessibility, performance, design, and modern web development." />

      <div className="course-progress-bar">
        <div><span className="course-progress-icon">✓</span><span><strong>{totalCompleted} of {totalLessons} lessons complete</strong><small>Your checklist is saved in this browser.</small></span></div>
        <div className="course-progress-actions">
          <div className="progress-track" role="progressbar" aria-label="Overall course progress" aria-valuenow={totalCompleted} aria-valuemin="0" aria-valuemax={totalLessons}><span style={{ width: `${totalLessons ? totalCompleted / totalLessons * 100 : 0}%` }} /></div>
          {totalCompleted > 0 && <button type="button" className="progress-reset" onClick={clearProgress}>Reset progress</button>}
        </div>
      </div>
      {storageWarning && <p className="progress-warning" role="status">{storageWarning}</p>}

      <div className="course-filters">
        <label className="search-field course-search"><span aria-hidden="true">⌕</span><input aria-label="Search courses" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search courses or skills..." /></label>
        <label className="course-filter-label" htmlFor="course-track">Learning path</label>
        <select id="course-track" className="course-track-select" value={track} onChange={event => setTrack(event.target.value)}>
          {tracks.map(item => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="course-results-count">{filteredTopics.length} {filteredTopics.length === 1 ? "course" : "courses"}</div>

      {filteredTopics.length > 0 ? <div className="course-grid">
        {filteredTopics.map(topic => {
          const done = completedCount(topic);
          const percent = Math.round(done / topic.modules.length * 100);
          return <article className={`course-card ${selectedId === topic.id ? "course-card-selected" : ""}`} key={topic.id}>
            <div className="course-card-top"><span className="course-icon" aria-hidden="true">{topic.icon}</span><span className="course-track-pill">{topic.track}</span></div>
            <h2>{topic.title}</h2>
            <p>{topic.summary}</p>
            <div className="course-meta"><span>{topic.level}</span><span>{topic.duration}</span></div>
            <div className="course-card-progress"><span>{done}/{topic.modules.length} lessons</span><div className="progress-track"><span style={{ width: `${percent}%` }} /></div></div>
            <button type="button" className="course-open-button" aria-expanded={selectedId === topic.id} onClick={() => setSelectedId(selectedId === topic.id ? null : topic.id)}>
              {selectedId === topic.id ? "Close course" : done > 0 ? "Continue course" : "View course"} <span aria-hidden="true">{selectedId === topic.id ? "↑" : "→"}</span>
            </button>
          </article>;
        })}
      </div> : <div className="empty-state"><h3>No matching courses</h3><p>Try a different search term or learning path.</p><button className="btn-primary-custom" type="button" onClick={() => { setQuery(""); setTrack("All topics"); }}>Show all courses</button></div>}

      {selected && <article className="course-detail" aria-live="polite">
        <div className="course-detail-heading"><div><div className="category-pill">{selected.track} · {selected.level}</div><h2>{selected.title}</h2><p>{selected.summary}</p></div><button type="button" className="course-close" aria-label="Close course details" onClick={() => setSelectedId(null)}>×</button></div>
        <div className="course-detail-columns">
          <div>
            <h3>Course outline</h3>
            <p className="course-detail-hint">Mark lessons as complete to keep track of what you have covered.</p>
            <ol className="course-module-list">{selected.modules.map((module, index) => {
              const isComplete = completedLessons.includes(`${selected.id}:${index}`);
              return <li key={module}>
                <button type="button" className={`course-module ${isComplete ? "module-complete" : ""}`} aria-pressed={isComplete} onClick={() => toggleLesson(selected.id, index)}>
                  <span className="module-check" aria-hidden="true">{isComplete ? "✓" : String(index + 1).padStart(2, "0")}</span>
                  <span>{module}<small>{isComplete ? "Completed" : "Mark lesson complete"}</small></span>
                </button>
              </li>;
            })}</ol>
          </div>
          <div className="course-study">
            <h3>Quick notes</h3>
            <ul className="learning-notes">{selected.notes.map(note => <li key={note}>{note}</li>)}</ul>
            <h3>Try an example</h3>
            <CodeExample code={selected.code} language={selected.title} />
            <h3>More learning resources</h3>
            <div className="resource-links">{selected.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}</div>
          </div>
        </div>
      </article>}

      
    </div></section>
  </div>;
  

// Inside your page:
<QuickQuiz />
}
