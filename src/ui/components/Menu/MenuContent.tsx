import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { Dismissable, Native, Popper, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers } from '@ui/utils';
import { Menu } from './Menu';
import classes from './classes';

const NAV_KEYS = ['Home', 'End', 'ArrowUp', 'ArrowDown'];

const DISPLAY_NAME = 'MenuContent';

type PopperContentProps = ComponentPropsWithRef<typeof Popper.Content>;
type BaseProps = NativeProps<'div'>;
type MenuProps = BaseProps & {
  distance?: number;
  side?: PopperContentProps['side'];
  align?: PopperContentProps['align'];
};

export const MenuContent = (inProps: MenuProps) => {
  const {
    ref: refProp,
    className,
    distance,
    side,
    align,
    onContextMenu,
    onPointerLeave,
    onKeyDown,
    ...props
  } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const { getItems } = Menu.useCollection();

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  useEffect(() => {
    if (!context.open) return;
    const node = ref.current;
    node?.focus();
  }, [context.open]);

  return (
    <Popper.Content
      distance={distance}
      side={side}
      align={align}
      present={context.open}
    >
      <Dismissable
        asChild
        onFocusOutside={(event) => event.preventDefault()}
        onDismiss={() => context.onOpenChange(false)}
      >
        <Native.div
          ref={mergedRef}
          role="menu"
          tabIndex={0}
          {...props}
          className={cn(classes.root, className)}
          onContextMenu={composeHandlers(onContextMenu, (event) => {
            event.preventDefault();
          })}
          onPointerLeave={composeHandlers(onPointerLeave, (event) => {
            event.currentTarget.focus();
          })}
          onKeyDown={composeHandlers(onKeyDown, (event) => {
            if (event.key === 'Tab') {
              event.preventDefault();
            }

            if (NAV_KEYS.includes(event.key)) {
              const items = getItems();
              const nodes = items
                .filter((item) => !item.disabled)
                .map((i) => i.node);

              const active = document.activeElement as HTMLElement | null;
              const index = nodes.findIndex((n) => n === active);
              const nextIndexValues: Record<string, number> = {
                Home: 0,
                End: nodes.length - 1,
                ArrowUp: Math.max(0, index - 1),
                ArrowDown: Math.min(nodes.length - 1, index + 1),
              };

              const nextIndex = nextIndexValues[event.key] ?? 0;
              const nextNode = nodes[nextIndex];
              const [first, ...others] = items.map((i) => i.node);
              const [last] = others.slice(-1);

              const content = event.currentTarget;
              if (nextNode === first) {
                content.scrollTo({ top: 0 });
              } else if (nextNode === last) {
                content.scrollTo({ top: content.scrollHeight });
              }

              nextNode?.focus();
              event.preventDefault();
            }
          })}
        />
      </Dismissable>
    </Popper.Content>
  );
};

MenuContent.displayName = DISPLAY_NAME;
