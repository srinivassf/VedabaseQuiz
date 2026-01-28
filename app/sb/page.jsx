import Link from "next/link";
import { redirect } from "next/navigation";

// Vedabase Canto titles (ASCII-only)
const SB_CANTO_TITLES = {
  1: "Creation",
  2: "The Cosmic Manifestation",
  3: "The Status Quo",
  4: "The Creation of the Fourth Order",
  5: "The Creative Impetus",
  6: "Prescribed Duties for Mankind",
  7: "The Science of God",
  8: "Withdrawal of the Cosmic Creations",
  9: "Liberation",
  10: "The Summum Bonum",
  11: "General History",
  12: "The Age of Deterioration",
};

function getAudienceFromSearchParams(searchParams) {
  const a = searchParams?.audience;
  const v = Array.isArray(a) ? a[0] : a;
  if (v === "kids" || v === "teens" || v === "adult") return v;
  return "adult";
}

export default function SbIndex({ searchParams }) {
  if (!searchParams?.audience) {
    redirect("/sb/?audience=adult");
  }

  const audience = getAudienceFromSearchParams(searchParams);
  const audienceLabel = audience.charAt(0).toUpperCase() + audience.slice(1);

  // Always show all 12 cantos
  const cantos = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      {/* Breadcrumb (match BG style) */}
      <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 10 }}>
        <Link href="/">Home</Link>
        <span style={{ opacity: 0.6 }}> / </span>
        <span>Srimad Bhagavatam</span>
        <span style={{ opacity: 0.6 }}> / </span>
        <span>{audienceLabel}</span>
      </div>

      <h1 style={{ fontSize: 28, margin: "0 0 10px" }}>Srimad Bhagavatam</h1>

      {/* Tabs */}
      <div className="filterBar" style={{ marginTop: 10, marginBottom: 18 }}>
        <Link href="/sb/?audience=adult">
          <button className={`filterBtn ${audience === "adult" ? "filterBtnActive" : ""}`}>Adult</button>
        </Link>
        <Link href="/sb/?audience=teens">
          <button className={`filterBtn ${audience === "teens" ? "filterBtnActive" : ""}`}>Teens</button>
        </Link>
        <Link href="/sb/?audience=kids">
          <button className={`filterBtn ${audience === "kids" ? "filterBtnActive" : ""}`}>Kids</button>
        </Link>
      </div>

      {/* Cards (use same grid + card classes as BG) */}
      <div className="chapterGrid">
        {cantos.map((c) => (
          <Link key={c} href={`/sb/${c}/?audience=${audience}`} className="cardLink">
            <div className="chapterCard">
              <div>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Canto {c}</div>
                <div className="chapterTitle">{SB_CANTO_TITLES[c] || ""}</div>
              </div>

              {/* Spacer to keep vertical rhythm similar to BG cards */}
              <div />
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <Link href="/">Back to home</Link>
      </div>
    </main>
  );
}
