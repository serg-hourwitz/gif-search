export default function EmptyState({
  message = 'No results',
}: {
  message?: string;
}) {
  return (
    <div className="p-6 bg-yellow-50 border border-yellow-100 rounded text-center">
      <div className="text-yellow-800 font-semibold">{message}</div>
    </div>
  );
}
