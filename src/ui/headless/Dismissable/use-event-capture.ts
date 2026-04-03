import { useEffect } from 'react';
import { useCallbackRef } from '@ui/hooks';

export function useEventCapture<K extends keyof WindowEventMap>(
  event: K,
  callback: (event: WindowEventMap[K]) => void
) {
  const onEventHandle = useCallbackRef(callback);

  useEffect(() => {
    const handler = (event: WindowEventMap[K]) => onEventHandle(event);

    window.addEventListener(event, handler, { capture: true });
    return () => window.removeEventListener(event, handler, { capture: true });
  }, [event, onEventHandle]);
}
