import type { GiphySearchResponse } from '../types/giphy';
import { API_URL, DEFAULT_LIMIT, DEFAULT_RATING } from '../utils/constants';

type FetchResult = { data?: GiphySearchResponse; error?: Error };

const cache = new Map<string, GiphySearchResponse>();

export async function fetchGifs(
  apiKey: string,
  q: string,
  signal?: AbortSignal,
  limit = DEFAULT_LIMIT,
  rating = DEFAULT_RATING
): Promise<FetchResult> {
  const key = `${q}|${limit}|${rating}`;
  if (cache.has(key)) {
    return { data: cache.get(key)! };
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    q,
    limit: String(limit),
    rating,
  });
  const url = `${API_URL}?${params.toString()}`;

  try {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as GiphySearchResponse;
    cache.set(key, data);
    return { data };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { error: new Error('Request aborted') };
    }
    return { error };
  }
}

// helper to clear cache 
export function clearGiphyCache() {
  cache.clear();
}
