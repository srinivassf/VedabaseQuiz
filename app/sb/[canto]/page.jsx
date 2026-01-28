import Link from "next/link";
import { redirect } from "next/navigation";
import { getSbAvailability, listSbCantos, listSbChaptersInCanto } from "../../../lib/quizLoader";

// Expand as you publish (ASCII-only)
const SB_CHAPTER_TITLES = {
  1: {
    1: "Questions by the Sages",
    2: "Divinity and Divine Service",
    3: "Krsna Is the Source of All Incarnations",
    4: "The Appearance of Sri Narada",
    5: "Narada's Instructions on Srimad-Bhagavatam for Vyasadeva",
    6: "Conversation Between Narada and Vyasadeva",
    7: "The Son of Drona Punished",
    8: "Prayers by Queen Kunti and Pariksit Saved",
    9: "The Passing Away of Bhismadeva in the Presence of Lord Krsna",
    10: "Departure of Lord Krsna for Dvaraka",
    11: "Lord Krsna's Entrance into Dvaraka",
    12: "Birth of Emperor Pariksit",
    13: "Dhritarastra Quits Home",
    14: "The Disappearance of Lord Krsna",
    15: "The Pandavas Retire Timely",
    16: "How Pariksit Received the Age of Kali",
    17: "Punishment and Reward of Kali",
    18: "Maharaja Pariksit Cursed by a Brahmana Boy",
    19: "The Appearance of Sukadeva Gosvami",
  },
};

export function generateStaticParams() {
  return listSbCantos().map((c) => ({ canto: String(c) }));
}

function getAudienceFromSearchParams(searchParams) {
  const a = searchParams?.audience;
  const v = Array.isArray(a) ? a[0] : a;
  if (v === "kids" || v === "teens" || v === "adult") return v;
  return "adult";
}

export default function SbCantoPage({ params, searchParams }) {
  if (!searchParams?.audience) {
    redirect(`/sb/${params.canto}/?audience=adult`);
  }

  const cantoNum = Number(params.canto);
  const audience = getAudienceFromSearchParams(searchParams);
  const audienceLabel = audience.charAt(0).toUpperCase() + audience.slice(1);

  const availability = getSbAvailability();

  // Show a reasonable list even if many aren't added yet
  const existing = listSbChaptersInCanto(cantoNum);
  const maxChapter = existing.length > 0 ? Math.max(...existing) : 5;
  const chapters = Array.from({ length: Math.max(maxChapter, 5) }, (_, i) => i + 1);

  function linkFor(chapter, aud) {
    const key = `${cantoNum}/${chapter}-${aud}`;
    const meta = availability.get(key);
    return meta ? `/quiz/${meta.slug}/` : null;
  }

  function titleFor(canto, chapter) {
    return SB_CHAPTER_TITLES[canto]?.[chapter] || "";
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      {/* Breadcrumb (consistent with BG) */}
      <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 10 }}>
        <Link href="/">Home</Link>
        <span style={{ opacity: 0.6 }}> / </span>
        <Link href={`/sb/?audience=${audience}`}>Srimad Bhagavatam</Link>
        <span style={{ opacity: 0.6 }}> / </span>
        <span>Canto {cantoNum}</span>
        <span style={{ opacity: 0.6 }}> / </span>
        <span>{audienceLabel}</span>
      </div>

      <h1 style={{ fontSize: 28, margin: "0 0 10px" }}>Srimad Bhagavatam</h1>
      <div style={{ opacity: 0.8, marginBottom: 8 }}>Canto {cantoNum}</div>

      {/* Tabs (match BG) */}
      <div className="filterBar" style={{ marginTop: 10, marginBottom: 18 }}>
        <Link href={`/sb/${cantoNum}/?audience=adult`}>
          <button className={`filterBtn ${audience === "adult" ? "filterBtnActive" : ""}`}>Adult</button>
        </Link>
        <Link href={`/sb/${cantoNum}/?audience=teens`}>
          <button className={`filterBtn ${audience === "teens" ? "filterBtnActive" : ""}`}>Teens</button>
        </Link>
        <Link href={`/sb/${cantoNum}/?audience=kids`}>
          <button className={`filterBtn ${audience === "kids" ? "filterBtnActive" : ""}`}>Kids</button>
        </Link>
      </div>

      {/* Cards (same as BG) */}
      <div className="chapterGrid">
        {chapters.map((ch) => {
          const selectedUrl = linkFor(ch, audience);
          const isAvailable = !!selectedUrl;
          const title = titleFor(cantoNum, ch);

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

          return isAvailable ? (
            <Link key={ch} href={selectedUrl} className="cardLink">
              {cardInner}
            </Link>
          ) : (
            <div key={ch} className="cardLink cardLinkDisabled">
              {cardInner}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 18 }}>
        <Link href={`/sb/?audience=${audience}`}>Back to cantos</Link>
      </div>
    </main>
  );
}
