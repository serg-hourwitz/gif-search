import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onAnimationEnd'
  > {
  variant?: 'primary' | 'success' | 'error' | 'secondary';
  fullWidth?: boolean;
  motionProps?: MotionProps;
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  motionProps,
  ...props
}: ButtonProps) {
  const base =
    'px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<string, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...motionProps}
      {...(props as any)}
    />
  );
}
