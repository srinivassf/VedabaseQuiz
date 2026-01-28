"use client";

import React, { useMemo, useState } from "react";

function getGrade(score, total) {
  const pct = total > 0 ? score / total : 0;

  if (pct === 1) {
    return {
      label: "Perfect",
      emoji: "🌸",
      title: "Perfect score!",
      line: "Wonderful focus. Keep going steadily.",
    };
  }
  if (pct >= 0.9) {
    return {
      label: "Excellent",
      emoji: "✨",
      title: "Excellent!",
      line: "Strong understanding — subtle points are landing.",
    };
  }
  if (pct >= 0.75) {
    return {
      label: "Strong",
      emoji: "🙏",
      title: "Strong effort!",
      line: "You’re building real clarity. Review a few and continue.",
    };
  }
  if (pct >= 0.6) {
    return {
      label: "Good",
      emoji: "📖",
      title: "Good progress!",
      line: "Nice work. Revisit the verse links below and try again.",
    };
  }
  return {
    label: "Keep going",
    emoji: "🌿",
    title: "Keep going!",
    line: "This is how learning happens — one careful step at a time.",
  };
}

// Soft, calm tints (not loud gamification)
function getScoreBoxStyle(gradeLabel) {
  switch (gradeLabel) {
    case "Perfect":
      return { bg: "#f1f7f3", border: "#2f7d32" }; // gentle green
    case "Excellent":
      return { bg: "#f3f6fa", border: "#1e3a8a" }; // calm blue
    case "Strong":
      return { bg: "#f7f6f2", border: "#6b4f1d" }; // warm earth
    case "Good":
      return { bg: "#f6f7f8", border: "#444" }; // neutral
    default:
      return { bg: "#f6f7f8", border: "#444" }; // neutral
  }
}

export default function QuizClient({ quiz }) {
  const total = quiz?.questions?.length || 0;

  const [answers, setAnswers] = useState(Array.from({ length: total }, () => null));
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    return (quiz.questions || []).map((q, i) => {
      const selectedIndex = answers[i];
      const isCorrect = selectedIndex === q.correctIndex;

      return {
        qId: q.id ?? String(i),
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

  const score = useMemo(() => results.reduce((acc, r) => acc + (r.isCorrect ? 1 : 0), 0), [results]);

  const grade = useMemo(() => getGrade(score, total), [score, total]);
  const scoreStyle = useMemo(() => getScoreBoxStyle(grade.label), [grade.label]);

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
    setAnswers(Array.from({ length: total }, () => null));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>{quiz.title}</h1>

      <div style={{ opacity: 0.8, marginBottom: 18, lineHeight: 1.4 }}>
        {quiz.audience ? <>Audience: {quiz.audience}{" "} |{" "}</> : null}
        {quiz.difficulty ? <>Difficulty: {quiz.difficulty}{" "} |{" "}</> : null}
        Questions: {total}
        {quiz.publishedOn ? ` | Published: ${quiz.publishedOn}` : ""}
      </div>

      {submitted ? (
        <div
  className={`scoreBox ${
    grade.label === "Perfect"
      ? "scorePerfect"
      : grade.label === "Excellent"
      ? "scoreExcellent"
      : grade.label === "Strong"
      ? "scoreStrong"
      : grade.label === "Good"
      ? "scoreGood"
      : "scoreKeepGoing"
  }`}
>

          <div style={{ fontSize: 18, fontWeight: 800 }}>
            {grade.emoji} {grade.title} — {score} / {total}
          </div>

          <div style={{ marginTop: 8, opacity: 0.95 }}>{grade.line}</div>

          <div style={{ marginTop: 10, opacity: 0.85 }}>
            Self-study mode: correct answers and explanations are shown below.
          </div>

          <button
            onClick={onReset}
            style={{
              marginTop: 12,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ccc",
              cursor: "pointer",
              fontWeight: 800,
              background: "#fff",
            }}
          >
            Retake quiz
          </button>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, marginBottom: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>Instructions</div>
          <div style={{ marginTop: 8, opacity: 0.9 }}>
            Answer all questions, then click Submit to see your score and explanations.
          </div>
        </div>
      )}

      {/* IMPORTANT:
         Use a normal <div> list instead of <ol> to avoid double numbering.
         We'll show our own "Question 1" label.
      */}
      <div>
        {results.map((r, qIdx) => (
          <div key={r.qId} style={{ marginBottom: 22 }}>
            <div style={{ fontWeight: 800, marginBottom: 8, opacity: 0.8 }}>
              Question {qIdx + 1}
            </div>

            <div style={{ fontWeight: 700, marginBottom: 10 }}>{r.prompt}</div>

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
                      borderRadius: 12,
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
  <div
    className={[
      "feedbackBox",
      r.isCorrect ? "feedbackBoxCorrect" : "feedbackBoxReview",
      quiz.audience === "kids" ? "feedbackKids" : quiz.audience === "teens" ? "feedbackTeens" : "feedbackAdult",
    ].join(" ")}
  >
    <div className="feedbackHeaderRow">
      <div className="feedbackVerdict">{r.isCorrect ? "Correct" : "Review"}</div>

      {/* Optional meta (kept subtle). Hide on mobile via CSS. */}
      <div className="feedbackMeta">{r.isCorrect ? "Nice." : "Re-check the verse."}</div>
    </div>

    <div className="feedbackText">{r.feedback}</div>

    <div className="feedbackVerseRow">
      <span className="feedbackVerseLabel">Verse:</span>
      <a className="feedbackVerseLink" href={r.verseUrl} target="_blank" rel="noreferrer">
        {r.verseLabel}
      </a>
    </div>
  </div>
)}

          </div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={onSubmit}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid #111",
            cursor: "pointer",
            fontWeight: 800,
            background: "#111",
            color: "#fff",
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
}
