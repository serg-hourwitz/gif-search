import { useRef, useEffect } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  ms = 300
) {
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (...args: Parameters<T>) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => fn(...args), ms);
  };
}
