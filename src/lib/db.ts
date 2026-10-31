import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import initSqlJs, { type Database } from 'sql.js';

// Base de datos SQLite real (sql.js = SQLite compilado a WebAssembly, sin
// compilar código nativo — better-sqlite3 requiere Xcode Command Line Tools,
// que no están instaladas). El archivo .sqlite vive en memoria mientras el
// servidor corre y se vuelca a disco en cada escritura.
//
// Tabla: responses(id, encuesta)
//   id       -> número de solicitud (autoincremental)
//   encuesta -> JSON completo: { survey_type, created_at, answers }

const dataDir = fileURLToPath(new URL('../../data/', import.meta.url));
const dbFile = path.join(dataDir, 'surveys.sqlite');

let dbPromise: Promise<Database> | null = null;

async function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQL = await initSqlJs({
        locateFile: (f) => fileURLToPath(new URL(`../../node_modules/sql.js/dist/${f}`, import.meta.url)),
      });

      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

      const db = fs.existsSync(dbFile) ? new SQL.Database(fs.readFileSync(dbFile)) : new SQL.Database();

      db.run(`
        CREATE TABLE IF NOT EXISTS responses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          encuesta TEXT NOT NULL
        );
      `);

      persist(db);
      return db;
    })();
  }
  return dbPromise;
}

function persist(db: Database) {
  const data = db.export();
  fs.writeFileSync(dbFile, Buffer.from(data));
}

export interface SurveyPayload {
  survey_type: string;
  created_at: string;
  answers: Record<string, string>;
}

export interface SurveyResponseRow extends SurveyPayload {
  id: number;
}

export async function insertResponse(surveyType: string, answers: unknown) {
  const db = await getDb();
  const payload: SurveyPayload = {
    survey_type: surveyType,
    created_at: new Date().toISOString(),
    answers: answers as Record<string, string>,
  };

  const stmt = db.prepare('INSERT INTO responses (encuesta) VALUES (:encuesta)');
  stmt.run({ ':encuesta': JSON.stringify(payload) });
  stmt.free();
  persist(db);
}

function parseRow(row: { id: number; encuesta: string }): SurveyResponseRow | null {
  try {
    const payload = JSON.parse(row.encuesta) as SurveyPayload;
    return { id: row.id, ...payload };
  } catch {
    return null;
  }
}

export async function listResponses(surveyType?: string): Promise<SurveyResponseRow[]> {
  const db = await getDb();
  const stmt = db.prepare('SELECT * FROM responses ORDER BY id DESC');

  const rows: SurveyResponseRow[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject() as { id: number; encuesta: string };
    const parsed = parseRow(row);
    if (parsed && (!surveyType || parsed.survey_type === surveyType)) rows.push(parsed);
  }
  stmt.free();
  return rows;
}
