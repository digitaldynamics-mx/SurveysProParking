import pg from 'pg';
import crypto from 'node:crypto';

// Conecta a la tabla "Surveys" en el Postgres de producción de ProParking
// (mismo droplet). La tabla solo tiene dos columnas: id (text, generado por
// la app como UUID) y survey_enroll (json, con tipo de encuesta, fecha y
// respuestas). No se toca ninguna otra tabla de esa base de datos.
//
// SSL sin verificación de certificado: decisión explícita del cliente
// (certificado autofirmado en el servidor Postgres).

const { Pool } = pg;

let pool: InstanceType<typeof Pool> | null = null;

function getPool() {
  if (!pool) {
    const connectionString = import.meta.env.DATABASE_URL;
    if (!connectionString) throw new Error('DATABASE_URL no está configurado');
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

export interface SurveyPayload {
  survey_type: string;
  created_at: string;
  answers: Record<string, string>;
}

export interface SurveyResponseRow extends SurveyPayload {
  id: string;
}

export async function insertResponse(surveyType: string, answers: unknown) {
  const payload: SurveyPayload = {
    survey_type: surveyType,
    created_at: new Date().toISOString(),
    answers: answers as Record<string, string>,
  };

  const id = crypto.randomUUID();

  await getPool().query('INSERT INTO "Surveys" (id, survey_enroll) VALUES ($1, $2)', [
    id,
    JSON.stringify(payload),
  ]);
}

export async function listResponses(surveyType?: string): Promise<SurveyResponseRow[]> {
  const result = await getPool().query<{ id: string; survey_enroll: SurveyPayload }>(
    'SELECT id, survey_enroll FROM "Surveys"'
  );

  const rows = result.rows
    .map((r) => ({ id: r.id, ...r.survey_enroll }))
    .filter((r) => !surveyType || r.survey_type === surveyType)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

  return rows;
}
