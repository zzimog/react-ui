import { useEffect, useLayoutEffect, useRef } from 'react';
import { Presence, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'Collapsible';

type CollapsibleProps = NativeProps<'div'> & {
  open?: boolean;
};

export const Collapsible = (inProps: CollapsibleProps) => {
  const { ref: refProp, open, className, ...props } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const preventAnimationRef = useRef(open);
  const prevStylesRef = useRef<Record<string, string>>(null);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      preventAnimationRef.current = false;
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      prevStylesRef.current = prevStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName,
      };

      node.style.transitionDuration = '0s';
      node.style.animationName = 'none';

      const { width, height } = node.getBoundingClientRect();
      node.style.setProperty('--width', `${width}px`);
      node.style.setProperty('--height', `${height}px`);

      if (!preventAnimationRef.current) {
        const { transitionDuration, animationName } = prevStylesRef.current;
        node.style.transitionDuration = transitionDuration as string;
        node.style.animationName = animationName as string;
      }
    }
  }, [open]);

  return (
    <Presence
      ref={mergedRefs}
      present={open}
      data-open={open}
      {...props}
      className={cn(classes.root, className)}
    />
  );
};

Collapsible.displayName = DISPLAY_NAME;
