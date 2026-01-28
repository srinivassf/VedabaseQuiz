import React from "react";

export const metadata = {
  title: "Sources | Vedabase Quiz",
  description: "Sources and attribution for Vedabase Quiz",
};

export default function SourcesPage() {
  return (
    <main className="pageContainer">
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Sources</h1>

      <p>
        Vedabase Quiz is a non-commercial, educational study project created to support thoughtful learning of the Bhagavad Gita and
        Srimad Bhagavatam.
      </p>

      <h2 style={{ fontSize: 18, marginTop: 22 }}>Primary source</h2>
      <p>
        All scriptural content referenced on this site is sourced exclusively from <strong>Vedabase.io</strong>, an online repository of
        Vedic literature maintained for public study and reference.
      </p>
      <p>
        The translations and purports used on Vedabase.io are published by the <strong>Bhaktivedanta Book Trust (BBT)</strong> and are
        authored by <strong>His Divine Grace A. C. Bhaktivedanta Swami Prabhupada</strong>.
      </p>

      <h2 style={{ fontSize: 18, marginTop: 22 }}>How the source is used</h2>
      <ul>
        <li>Quiz questions are written only after reviewing the translations and purports on Vedabase.io.</li>
        <li>Feedback explanations are aligned with Srila Prabhupada's intended meaning, not independent interpretation.</li>
        <li>Direct links are provided to the exact verse pages on Vedabase.io for verification and further study.</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 22 }}>What is not used</h2>
      <ul>
        <li>No content from social media, blogs, or forums is used.</li>
        <li>No secondary commentaries or modern reinterpretations are referenced.</li>
        <li>No speculative or comparative material is introduced.</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 22 }}>Independence and respect</h2>
      <p>
        Vedabase Quiz is not affiliated with Vedabase.io or the Bhaktivedanta Book Trust. It exists solely as a study aid for students who
        wish to engage more carefully with these scriptures.
      </p>
      <p>
        All credit for the original translations and purports belongs fully to Srila Prabhupada and the Bhaktivedanta Book Trust.
      </p>

      <h2 style={{ fontSize: 18, marginTop: 22 }}>Acknowledgment</h2>
      <p>
        The quiz framework, structure, and question design on this site were developed with the assistance of an AI research and writing
        partner (ChatGPT), used as a tool to support careful organization, consistency, and clarity.
      </p>
      <p>Final responsibility for content selection, verification against Vedabase.io, and publication rests with the site creator.</p>
    </main>
  );
}
