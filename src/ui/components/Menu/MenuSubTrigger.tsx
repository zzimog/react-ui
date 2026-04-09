import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { Menu } from './Menu';
import { MenuSub } from './MenuSub';

const DISPLAY_NAME = 'MenuSubTrigger';

type BaseProps = ComponentPropsWithRef<typeof Menu.Item>;
type MenuSubTriggerProps = BaseProps;

export const MenuSubTrigger = (inProps: MenuSubTriggerProps) => {
  const {
    ref: refProp,
    children,
    onPointerMove,
    onKeyDown,
    ...props
  } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  MenuSub.useContext(DISPLAY_NAME);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref, context.onTriggerChange);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      let timeoutId: number;

      function handleLeave(event: PointerEvent) {
        const target = event.relatedTarget as HTMLElement;
        const isInSubTree = context.content?.contains(target);
        if (!isInSubTree) {
          clearTimeout(timeoutId);
          context.onOpenChange(false);
        }
      }

      function handleEnter() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          context.onOpenChange(true);
        }, 300);
      }

      node.addEventListener('pointerenter', handleEnter);
      node.addEventListener('pointerleave', handleLeave);
      return () => {
        clearTimeout(timeoutId);
        node.removeEventListener('pointerenter', handleEnter);
        node.removeEventListener('pointerleave', handleLeave);
      };
    }
  }, [context]);

  return (
    <Menu.Trigger asChild>
      <Menu.Item
        ref={mergedRef}
        {...props}
        onPointerMove={composeHandlers(onPointerMove, (event) => {
          if (context.open) {
            event.preventDefault();
          }
        })}
        onKeyDown={composeHandlers(onKeyDown, (event) => {
          if (event.key === 'ArrowRight') {
            context.onOpenChange(true);
            event.preventDefault();
          }
        })}
      >
        {children}
        <ChevronRight />
      </Menu.Item>
    </Menu.Trigger>
  );
};

MenuSubTrigger.displayName = DISPLAY_NAME;
