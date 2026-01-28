export default function HomePage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 20, marginBottom: 10 }}>Welcome & Hare Krsna!</h1>

      {/* NEW intro text (mobile-tight) */}
      <div style={{ opacity: 0.9, marginTop: 0, lineHeight: 1.5 }}>
        <p style={{ marginTop: 0, marginBottom: 10 }}>
          Vedabase Quiz is a sacred self-study space to deepen understanding of the Bhagavad Gita and Srimad Bhagavatam.
        </p>

        <p style={{ marginTop: 0, marginBottom: 10 }}>
          The quizzes encourage careful reflection on verses and purports — slowing down study, clarifying key ideas, and revealing subtle
          insights over time.
        </p>

        <p style={{ marginTop: 0, marginBottom: 20 }}>
          Not a test or competition, but a support for steady engagement with the scriptures.{" "}
          <span style={{ opacity: 0.9 }}>
            New here? Read below about the intention and design of the quizzes.
          </span>
        </p>
      </div>

      {/* Cards */}
<div style={{ display: "grid", gap: 12 }}>
  <a
    href="/bg/"
    style={{
      padding: 14,
      border: "1px solid #ddd",
      borderRadius: 10,
      textDecoration: "none",
      color: "inherit",
      display: "grid",
      gridTemplateColumns: "88px 1fr",
      gap: 12,
      alignItems: "center",
    }}
  >
    <img
      src="/images/bg-cover.jpg"
      alt="Bhagavad Gita"
      style={{
        width: 88,
        height: 88,
        objectFit: "cover",
        borderRadius: 10,
        border: "1px solid #eee",
      }}
    />
    <div>
      <div style={{ fontWeight: 700 }}>Bhagavad Gita</div>
    </div>
  </a>

  <a
    href="/sb/"
    style={{
      padding: 14,
      border: "1px solid #ddd",
      borderRadius: 10,
      textDecoration: "none",
      color: "inherit",
      display: "grid",
      gridTemplateColumns: "88px 1fr",
      gap: 12,
      alignItems: "center",
    }}
  >
    <img
      src="/images/sb-cover.jpg"
      alt="Srimad Bhagavatam"
      style={{
        width: 88,
        height: 88,
        objectFit: "cover",
        borderRadius: 10,
        border: "1px solid #eee",
      }}
    />
    <div>
      <div style={{ fontWeight: 700 }}>Srimad Bhagavatam</div>
    </div>
  </a>
</div>

       {/* Collapsible section */}
      <details style={{ marginTop: 14, marginBottom: 18 }}>
  <summary
    style={{
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 16,
    }}
  >
    About Vedabase Quiz
  </summary>

  <div style={{ paddingTop: 12, paddingLeft: 12, opacity: 0.92, lineHeight: 1.55 }}>
    <p style={{ marginTop: 0 }}>
      <strong>Vedabase Quiz</strong> is a quiet self-study project created to support deeper engagement with the{" "}
      <em>Bhagavad Gita</em> and <em>Srimad Bhagavatam</em>.
    </p>

    <p>
      The quizzes on this site are not tests, competitions, or assessments of knowledge. They are designed to help
      readers slow down, reflect carefully on verses, and consider the intended meaning of the teachings as presented
      in Srila Prabhupada’s translations and purports.
    </p>

    <h3 style={{ fontSize: 16, margin: "16px 0 8px" }}>Purpose of the quizzes</h3>
    <p style={{ marginTop: 0 }}>
      Reading sacred texts often happens quickly—especially for familiar chapters or well-known verses. Vedabase Quiz
      exists to gently counter that tendency by encouraging attentive reading and thoughtful reflection.
    </p>

    <ul style={{ marginTop: 8 }}>
      <li>
        For readers newer to these scriptures, the questions help highlight essential ideas and provide structure
        for careful study.
      </li>
      <li>
        For experienced readers, the quizzes offer an opportunity to revisit familiar passages and notice
        subtleties that are easy to overlook.
      </li>
    </ul>

    <p style={{ marginTop: 10 }}>
      The goal is not to memorize answers, but to deepen understanding over time.
    </p>

    <h3 style={{ fontSize: 16, margin: "16px 0 8px" }}>How the quizzes are designed</h3>
    <ul style={{ marginTop: 0 }}>
      <li>All questions are based <strong>only</strong> on translations and purports from <strong>Vedabase.io</strong></li>
      <li>Each question is verified against the exact verse and purport it references</li>
      <li>Questions follow the natural flow of each chapter, from context to conclusion</li>
      <li>Explanations and direct verse links are provided after submission</li>
    </ul>

    <h3 style={{ fontSize: 16, margin: "16px 0 8px" }}>A self-study space</h3>
    <p style={{ marginTop: 0 }}>
      Vedabase Quiz is meant for individual, self-paced study. There is no pass or fail—only an opportunity to
      engage more thoughtfully with the texts.
    </p>
    <p>
      Readers are encouraged to take their time, revisit verses, and use the quizzes as a companion to regular
      reading rather than a replacement for it.
    </p>

    <h3 style={{ fontSize: 16, margin: "16px 0 8px" }}>Credits and acknowledgement</h3>
    <p style={{ marginTop: 0 }}>
      All scriptural content referenced on this site is sourced from <strong>Vedabase.io</strong>, which makes the
      works of <strong>His Divine Grace A. C. Bhaktivedanta Swami Prabhupada</strong> freely available for study.
    </p>
    <p style={{ marginBottom: 0 }}>
      The original translations and purports are published by the{" "}
      <strong>Bhaktivedanta Book Trust (BBT)</strong>.
    </p>
    <p style={{ marginTop: 8, fontSize: 14, opacity: 0.85 }}>
      Vedabase Quiz is an independent, non-commercial project and is not affiliated with Vedabase.io or the
      Bhaktivedanta Book Trust.
    </p>
  </div>
</details>


    </main>
  );
}
