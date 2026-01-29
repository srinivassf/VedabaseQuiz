import fs from "fs";
import path from "path";

const USE_GOOGLE_SHEETS = process.env.USE_GOOGLE_SHEETS === "true";
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Cache to avoid repeated API calls in the same session
const sheetCache = {};

async function fetchGoogleSheet() {
  if (sheetCache.data && sheetCache.timestamp && Date.now() - sheetCache.timestamp < 3600000) {
    // Cache for 1 hour
    return sheetCache.data;
  }

  if (!GOOGLE_SHEETS_ID || !GOOGLE_API_KEY) {
    throw new Error("Google Sheets API credentials not configured. Set GOOGLE_SHEETS_ID and GOOGLE_API_KEY.");
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/Quiz%20Data?key=${GOOGLE_API_KEY}&valueRenderOption=UNFORMATTED_VALUE`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
  }

  const data = await response.json();
  const rows = data.values || [];
  
  if (rows.length === 0) {
    throw new Error("Google Sheet is empty");
  }

  const headers = rows[0];
  const quizzes = {};

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowData = {};
    
    headers.forEach((header, idx) => {
      rowData[header] = row[idx];
    });

    const quizId = rowData.quizId;
    if (!quizId) continue;

    if (!quizzes[quizId]) {
      quizzes[quizId] = {
        id: quizId,
        title: rowData.title,
        audience: rowData.audience,
        difficulty: rowData.difficulty,
        publishedOn: rowData.publishedOn,
        scripture: rowData.scriptureId,
        chapter: rowData.chapter ? Number(rowData.chapter) : null,
        canto: rowData.canto ? Number(rowData.canto) : null,
        sbChapter: rowData.sbChapter ? Number(rowData.sbChapter) : null,
        questions: [],
      };
    }

    quizzes[quizId].questions.push({
      id: rowData.questionId,
      prompt: rowData.prompt,
      choices: [rowData.choice1, rowData.choice2, rowData.choice3, rowData.choice4].filter(Boolean),
      correctIndex: Number(rowData.correctIndex),
      feedback: rowData.feedback,
      verseLabel: rowData.verseLabel,
      verseUrl: rowData.verseUrl,
    });
  }

  sheetCache.data = quizzes;
  sheetCache.timestamp = Date.now();
  return quizzes;
}

function safeJoin(baseDir, rel) {
  const full = path.join(baseDir, rel);
  const normBase = path.resolve(baseDir);
  const normFull = path.resolve(full);
  if (!normFull.startsWith(normBase)) throw new Error("Unsafe path");
  return normFull;
}

async function getQuizBySlugFromJson(slug) {
  const quizzesDir = path.join(process.cwd(), "data", "quizzes");
  const parts = slug.split("/").filter(Boolean);
  if (parts.length < 2) throw new Error("Invalid quiz slug");

  const collection = parts[0]; // bg or sb
  const file = parts.slice(1).join("/") + ".json";
  const fullPath = safeJoin(quizzesDir, path.join(collection, file));
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
}

export async function getQuizBySlug(slug) {
  if (USE_GOOGLE_SHEETS) {
    const quizzes = await fetchGoogleSheet();
    const quizData = Object.values(quizzes).find(q => {
      const prefix = q.scripture === "bg" 
        ? `bg/${q.chapter}-${q.audience}` 
        : `sb/${q.canto}/${q.sbChapter}-${q.audience}`;
      return prefix === slug;
    });
    
    if (!quizData) {
      throw new Error(`Quiz not found: ${slug}`);
    }
    return quizData;
  } else {
    return getQuizBySlugFromJson(slug);
  }
}

export function listQuizSlugs() {
  if (USE_GOOGLE_SHEETS) {
    // This will be called from async context in getLatestQuizzes
    return null; // Will handle async in listQuizMetas
  }

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
  // bg/5-adult or bg/5-kids or bg/5-teen
  const m = slug.match(/^bg\/(\d+)-(adult|kids|teen)$/);
  if (!m) return null;
  return { chapter: Number(m[1]), audience: m[2] };
}

function parseSbSlug(slug) {
  // sb/1/1-adult or sb/1/1-kids or sb/1/1-teen
  const m = slug.match(/^sb\/(\d+)\/(\d+)-(adult|kids|teen)$/);
  if (!m) return null;
  return { canto: Number(m[1]), chapter: Number(m[2]), audience: m[3] };
}

export async function listQuizMetas() {
  const metas = [];

  if (USE_GOOGLE_SHEETS) {
    const quizzes = await fetchGoogleSheet();
    for (const quizId in quizzes) {
      const q = quizzes[quizId];
      const slug = q.scripture === "bg"
        ? `bg/${q.chapter}-${q.audience}`
        : `sb/${q.canto}/${q.sbChapter}-${q.audience}`;

      metas.push({
        slug,
        scripture: q.scripture,
        audience: q.audience,
        difficulty: q.difficulty,
        title: q.title,
        publishedOn: q.publishedOn,
        chapter: q.chapter,
        canto: q.canto,
        sbChapter: q.sbChapter,
      });
    }
  } else {
    const slugs = listQuizSlugs();
    for (const slug of slugs) {
      if (slug.startsWith("bg/")) {
        const p = parseBgSlug(slug);
        if (!p) continue;
        const q = getQuizBySlugFromJson(slug);
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
        const q = getQuizBySlugFromJson(slug);
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
  }

  return metas;
}

export async function getLatestQuizzes(limit = 10) {
  const metas = await listQuizMetas();
  metas.sort((a, b) => {
    const da = a.publishedOn ? Date.parse(a.publishedOn) : 0;
    const db = b.publishedOn ? Date.parse(b.publishedOn) : 0;
    return db - da;
  });
  return metas.slice(0, limit);
}

export async function getBgAvailability() {
  const metas = await listQuizMetas();
  const filtered = metas.filter((m) => m.scripture === "bg" && typeof m.chapter === "number");
  const map = new Map(); // key: `${chapter}-${audience}`
  filtered.forEach((m) => map.set(`${m.chapter}-${m.audience}`, m));
  return map;
}

export async function getSbAvailability() {
  const metas = await listQuizMetas();
  const filtered = metas.filter((m) => m.scripture === "sb" && typeof m.canto === "number" && typeof m.sbChapter === "number");
  const map = new Map(); // key: `${canto}/${chapter}-${audience}`
  filtered.forEach((m) => map.set(`${m.canto}/${m.sbChapter}-${m.audience}`, m));
  return map;
}

export async function listSbCantos() {
  const metas = await listQuizMetas();
  const filtered = metas.filter((m) => m.scripture === "sb" && typeof m.canto === "number");
  const set = new Set();
  filtered.forEach((m) => set.add(m.canto));
  return Array.from(set).sort((a, b) => a - b);
}

export async function listSbChaptersInCanto(canto) {
  const metas = await listQuizMetas();
  const filtered = metas.filter((m) => m.scripture === "sb" && m.canto === canto && typeof m.sbChapter === "number");
  const set = new Set();
  filtered.forEach((m) => set.add(m.sbChapter));
  return Array.from(set).sort((a, b) => a - b);
}
