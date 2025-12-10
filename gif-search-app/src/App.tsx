import { useCallback, useMemo } from 'react';
import { useGifStore } from './store/gifs';
import { useGifSearch } from './hooks/useGifSearch';
import Button from './components/ui/Button';
import GifCard from './components/GifCard';
import GifModal from './components/GifModal';
import Loading from './components/ui/Loading';
import ErrorState from './components/ui/ErrorState';
import EmptyState from './components/ui/EmptyState';
import SearchInput from './components/SearchInput';
import { DEBOUNCE_MS } from './utils/constants';
import { useDebounce } from './hooks/useDebounce';
import type { GiphyGif } from './types/giphy';

export default function App() {
  const {
    query,
    setQuery,
    gifs,
    setGifs,
    selected,
    setSelected,
    loading,
    setLoading,
    error,
    setError,
  } = useGifStore();
  const { search: rawSearch, cancel } = useGifSearch();
  // debounced caller
  const debouncedSearch = useDebounce(async (q: string) => {
    if (!q.trim()) {
      setGifs([]);
      return;
    }
    setLoading(true);
    setError(null);
    const res = await rawSearch(import.meta.env.VITE_GIPHY_API_KEY, q);
    if (res.error) setError(res.error);
    else setGifs(res.gifs);
    setLoading(false);
  }, DEBOUNCE_MS);

  const onSearchClick = useCallback(async () => {
    // trigger immediate search (not debounced)
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    setLoading(true);
    setError(null);
    const res = await rawSearch(import.meta.env.VITE_GIPHY_API_KEY, query);
    if (res.error) setError(res.error);
    else setGifs(res.gifs);
    setLoading(false);
  }, [query, rawSearch, setError, setGifs, setLoading]);

  // wire input change -> debounced search
  const onChange = useCallback(
    (v: string) => {
      setQuery(v);
      debouncedSearch(v);
    },
    [setQuery, debouncedSearch]
  );

  // open card
  const onOpen = useCallback((g: GiphyGif) => setSelected(g), [setSelected]);

  const list = useMemo(() => gifs, [gifs]);

  // notifications via modal - lightweight: using store error as notification
  const notify = useCallback(
    (msg: string) => {
      setError(msg);
      // auto clear after 2.2s
      setTimeout(() => setError(null), 2200);
    },
    [setError]
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <header className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
        <h1 className="text-2xl font-bold flex-grow">Easy GIF Search App 🎉</h1>

        <SearchInput
          value={query}
          onChange={onChange}
          onClear={() => {
            setQuery('');
            setGifs([]);
            cancel();
          }}
        />

        <Button
          onClick={onSearchClick}
          className="sm:mt-0 w-full sm:w-auto ml-2"
          variant="primary"
        >
          Search
        </Button>
      </header>

      {error && <ErrorState message={error} onRetry={() => onSearchClick()} />}

      {loading ? (
        <Loading />
      ) : list.length === 0 ? (
        <EmptyState message="No GIFs found. Try another query." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {list.map((g) => (
            <GifCard key={g.id} gif={g} onOpen={onOpen} />
          ))}
        </div>
      )}

      <GifModal
        gif={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onNotify={notify}
      />
    </div>
  );
}
