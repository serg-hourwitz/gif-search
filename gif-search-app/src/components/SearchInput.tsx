import { useRef } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search GIF...',
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative w-full sm:w-64">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-2 border rounded-lg w-full font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
      />
      {value && (
        <button
          aria-label="clear"
          onClick={() => {
            onClear?.();
            inputRef.current?.focus();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      )}
    </div>
  );
}
