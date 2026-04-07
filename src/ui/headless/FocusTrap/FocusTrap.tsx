import { useEffect, useRef } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useCallbackRef, useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { FocusStack, useFocusStackAPI } from './focus-stack';
import { getFocusableEdges } from './get-focusable-edges';
import { useFocusGuards } from './use-focus-guards';

const DISPLAY_NAME = 'FocusTrap';
const MOUNT_EVENT = `${DISPLAY_NAME}.MOUNT`;
const UNMOUNT_EVENT = `${DISPLAY_NAME}.UNMOUNT`;
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

type BaseProps = NativeProps<'div'>;
interface FocusTrapProps extends BaseProps {
  loop?: boolean;
  trapped?: boolean;
  onMount?(event: Event): void;
  onUnmount?(event: Event): void;
}

function focus(element: HTMLElement | null) {
  if (element && element.focus) {
    element.focus({ preventScroll: true });
  }
}

export const FocusTrap = (inProps: FocusTrapProps) => {
  const {
    ref: refProp,
    loop,
    trapped = true,
    onKeyDown,
    onMount: onMountProp,
    onUnmount: onUnmountProp,
    ...props
  } = inProps;

  const stackAPI = useFocusStackAPI();

  const lastFocusedRef = useRef<HTMLElement>(null);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const onMount = useCallbackRef(onMountProp);
  const onUnmount = useCallbackRef(onUnmountProp);

  useEffect(() => {
    const node = ref.current;
    if (node && trapped) {
      const handleFocusIn = (event: FocusEvent) => {
        if (stackAPI.enabled) {
          const target = event.target as HTMLElement;
          if (node.contains(target)) {
            lastFocusedRef.current = target;
          } else {
            focus(lastFocusedRef.current);
          }
        }
      };

      const handleFocusOut = (event: FocusEvent) => {
        if (stackAPI.enabled) {
          const relatedTarget = event.relatedTarget as HTMLElement;
          if (relatedTarget && !node.contains(relatedTarget)) {
            focus(lastFocusedRef.current);
          }
        }
      };

      const observer = new MutationObserver((mutations: MutationRecord[]) => {
        if (document.activeElement === document.body) {
          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0) {
              focus(node);
            }
          }
        }
      });

      observer.observe(node, { childList: true, subtree: true });
      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('focusout', handleFocusOut);
      return () => {
        observer.disconnect();
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
      };
    }
  }, [stackAPI, trapped]);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      FocusStack.add(stackAPI);

      const previousActive = document.activeElement as HTMLElement | null;
      if (!node.contains(previousActive)) {
        const mountEvent = new CustomEvent(MOUNT_EVENT, EVENT_OPTIONS);
        node.addEventListener(MOUNT_EVENT, onMount, { once: true });
        node.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          const [first] = getFocusableEdges(node);
          first?.focus();

          if (document.activeElement === previousActive) {
            node.focus({ preventScroll: true });
          }
        }
      }

      return () => {
        FocusStack.remove(stackAPI);

        const unmountEvent = new CustomEvent(UNMOUNT_EVENT, EVENT_OPTIONS);
        node.addEventListener(UNMOUNT_EVENT, onUnmount, { once: true });
        node.dispatchEvent(unmountEvent);
        if (!unmountEvent.defaultPrevented) {
          const focusTarget = previousActive ?? document.body;
          focusTarget?.focus();
        }
      };
    }
  }, [stackAPI, onMount, onUnmount]);

  useFocusGuards();

  return (
    <Native.div
      ref={mergedRef}
      tabIndex={-1}
      {...props}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (loop) {
          const node = event.currentTarget;
          const isTab =
            event.key === 'Tab' &&
            !event.altKey &&
            !event.ctrlKey &&
            !event.metaKey;

          if (isTab) {
            const currentElement = document.activeElement as HTMLElement;
            const [first, last] = getFocusableEdges(node);

            if (first && last) {
              if (event.shiftKey && currentElement === first) {
                event.preventDefault();
                focus(last);
              } else if (!event.shiftKey && currentElement === last) {
                event.preventDefault();
                focus(first);
              }
            }
          }
        }
      })}
    />
  );
};

FocusTrap.displayName = DISPLAY_NAME;
