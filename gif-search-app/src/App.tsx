import { useState, useEffect } from 'react';
import Modal from './components/Modal';
import GifModal from './components/GifModal';
import Button from './components/Button';



type GifObject = any;

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const API_URL = 'https://api.giphy.com/v1/gifs/search';

export default function App() {
  const [query, setQuery] = useState('Ukraine');
  const [gifs, setGifs] = useState<GifObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<GifObject | null>(null);
  const [error, setError] = useState<string | null>(null);

  // states for modals
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null);

  const showModal = (msg: string, type: 'success' | 'error') => {
    setModalMessage(msg);
    setModalType(type);
  };

  const search = async (q: string) => {
    if (!API_KEY) {
      setError('API key not found. Set VITE_GIPHY_API_KEY in .env');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        api_key: API_KEY,
        q,
        limit: '24',
        rating: 'g',
      });
      const res = await fetch(`${API_URL}?${params}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setGifs(data.data || []);
    } catch (err: any) {
      setError(err?.message || String(err));
      setGifs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void search(query);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <header className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
        <h1 className="text-2xl font-bold flex-grow">Easy GIF Search App 🎉</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GIF..."
          className="px-4 py-2 border rounded-lg w-full sm:w-64 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Button
          variant="primary"
          onClick={() => void search(query)}
          className="sm:mt-0 w-full sm:w-auto font-bold"
        >
          Search
        </Button>
      </header>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gifs.map((g) => (
            <div
              key={g.id}
              className="bg-white p-2 rounded shadow cursor-pointer hover:shadow-md transition"
              onClick={() => setSelected(g)}
            >
              <img
                src={g.images.fixed_height.url}
                alt={g.title}
                className="w-full h-40 object-cover rounded"
              />
              <div className="mt-2 text-sm font-bold text-gray-600 truncate">
                {g.title}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal GIF details */}
      <GifModal
        gif={selected}
        onClose={() => setSelected(null)}
        onCopy={async () => {
          try {
            await navigator.clipboard.writeText(selected.images.original.url);
            showModal('Link copied successfully!', 'success');
          } catch {
            showModal('Failed to copy link', 'error');
          }
        }}
        onDownload={async () => {
          try {
            const res = await fetch(selected.images.original.url);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${selected.id}.gif`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            showModal('GIF downloaded!', 'success');
          } catch {
            showModal('Failed to download GIF.', 'error');
          }
        }}
      />

      {/* Global modal */}
      <Modal
        open={!!modalMessage}
        onClose={() => {
          setModalMessage(null);
          setModalType(null);
        }}
      >
        <h3 className="text-lg font-semibold mb-2">
          {modalType === 'success' ? 'Success' : 'Error'}
        </h3>

        <p>{modalMessage}</p>

        <Button
          variant={modalType === 'success' ? 'success' : 'error'}
          fullWidth
          onClick={() => {
            setModalMessage(null);
            setModalType(null);
          }}
          className="mt-4"
        >
          OK
        </Button>
      </Modal>
    </div>
  );
}
