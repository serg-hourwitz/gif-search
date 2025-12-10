import { useCallback, useState } from 'react';
import Modal from './Modal';
import Button from './ui/Button';
import type { GiphyGif } from '../types/giphy';

interface Props {
  gif: GiphyGif | null;
  open: boolean;
  onClose: () => void;
  onNotify: (msg: string, type: 'success' | 'error') => void;
}

export default function GifModal({ gif, open, onClose, onNotify }: Props) {
  const [actionLoading, setActionLoading] = useState(false);

  const onCopy = useCallback(async () => {
    if (!gif) return onNotify('Invalid GIF', 'error');
    try {
      await navigator.clipboard.writeText(gif.images.original.url);
      onNotify('Link copied', 'success');
    } catch {
      onNotify('Copy failed', 'error');
    }
  }, [gif, onNotify]);

  const onDownload = useCallback(async () => {
    if (!gif) return onNotify('Invalid GIF', 'error');
    setActionLoading(true);
    try {
      const res = await fetch(gif.images.original.url);
      if (!res.ok) throw new Error('Network');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${gif.id}.gif`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      onNotify('Downloaded', 'success');
    } catch {
      onNotify('Download failed', 'error');
    } finally {
      setActionLoading(false);
    }
  }, [gif, onNotify]);

  if (!gif) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg font-semibold">{gif.title || 'GIF'}</h3>
        <button className="text-gray-600" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={gif.images.original.url}
          alt={gif.title}
          className="w-full rounded"
        />
        <div className="space-y-3">
          <div>
            <strong>Author:</strong>{' '}
            {gif.username || gif.user?.display_name || 'Unknown'}
          </div>
          <div>
            <strong>Date:</strong> {gif.import_datetime || '—'}
          </div>
          <div>
            <strong>URL:</strong>{' '}
            <a
              href={gif.images.original.url}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 underline"
            >
              Open
            </a>
          </div>

          <div className="pt-4 flex gap-2">
            <Button variant="success" onClick={onCopy} disabled={actionLoading}>
              Copy link
            </Button>
            <Button
              variant="primary"
              onClick={onDownload}
              disabled={actionLoading}
            >
              {actionLoading ? '...' : 'Download'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
