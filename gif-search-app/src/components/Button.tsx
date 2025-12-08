interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'error' | 'secondary';
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed';

  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105';
      break;
    case 'success':
      variantStyles = 'bg-green-600 text-white hover:bg-green-700 hover:scale-105';
      break;
    case 'error':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 hover:scale-105';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    />
  );
}
