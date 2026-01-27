import Link from "next/link";
import { getLatestQuizzes } from "../lib/quizLoader";

export default function HomePage() {
  const latest = getLatestQuizzes(8);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Vedabase Quiz</h1>
      <p style={{ opacity: 0.85, marginTop: 0 }}>
        Take quizzes directly on this site (self-study mode). Submit to see score, explanations, and verse links.
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        <a href="/bg/" style={{ padding: 14, border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}>
          <div style={{ fontWeight: 700 }}>Bhagavad Gita</div>
          <div style={{ opacity: 0.8 }}>Chapters 1-18</div>
        </a>

        <a href="/sb/" style={{ padding: 14, border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}>
          <div style={{ fontWeight: 700 }}>Srimad Bhagavatam</div>
          <div style={{ opacity: 0.8 }}>Cantos and chapters</div>
        </a>
      </div>

      <h2 style={{ fontSize: 20, marginTop: 26, marginBottom: 10 }}>Latest quizzes</h2>
      {latest.length === 0 ? (
        <div style={{ opacity: 0.8 }}>No quizzes published yet.</div>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {latest.map((q) => (
            <li key={q.slug} style={{ marginBottom: 8 }}>
              <Link href={`/quiz/${q.slug}/`}>{q.title}</Link>
              <span style={{ opacity: 0.75 }}>
                {" "}
                ({q.scripture.toUpperCase()}
                {q.scripture === "bg" ? ` ${q.chapter}` : ` ${q.canto}.${q.sbChapter}`}, {q.audience}, {q.difficulty}
                {q.publishedOn ? `, ${q.publishedOn}` : ""})
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
