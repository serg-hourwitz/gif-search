import { useCallback, useRef } from 'react';
import { fetchGifs } from '../api/giphy';
import type { GiphyGif } from '../types/giphy';

export type SearchResult = {
  gifs: GiphyGif[];
  loading: boolean;
  error?: string | null;
};

export function useGifSearch() {
  const controllerRef = useRef<AbortController | null>(null);

  const search = useCallback(async (apiKey: string, q: string) => {
    if (!q.trim()) return { gifs: [], loading: false, error: null };
    controllerRef.current?.abort();
    const ctrl = new AbortController();
    controllerRef.current = ctrl;

    const { data, error } = await fetchGifs(apiKey, q, ctrl.signal);

    if (error) {
      return { gifs: [], loading: false, error: error.message || 'Unknown' };
    }

    return { gifs: data?.data ?? [], loading: false, error: null };
  }, []);

  const cancel = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  return { search, cancel };
}
