import Link from "next/link";
import QuizClient from "../../../components/QuizClient";
import { getQuizBySlug, listQuizSlugs } from "../../../lib/quizLoader";

export function generateStaticParams() {
  return listQuizSlugs().map((s) => ({ slug: s.split("/") }));
}

function parseSlug(slug) {
  // bg/5-adult
  let m = slug.match(/^bg\/(\d+)-(adult|teens|kids)$/);
  if (m) return { scripture: "bg", chapter: Number(m[1]), audience: m[2] };

  // sb/1/1-adult
  m = slug.match(/^sb\/(\d+)\/(\d+)-(adult|teens|kids)$/);
  if (m) return { scripture: "sb", canto: Number(m[1]), chapter: Number(m[2]), audience: m[3] };

  return null;
}

function titleCase(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function QuizPage({ params }) {
  const slug = params.slug.join("/");
  const quiz = getQuizBySlug(slug);
  const info = parseSlug(slug);

  const audience = info?.audience || "adult";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>
        <Link href="/">Home</Link> <span style={{ opacity: 0.6 }}>/</span>{" "}
        {info?.scripture === "bg" ? (
          <>
            <Link href={`/bg/?audience=${audience}`}>Bhagavad Gita</Link>
            <span style={{ opacity: 0.6 }}> /</span> <span>{titleCase(audience)}</span>
            <span style={{ opacity: 0.6 }}> /</span> <span>Chapter {info.chapter}</span>
          </>
        ) : info?.scripture === "sb" ? (
          <>
            <Link href={`/sb/?audience=${audience}`}>Srimad Bhagavatam</Link>
            <span style={{ opacity: 0.6 }}> /</span>{" "}
            <Link href={`/sb/${info.canto}/?audience=${audience}`}>Canto {info.canto}</Link>
            <span style={{ opacity: 0.6 }}> /</span> <span>{titleCase(audience)}</span>
            <span style={{ opacity: 0.6 }}> /</span> <span>Chapter {info.chapter}</span>
          </>
        ) : (
          <span>Quiz</span>
        )}
      </div>

      <QuizClient quiz={quiz} />
    </main>
  );
}
