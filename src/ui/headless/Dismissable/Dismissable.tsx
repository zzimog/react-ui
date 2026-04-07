import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useConstant, useMergedRefs } from '@ui/hooks';
import { dispatchEvent } from './dispatch-event';
import { useEventCapture } from './use-event-capture';

const DISPLAY_NAME = 'Dismissable';
const POINTER_EVENT = `${DISPLAY_NAME}.PointerEvent`;
const FOCUS_EVENT = `${DISPLAY_NAME}.FocusEvent`;

type DismissableContextValue = {
  onEnabledChange?(enabled: boolean): void;
};

const DismissableContext = createContext<DismissableContextValue>({});

/*---------------------------------------------------------------------------*/

type BaseProps = NativeProps<'div'>;
type DismissableProps = BaseProps & {
  onPointerDownOutside?(event: Event): void;
  onFocusOutside?(event: Event): void;
  onEscapeKey?(event: Event): void;
  onDismiss?(): void;
};

export const Dismissable = (inProps: DismissableProps) => {
  const {
    ref: refProp,
    onPointerDownOutside,
    onFocusOutside,
    onEscapeKey,
    onDismiss,
    ...props
  } = inProps;

  const context = useContext(DismissableContext);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const isFirstLayerRef = useRef(true);
  const contextValue = useConstant({
    onEnabledChange(enabled: boolean) {
      isFirstLayerRef.current = enabled;
    },
  });

  const handleDismiss = useCallback(
    (event: Event) => {
      if (!event.defaultPrevented && onDismiss) {
        onDismiss();
        event.preventDefault();
      }
    },
    [onDismiss]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscapeKey?.(event);
        handleDismiss(event);
      }
    },
    [handleDismiss, onEscapeKey]
  );

  const handleOutsideInteraction = useCallback(
    <T extends Event>(event: T, callback?: (event: T) => void) => {
      const isFirstLayer = isFirstLayerRef.current;
      const root = ref.current;
      const target = event.target as HTMLElement | null;
      if (isFirstLayer && !root?.contains(target)) {
        callback?.(event);
        handleDismiss(event);
      }
    },
    [handleDismiss]
  );

  useEventCapture('pointerdown', (event) => {
    dispatchEvent(POINTER_EVENT, event, (event) => {
      handleOutsideInteraction(event, onPointerDownOutside);
    });
  });

  useEventCapture('focusin', (event) => {
    dispatchEvent(FOCUS_EVENT, event, (event) => {
      handleOutsideInteraction(event, onFocusOutside);
    });
  });

  useEventCapture('keydown', handleKeyDown);

  useEffect(() => {
    context.onEnabledChange?.(false);
    return () => context.onEnabledChange?.(true);
  }, [context]);

  return (
    <DismissableContext value={contextValue}>
      <Native.div ref={mergedRef} {...props} />
    </DismissableContext>
  );
};

Dismissable.displayName = DISPLAY_NAME;
