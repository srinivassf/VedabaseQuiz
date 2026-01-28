import Link from "next/link";
import { redirect } from "next/navigation";
import { getBgAvailability } from "../../lib/quizLoader";

// Vedabase chapter headings (ASCII-only)
const BG_CHAPTER_TITLES = {
  1: "Observing the Armies on the Battlefield of Kuruksetra",
  2: "Contents of the Gita Summarized",
  3: "Karma-yoga",
  4: "Transcendental Knowledge",
  5: "Karma-yoga - Action in Krsna Consciousness",
  6: "Dhyana-yoga",
  7: "Knowledge of the Absolute",
  8: "Attaining the Supreme",
  9: "The Most Confidential Knowledge",
  10: "The Opulence of the Absolute",
  11: "The Universal Form",
  12: "Devotional Service",
  13: "Nature, the Enjoyer, and Consciousness",
  14: "The Three Modes of Material Nature",
  15: "The Yoga of the Supreme Person",
  16: "The Divine and Demoniac Natures",
  17: "The Divisions of Faith",
  18: "Conclusion - The Perfection of Renunciation",
};

function getAudienceFromSearchParams(searchParams) {
  const a = searchParams?.audience;
  const v = Array.isArray(a) ? a[0] : a;
  if (v === "kids" || v === "teens" || v === "adult") return v;
  return "adult";
}

export default function BgIndex({ searchParams }) {
  if (!searchParams?.audience) redirect("/bg/?audience=adult");

  const availability = getBgAvailability();
  const audience = getAudienceFromSearchParams(searchParams);
  const chapters = Array.from({ length: 18 }, (_, i) => i + 1);

  function linkFor(chapter, aud) {
    const key = `${chapter}-${aud}`;
    const meta = availability.get(key);
    return meta ? `/quiz/${meta.slug}/` : null;
  }

  const audienceLabel = audience.charAt(0).toUpperCase() + audience.slice(1);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 10 }}>
        <Link href="/">Home</Link>
        <span style={{ opacity: 0.6 }}> / </span>
        <span>Bhagavad Gita</span>
        <span style={{ opacity: 0.6 }}> / </span>
        <span>{audienceLabel}</span>
      </div>

      <h1 style={{ fontSize: 28, margin: "0 0 10px" }}>Bhagavad Gita</h1>

      {/* Tabs */}
      <div className="filterBar" style={{ marginTop: 10, marginBottom: 18 }}>
        <Link href="/bg/?audience=adult">
          <button className={`filterBtn ${audience === "adult" ? "filterBtnActive" : ""}`}>Adult</button>
        </Link>
        <Link href="/bg/?audience=teens">
          <button className={`filterBtn ${audience === "teens" ? "filterBtnActive" : ""}`}>Teens</button>
        </Link>
        <Link href="/bg/?audience=kids">
          <button className={`filterBtn ${audience === "kids" ? "filterBtnActive" : ""}`}>Kids</button>
        </Link>
      </div>

      {/* Cards */}
      {/* Cards */}
      <div className="chapterGrid">
        {chapters.map((ch) => {
          const selectedUrl = linkFor(ch, audience);
          const isAvailable = !!selectedUrl;
          const title = BG_CHAPTER_TITLES[ch] || "";

          const cardInner = (
            <div className={`chapterCard ${isAvailable ? "" : "chapterCardDisabled"}`}>
              <div>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Chapter {ch}</div>
                {title ? <div className="chapterTitle">{title}</div> : null}
              </div>

              {!isAvailable ? (
                <div className="comingSoonBadge">{audienceLabel}: coming soon</div>
              ) : (
                <div />
              )}
            </div>
          );

          // Keep wrapper consistent: Link when available, div when not.
          return isAvailable ? (
            <Link key={ch} href={selectedUrl} className="cardLink">
              {cardInner}
            </Link>
          ) : (
            <div key={ch} className="cardLink">
              {cardInner}
            </div>
          );
        })}
      </div>


      <div style={{ marginTop: 18 }}>
        <Link href="/">Back to home</Link>
      </div>
    </main>
  );
}
