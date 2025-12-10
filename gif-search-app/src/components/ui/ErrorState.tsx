import Button from './Button';

export default function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="p-6 bg-red-50 border border-red-100 rounded text-center">
      <div className="text-red-700 mb-3 font-semibold">Error</div>
      <div className="text-sm text-red-600 mb-4">{message}</div>
      {onRetry && (
        <Button variant="error" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
