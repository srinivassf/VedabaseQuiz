import fs from "fs";
import path from "path";
function safeJoin(baseDir, rel) {
  const full = path.join(baseDir, rel);
  const normBase = path.resolve(baseDir);
  const normFull = path.resolve(full);
  if (!normFull.startsWith(normBase)) throw new Error("Unsafe path");
  return normFull;
}

export function getQuizBySlug(slug) {
  const quizzesDir = path.join(process.cwd(), "data", "quizzes");
  const parts = slug.split("/").filter(Boolean);
  if (parts.length < 2) throw new Error("Invalid quiz slug");

  const collection = parts[0]; // bg or sb
  const file = parts.slice(1).join("/") + ".json";
  const fullPath = safeJoin(quizzesDir, path.join(collection, file));
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
}

export function listQuizSlugs() {
  const quizzesDir = path.join(process.cwd(), "data", "quizzes");
  const results = [];

  function walk(dir, relPrefix) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const rel = relPrefix ? path.join(relPrefix, ent.name) : ent.name;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full, rel);
      else if (ent.isFile() && ent.name.endsWith(".json")) {
        results.push(rel.replace(/\.json$/, ""));
      }
    }
  }

  if (fs.existsSync(quizzesDir)) walk(quizzesDir, "");
  return results;
}

function parseBgSlug(slug) {
  // bg/5-adult or bg/5-kids
  const m = slug.match(/^bg\/(\d+)-(adult|kids)$/);
  if (!m) return null;
  return { chapter: Number(m[1]), audience: m[2] };
}

function parseSbSlug(slug) {
  // sb/1/1-adult or sb/1/1-kids
  const m = slug.match(/^sb\/(\d+)\/(\d+)-(adult|kids)$/);
  if (!m) return null;
  return { canto: Number(m[1]), chapter: Number(m[2]), audience: m[3] };
}

export function listQuizMetas() {
  const slugs = listQuizSlugs();
  const metas = [];

  for (const slug of slugs) {
    if (slug.startsWith("bg/")) {
      const p = parseBgSlug(slug);
      if (!p) continue;
      const q = getQuizBySlug(slug);
      metas.push({
        slug,
        scripture: "bg",
        audience: p.audience,
        difficulty: q.difficulty,
        title: q.title,
        publishedOn: q.publishedOn,
        chapter: p.chapter,
      });
    } else if (slug.startsWith("sb/")) {
      const p = parseSbSlug(slug);
      if (!p) continue;
      const q = getQuizBySlug(slug);
      metas.push({
        slug,
        scripture: "sb",
        audience: p.audience,
        difficulty: q.difficulty,
        title: q.title,
        publishedOn: q.publishedOn,
        canto: p.canto,
        sbChapter: p.chapter,
      });
    }
  }

  return metas;
}

export function getLatestQuizzes(limit = 10) {
  const metas = listQuizMetas();
  metas.sort((a, b) => {
    const da = a.publishedOn ? Date.parse(a.publishedOn) : 0;
    const db = b.publishedOn ? Date.parse(b.publishedOn) : 0;
    return db - da;
  });
  return metas.slice(0, limit);
}

export function getBgAvailability() {
  const metas = listQuizMetas().filter((m) => m.scripture === "bg" && typeof m.chapter === "number");
  const map = new Map(); // key: `${chapter}-${audience}`
  metas.forEach((m) => map.set(`${m.chapter}-${m.audience}`, m));
  return map;
}

export function getSbAvailability() {
  const metas = listQuizMetas().filter((m) => m.scripture === "sb" && typeof m.canto === "number" && typeof m.sbChapter === "number");
  const map = new Map(); // key: `${canto}/${chapter}-${audience}`
  metas.forEach((m) => map.set(`${m.canto}/${m.sbChapter}-${m.audience}`, m));
  return map;
}

export function listSbCantos() {
  const metas = listQuizMetas().filter((m) => m.scripture === "sb" && typeof m.canto === "number");
  const set = new Set();
  metas.forEach((m) => set.add(m.canto));
  return Array.from(set).sort((a, b) => a - b);
}

export function listSbChaptersInCanto(canto) {
  const metas = listQuizMetas().filter((m) => m.scripture === "sb" && m.canto === canto && typeof m.sbChapter === "number");
  const set = new Set();
  metas.forEach((m) => set.add(m.sbChapter));
  return Array.from(set).sort((a, b) => a - b);
}
