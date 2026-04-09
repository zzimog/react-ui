import { useEffect } from 'react';
import { useCallbackRef } from '@ui/hooks';

type EventType = keyof WindowEventMap;
type Event<E extends EventType> = WindowEventMap[E];

export function useDocumentEvent<E extends EventType>(
  event: E,
  callback: (event: Event<E>) => void,
  capture = false
) {
  const onEvent = useCallbackRef(callback);

  useEffect(() => {
    window.addEventListener(event, onEvent, { capture });
    return () => window.removeEventListener(event, onEvent, { capture });
  }, [event, onEvent, capture]);
}
