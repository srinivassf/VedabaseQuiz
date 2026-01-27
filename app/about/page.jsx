import React from "react";

export const metadata = {
  title: "About | Vedabase Quiz",
  description: "About Vedabase Quiz",
};

export default function AboutPage() {
  return (
    <main className="pageContainer">
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>About Vedabase Quiz</h1>

      <p>
        <strong>Vedabase Quiz</strong> is a gentle self-study space for anyone who wants to understand the Bhagavad Gita and Srimad
        Bhagavatam more clearly and thoughtfully.
      </p>
      <p>
        The quizzes here are not tests or competitions. They are meant to support careful reading, reflection, and steady learning at your
        own pace.
      </p>

      <h2 style={{ fontSize: 18, marginTop: 22 }}>Why quizzes?</h2>
      <p>Quizzes help bring clarity. They can:</p>
      <ul>
        <li>Show what you already understand well</li>
        <li>Gently point out areas to revisit</li>
        <li>Encourage slower, more attentive reading</li>
        <li>Help connect verses into a coherent whole</li>
      </ul>
      <p>
        After submitting a quiz, you immediately see explanations and links to the exact verses, so learning can continue naturally.
      </p>

      <h2 style={{ fontSize: 18, marginTop: 22 }}>How the quizzes are made</h2>
      <ul>
        <li>
          <strong>Single trusted source:</strong> All questions are based only on the translations and purports available on Vedabase.io.
        </li>
        <li>
          <strong>Purport-aware study:</strong> Verses are studied together with Srila Prabhupada's purports to reflect intended meaning and
          avoid common misunderstandings.
        </li>
        <li>
          <strong>Chapter flow:</strong> Questions follow the natural progression of each chapter, from context to conclusion.
        </li>
        <li>
          <strong>Self-study focused:</strong> Immediate feedback, explanations, and direct verse links support re-reading and reflection.
        </li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 22 }}>Credits and acknowledgements</h2>
      <p>
        All scriptural content referenced by this site is sourced from <strong>Vedabase.io</strong>, which makes the works of{" "}
        <strong>His Divine Grace A. C. Bhaktivedanta Swami Prabhupada</strong> freely available for study.
      </p>
      <p>
        The original translations and purports of the Bhagavad Gita and Srimad Bhagavatam are published by the{" "}
        <strong>Bhaktivedanta Book Trust (BBT)</strong>.
      </p>
      <p>
        Vedabase Quiz is an independent, non-commercial study project and is not affiliated with Vedabase.io or the Bhaktivedanta Book Trust.
        It exists solely to support thoughtful study and understanding of these sacred texts.
      </p>
    </main>
  );
}
