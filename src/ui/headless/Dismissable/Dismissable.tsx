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
import { useDocumentEvent } from './use-document-event';

const DISPLAY_NAME = 'Dismissable';
const POINTER_EVENT = `${DISPLAY_NAME}.PointerEvent`;
const FOCUS_EVENT = `${DISPLAY_NAME}.FocusEvent`;

type DismissableContextValue = {
  onEnabledChange?(enabled: boolean): void;
};

const DismissableContext = createContext<DismissableContextValue>({});

/*---------------------------------------------------------------------------*/

const stack = new Set();
let prevPointerEvents: string;

const DismissableStack = {
  add(node: HTMLElement) {
    stack.add(node);
    if (stack.size === 1) {
      const body = node.ownerDocument.body;
      prevPointerEvents = body.style.pointerEvents;
      body.style.pointerEvents = 'none';
    }
  },
  delete(node: HTMLElement) {
    stack.delete(node);
    if (stack.size === 0) {
      const body = node.ownerDocument.body;
      body.style.pointerEvents = prevPointerEvents;
    }
  },
};

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
    style,
    onFocusCapture,
    onBlurCapture,
    onPointerDownCapture,
    onPointerDownOutside,
    onFocusOutside,
    onEscapeKey,
    onDismiss,
    ...props
  } = inProps;

  const context = useContext(DismissableContext);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const isFocusInsideRef = useRef(false);
  const isPointerDownInsideRef = useRef(false);
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

  useDocumentEvent('pointerdown', (event) => {
    if (!isPointerDownInsideRef.current) {
      const target = event.target as HTMLElement;
      dispatchEvent(POINTER_EVENT, target, (customEvent) => {
        handleOutsideInteraction(customEvent, onPointerDownOutside);
      });
    }

    isPointerDownInsideRef.current = false;
  });

  useDocumentEvent('focusin', (event) => {
    if (!isFocusInsideRef.current) {
      const target = event.target as HTMLElement;
      dispatchEvent(FOCUS_EVENT, target, (customEvent) => {
        handleOutsideInteraction(customEvent, onFocusOutside);
      });
    }
  });

  useDocumentEvent('keydown', handleKeyDown, true);

  useEffect(() => {
    context.onEnabledChange?.(false);
    return () => context.onEnabledChange?.(true);
  }, [context]);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      DismissableStack.add(node);
      return () => DismissableStack.delete(node);
    }
  }, []);

  return (
    <DismissableContext value={contextValue}>
      <Native.div
        ref={mergedRef}
        {...props}
        style={{
          pointerEvents: 'auto',
          ...style,
        }}
        onFocusCapture={(event) => {
          onFocusCapture?.(event);
          isFocusInsideRef.current = true;
        }}
        onBlurCapture={(event) => {
          onBlurCapture?.(event);
          isFocusInsideRef.current = false;
        }}
        onPointerDownCapture={(event) => {
          onPointerDownCapture?.(event);
          isPointerDownInsideRef.current = true;
        }}
      />
    </DismissableContext>
  );
};

Dismissable.displayName = DISPLAY_NAME;
