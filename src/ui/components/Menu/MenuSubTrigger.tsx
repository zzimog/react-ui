import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '../../utils/compose-handlers';
import { Menu } from './Menu';
import { MenuSub } from './MenuSub';

const DISPLAY_NAME = 'MenuSubTrigger';

type BaseProps = ComponentPropsWithRef<typeof Menu.Item>;
type MenuSubTriggerProps = BaseProps;

export const MenuSubTrigger = (inProps: MenuSubTriggerProps) => {
  const { ref: refProp, children, onKeyDown, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const { content } = MenuSub.useContext(DISPLAY_NAME);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      function handleLeave(event: PointerEvent) {
        const target = event.relatedTarget as HTMLElement;
        const isInSubTree = content?.contains(target);
        if (!isInSubTree) {
          context.onOpenChange(false);
        }
      }

      function handleEnter() {
        context.onOpenChange(true);
      }

      node.addEventListener('pointerenter', handleEnter);
      node.addEventListener('pointerleave', handleLeave);
      return () => {
        node.removeEventListener('pointerenter', handleEnter);
        node.removeEventListener('pointerleave', handleLeave);
      };
    }
  }, [context, content]);

  return (
    <Menu.Trigger asChild>
      <Menu.Item
        ref={mergedRef}
        {...props}
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
