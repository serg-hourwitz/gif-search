export default function Loading({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600 mr-3" />
      <div className="text-sm text-gray-600">{text}</div>
    </div>
  );
}
