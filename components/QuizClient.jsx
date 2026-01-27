"use client";

import React, { useMemo, useState } from "react";

export default function QuizClient({ quiz }) {
  const [answers, setAnswers] = useState(
    Array.from({ length: quiz.questions.length }, () => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    return quiz.questions.map((q, i) => {
      const selectedIndex = answers[i];
      const isCorrect = selectedIndex === q.correctIndex;
      return {
        qId: q.id,
        prompt: q.prompt,
        choices: q.choices,
        selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect,
        feedback: q.feedback,
        verseLabel: q.verseLabel,
        verseUrl: q.verseUrl,
      };
    });
  }, [answers, quiz.questions]);

  const score = useMemo(
    () => results.reduce((acc, r) => acc + (r.isCorrect ? 1 : 0), 0),
    [results]
  );

  function onSelect(qIdx, choiceIdx) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = choiceIdx;
      return next;
    });
  }

  function onSubmit() {
    const anyBlank = answers.some((a) => a === null);
    if (anyBlank) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onReset() {
    setSubmitted(false);
    setAnswers(Array.from({ length: quiz.questions.length }, () => null));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>{quiz.title}</h1>
      <div style={{ opacity: 0.8, marginBottom: 18 }}>
        Audience: {quiz.audience} | Difficulty: {quiz.difficulty} | Questions:{" "}
        {quiz.questions.length}
        {quiz.publishedOn ? ` | Published: ${quiz.publishedOn}` : ""}
      </div>

      {submitted ? (
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 18, background: "#fafafa" }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            Your score: {score} / {quiz.questions.length}
          </div>
          <div style={{ marginTop: 8 }}>
            Self-study mode: correct answers and explanations are shown below.
          </div>
          <button onClick={onReset} style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc", cursor: "pointer" }}>
            Retake quiz
          </button>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Instructions</div>
          <div style={{ marginTop: 8 }}>
            Answer all questions, then click Submit to see your score and explanations.
          </div>
        </div>
      )}

      <ol style={{ paddingLeft: 18 }}>
        {results.map((r, qIdx) => (
          <li key={r.qId} style={{ marginBottom: 22 }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>{r.prompt}</div>

            <div style={{ display: "grid", gap: 8 }}>
              {r.choices.map((choice, cIdx) => {
                const checked = answers[qIdx] === cIdx;
                const isCorrectChoice = submitted && cIdx === r.correctIndex;
                const isWrongChosen = submitted && checked && cIdx !== r.correctIndex;

                return (
                  <label
                    key={cIdx}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #ddd",
                      cursor: submitted ? "default" : "pointer",
                      background: isCorrectChoice ? "#eef8ee" : isWrongChosen ? "#fdeeee" : "#fff",
                    }}
                  >
                    <input
                      type="radio"
                      name={`q-${qIdx}`}
                      checked={checked}
                      onChange={() => onSelect(qIdx, cIdx)}
                      disabled={submitted}
                      style={{ marginTop: 2 }}
                    />
                    <span>{choice}</span>
                  </label>
                );
              })}
            </div>

            {submitted && (
              <div style={{ marginTop: 10, padding: "10px 12px", borderLeft: "4px solid #ccc" }}>
                <div style={{ fontWeight: 600 }}>{r.isCorrect ? "Correct" : "Review"}</div>
                <div style={{ marginTop: 6 }}>{r.feedback}</div>
                <div style={{ marginTop: 6 }}>
                  Verse link:{" "}
                  <a href={r.verseUrl} target="_blank" rel="noreferrer">
                    {r.verseLabel}
                  </a>
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>

      {!submitted && (
        <button onClick={onSubmit} style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #333", cursor: "pointer", fontWeight: 600 }}>
          Submit
        </button>
      )}
    </div>
  );
}
