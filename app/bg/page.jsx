import Link from "next/link";
import { getBgAvailability} from "../../lib/quizLoader";

function getAudienceFromSearchParams(searchParams) {
  const a = searchParams["audience"];
  const v = Array.isArray(a) ? a[0] : a;
  if (v === "adult" || v === "kids") return v;
  return "all";
}

export default function BgIndex({ searchParams  }) {
  const availability = getBgAvailability();
  const audience = getAudienceFromSearchParams(searchParams);

  const chapters = Array.from({ length: 18 }, (_, i) => i + 1);

  function linkFor(chapter, aud) {
    const key = `${chapter}-${aud}`;
    const meta = availability.get(key);
    return meta ? `/quiz/${meta.slug}/` : null;
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Bhagavad Gita</h1>

      <div className="filterBar">
        <Link href="/bg/">
          <button className={`filterBtn ${audience === "all" ? "active" : ""}`}>
            All
          </button>
        </Link>
        <Link href="/bg/?audience=adult">
          <button className={`filterBtn ${audience === "adult" ? "active" : ""}`}>
            Adult
          </button>
        </Link>
        <Link href="/bg/?audience=kids">
          <button className={`filterBtn ${audience === "kids" ? "active" : ""}`}>
            Kids
          </button>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {chapters.map((ch) => {
          const adultUrl = linkFor(ch, "adult");
          const kidsUrl = linkFor(ch, "kids");

          const showAdult = audience === "all" || audience === "adult";
          const showKids = audience === "all" || audience === "kids";

          const hasAny = (showAdult && adultUrl) || (showKids && kidsUrl);

          return (
            <div key={ch} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Chapter {ch}</div>

              {showAdult && (
                <div style={{ marginBottom: 6 }}>
                  {adultUrl ? (
                    <Link href={adultUrl}>Adult quiz</Link>
                  ) : (
                    <span className="comingSoonBadge">Adult: coming soon</span>
                  )}
                </div>
              )}

              {showKids && (
                <div>
                  {kidsUrl ? (
                    <Link href={kidsUrl}>Kids quiz</Link>
                  ) : (
                    <span className="comingSoonBadge">Kids: coming soon</span>
                  )}
                </div>
              )}

              {!hasAny && <div style={{ opacity: 0.7 }}>No quizzes for this filter.</div>}
            </div>
          );
        })}
      </div>
    </main>
  );
}
