
import { useState } from "react";
<link rel="stylesheet" href="style.css" />

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

  const q = questions[current];

  function submitAnswer() {
    if (!selected) return;

    if (selected === q.answer) {
      setScore(score + 1);
    }

    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected("");
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
          <button onClick={() => {
            setCurrent(0);
            setSelected("");
            setScore(0);
            setFinished(false);
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
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}

          <button
            onClick={submitAnswer}
            disabled={!selected}
          >
            {current === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </>
      )}
    </div>
  );
}
