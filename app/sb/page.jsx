import Link from "next/link";
import { listSbCantos} from "../../lib/quizLoader";

function getAudienceFromSearchParams(searchParams) {
  const a = searchParams["audience"];
  const v = Array.isArray(a) ? a[0] : a;
  if (v === "adult" || v === "kids") return v;
  return "all";
}

export default function SbIndex({ searchParams  }) {
  const cantos = listSbCantos();
  const audience = getAudienceFromSearchParams(searchParams);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Srimad Bhagavatam</h1>

      <div className="filterBar">
        <Link href="/sb/">
          <button className={`filterBtn ${audience === "all" ? "active" : ""}`}>
            All
          </button>
        </Link>
        <Link href="/sb/?audience=adult">
          <button className={`filterBtn ${audience === "adult" ? "active" : ""}`}>
            Adult
          </button>
        </Link>
        <Link href="/sb/?audience=kids">
          <button className={`filterBtn ${audience === "kids" ? "active" : ""}`}>
            Kids
          </button>
        </Link>
      </div>

      {cantos.length === 0 ? (
        <div style={{ opacity: 0.8 }}>No SB quizzes added yet.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {cantos.map((c) => (
            <a key={c} href={`/sb/${c}/?audience=${audience}`} style={{ padding: 14, border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}>
              <div style={{ fontWeight: 800 }}>Canto {c}</div>
              <div style={{ opacity: 0.8 }}>Browse chapters</div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
