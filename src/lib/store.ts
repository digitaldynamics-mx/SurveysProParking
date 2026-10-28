import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Guarda cada respuesta como una línea JSON independiente (JSON Lines) en un
// archivo plano. Es intencionalmente simple: nada de base de datos nativa que
// compilar, perfecto para el volumen de una encuesta interna.

const dataDir = fileURLToPath(new URL('../../data/', import.meta.url));
const file = path.join(dataDir, 'responses.ndjson');

function ensureFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(file)) fs.writeFileSync(file, '');
}

export interface StoredResponse {
  survey_type: string;
  created_at: string;
  answers: Record<string, string>;
}

export function insertResponse(surveyType: string, answers: unknown) {
  ensureFile();
  const record: StoredResponse = {
    survey_type: surveyType,
    created_at: new Date().toISOString(),
    answers: answers as Record<string, string>,
  };
  fs.appendFileSync(file, JSON.stringify(record) + '\n');
}

function readAll(): StoredResponse[] {
  ensureFile();
  const raw = fs.readFileSync(file, 'utf-8');
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line) as StoredResponse;
      } catch {
        return null;
      }
    })
    .filter((r): r is StoredResponse => r !== null);
}

export function listResponses(surveyType?: string): StoredResponse[] {
  const all = readAll().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  if (!surveyType) return all;
  return all.filter((r) => r.survey_type === surveyType);
}
