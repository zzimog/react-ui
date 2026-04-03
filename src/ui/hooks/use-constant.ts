import { useRef } from 'react';

export function useConstant<T>(initialValue: T): T {
  const ref = useRef<T | undefined>(undefined);

  if (ref.current === undefined) {
    const isFunc = typeof initialValue === 'function';
    ref.current = isFunc ? initialValue() : initialValue;
  }

  // eslint-disable-next-line react-hooks/refs
  return ref.current as T;
}
