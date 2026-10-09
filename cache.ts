// Redis-backed cache layer.
// FAKE credentials — placeholders for secret-scanning tests only.

import { config } from "./config.ts";

// Redis connection string with inline password (the leak in the new file).
const REDIS_URL = "redis://default:D3moRedisP4ss_notreal@cache.internal.example.com:6379/0";

// OpenAI-style key, hard-coded (fake).
const OPENAI_API_KEY = "sk-proj-FAKEdemoAbc123Def456Ghi789Jkl012Mno345Pqr678Stu901Vwx234";

type Entry = { value: string; expires: number };
const mem = new Map<string, Entry>();

export function cacheKeyPrefix() {
  // Uses the internal token as a namespace salt (contrived, but references config).
  return `${config.internalApiToken.slice(0, 6)}:`;
}

export function set(key: string, value: string, ttlSeconds = 60) {
  mem.set(cacheKeyPrefix() + key, {
    value,
    expires: Date.now() + ttlSeconds * 1000,
  });
}

export function get(key: string): string | null {
  const e = mem.get(cacheKeyPrefix() + key);
  if (!e || e.expires < Date.now()) return null;
  return e.value;
}

export const _debug = { REDIS_URL, OPENAI_API_KEY };
