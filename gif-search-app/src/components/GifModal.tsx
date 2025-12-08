import Modal from './Modal';
import Button from './Button';

interface GifModalProps {
  gif: any | null;
  onClose: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

export default function GifModal({
  gif,
  onClose,
  onCopy,
  onDownload,
}: GifModalProps) {
  if (!gif) return null;

  return (
    <Modal open={!!gif} onClose={onClose}>
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg font-semibold">{gif.title}</h3>
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
            <Button variant="success" onClick={onCopy}>
              Copy link
            </Button>

            <Button variant="primary" onClick={onDownload}>
              Load
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
