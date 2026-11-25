
import { useState } from "react";

const questions = [
  {
    question: "Which HTML tag creates a heading?",
    options: ["<p>", "<h1>", "<div>", "<img>"],
    answer: "<h1>",
    explanation: "The h1 tag creates the main heading on a webpage."
  },
  {
    question: "Which CSS property changes text colour?",
    options: ["font-size", "background", "color", "margin"],
    answer: "color",
    explanation: "The color property controls the colour of text."
  },
  {
    question: "Which JavaScript keyword declares a variable?",
    options: ["let", "style", "html", "body"],
    answer: "let",
    explanation: "The let keyword declares a block-scoped variable."
  }
];

export default function QuickQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = questions[current];

  function submitAnswer() {
    if (!selected || answered) return;
    if (selected === q.answer) setScore(value => value + 1);
    setAnswered(true);
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected("");
      setAnswered(false);
    }
  }

  return (
    <div className="quiz-card">
      <h2>Test Your Coding Knowledge</h2>

      {finished ? (
        <>
          <h3>Quiz completed!</h3>
          <p>
            Your score: {score}/{questions.length}
          </p>
          <button type="button" onClick={() => {
            setCurrent(0);
            setSelected("");
            setScore(0);
            setFinished(false);
            setAnswered(false);
          }}>
            Try Again
          </button>
        </>
      ) : (
        <>
          <p>
            Question {current + 1} of {questions.length}
          </p>

          <h3>{q.question}</h3>

          {q.options.map(option => (
            <button
              key={option}
              className={
                selected === option ? "selected" : ""
              }
              type="button"
              aria-pressed={selected === option}
              disabled={answered}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}

          {answered && <p className={`quiz-feedback ${selected === q.answer ? "correct" : "incorrect"}`} role="status">
            {selected === q.answer ? "Correct!" : `Not quite. The answer is ${q.answer}.`} {q.explanation}
          </p>}
          {answered
            ? <button type="button" onClick={nextQuestion}>{current === questions.length - 1 ? "See your score" : "Next question"}</button>
            : <button type="button" onClick={submitAnswer} disabled={!selected}>Check answer</button>}
        </>
      )}
    </div>
  );
}
