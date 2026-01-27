import QuizClient from "../../../components/QuizClient";
import { getQuizBySlug, listQuizSlugs } from "../../../lib/quizLoader";

export function generateStaticParams() {
  return listQuizSlugs().map((s) => ({ slug: s.split("/") }));
}

export default function QuizPage({ params }) {
  const slug = params.slug.join("/");
  const quiz = getQuizBySlug(slug);
  return <QuizClient quiz={quiz} />;
}
