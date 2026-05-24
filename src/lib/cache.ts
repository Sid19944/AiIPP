import redis from "../lib/Redis";

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 60 * 60 * 1000,
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetcher();

  await redis.set(key, JSON.stringify(data), {
    EX: ttl, // expiry time
    NX: true, // ONLY set if the key is new (prevents overwriting)
  });

  return data;
}
