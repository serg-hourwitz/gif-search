import type { GiphyGif } from '../types/giphy';

export default function GifCard({
  gif,
  onOpen,
}: {
  gif: GiphyGif;
  onOpen: (g: GiphyGif) => void;
}) {
  const thumb =
    gif.images.fixed_height?.url ??
    gif.images.fixed_width?.url ??
    gif.images.original.url;
  return (
    <div
      className="bg-white p-2 rounded shadow cursor-pointer hover:shadow-md transition"
      onClick={() => onOpen(gif)}
    >
      <img
        src={thumb}
        alt={gif.title}
        className="w-full h-40 object-cover rounded"
      />
      <div className="mt-2 text-sm font-medium text-gray-700 truncate">
        {gif.title || 'Untitled'}
      </div>
    </div>
  );
}
