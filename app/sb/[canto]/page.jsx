import Link from "next/link";
import { getSbAvailability, listSbCantos, listSbChaptersInCanto} from "../../../lib/quizLoader";

export function generateStaticParams() {
  return listSbCantos().map((c) => ({ canto: String(c) }));
}

function getAudienceFromSearchParams(searchParams) {
  const a = searchParams["audience"];
  const v = Array.isArray(a) ? a[0] : a;
  if (v === "adult" || v === "kids") return v;
  return "all";
}

export default function SbCantoPage({ params, searchParams }) {
  const cantoNum = Number(params.canto);
  const audience = getAudienceFromSearchParams(searchParams);
  const availability = getSbAvailability();

  // If no quizzes yet for many chapters, we still want a reasonable list.
  const existing = listSbChaptersInCanto(cantoNum);
  const maxChapter = existing.length > 0 ? Math.max(...existing) : 5; // start small if empty
  const chapters = Array.from({ length: Math.max(maxChapter, 5) }, (_, i) => i + 1);

  function linkFor(chapter, aud) {
    const key = `${cantoNum}/${chapter}-${aud}`;
    const meta = availability.get(key);
    return meta ? `/quiz/${meta.slug}/` : null;
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Srimad Bhagavatam - Canto {cantoNum}</h1>

      <div className="filterBar">
        <Link href={`/sb/${cantoNum}/`}>
          <button className={`filterBtn ${audience === "all" ? "active" : ""}`}>
            All
          </button>
        </Link>
        <Link href={`/sb/${cantoNum}/?audience=adult`}>
          <button className={`filterBtn ${audience === "adult" ? "active" : ""}`}>
            Adult
          </button>
        </Link>
        <Link href={`/sb/${cantoNum}/?audience=kids`}>
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

      <div style={{ marginTop: 18 }}>
        <Link href="/sb/">Back to cantos</Link>
      </div>
    </main>
  );
}
