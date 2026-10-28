import crypto from 'node:crypto';

export const SESSION_COOKIE = 'pp_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 días

function getSecret(): string {
  const secret = import.meta.env.ADMIN_PASSWORD;
  if (!secret) throw new Error('ADMIN_PASSWORD no está configurado');
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function checkPassword(candidate: string): boolean {
  const expected = import.meta.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Token firmado sin estado: "<payloadBase64url>.<firmaHMAC>". No necesita
// guardarse en ningún lado — se verifica recalculando la firma cada vez.
export function startSession(): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })).toString(
    'base64url'
  );
  return `${payload}.${sign(payload)}`;
}

export function isAuthed(cookies: { get(name: string): { value: string } | undefined }): boolean {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}
