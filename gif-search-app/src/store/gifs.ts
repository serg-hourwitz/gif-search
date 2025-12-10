import { create } from 'zustand';
import type { GiphyGif } from '../types/giphy';

type State = {
  query: string;
  gifs: GiphyGif[];
  selected: GiphyGif | null;
  loading: boolean;
  error: string | null;
  setQuery: (q: string) => void;
  setGifs: (g: GiphyGif[]) => void;
  setSelected: (g: GiphyGif | null) => void;
  setLoading: (b: boolean) => void;
  setError: (s: string | null) => void;
  clear: () => void;
};

export const useGifStore = create<State>((set) => ({
  query: 'Ukraine',
  gifs: [],
  selected: null,
  loading: false,
  error: null,
  setQuery: (q) => set({ query: q }),
  setGifs: (g) => set({ gifs: g }),
  setSelected: (g) => set({ selected: g }),
  setLoading: (b) => set({ loading: b }),
  setError: (s) => set({ error: s }),
  clear: () =>
    set({ query: '', gifs: [], selected: null, loading: false, error: null }),
}));
