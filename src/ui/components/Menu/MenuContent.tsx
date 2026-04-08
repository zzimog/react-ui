import { useRef, type ComponentProps } from 'react';
import { Dismissable, FocusTrap, Native, Popper } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers, createScopedContext } from '@ui/utils';
import { Menu } from './Menu';
import classes from './classes';

const DISPLAY_NAME = 'MenuContent';
//const SELECT_EVENT = `${DISPLAY_NAME}.ItemSelect`;
//const EVENT_OPTIONS = { bubbles: false, cancelable: true };

const NAV_KEYS = ['Home', 'End', 'ArrowUp', 'ArrowDown'];

type MenuContentContextValue = {
  onItemLeave(): void;
  onItemSelect(): void;
};

const [MenuContentContext, useMenuContentContext] = createScopedContext<
  MenuContentContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type PopperContentProps = ComponentProps<typeof Popper.Content>;
type BaseProps = ComponentProps<typeof Dismissable>;
type MenuProps = BaseProps & {
  distance?: number;
  side?: PopperContentProps['side'];
  align?: PopperContentProps['align'];
  onItemSelect?(event: Event): void;
};

export const MenuContent = (inProps: MenuProps) => {
  const {
    ref: refProp,
    className,
    distance,
    side,
    align: alignProp,
    onContextMenu,
    onPointerLeave,
    onKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onDismiss,
    ...props
  } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const { isContext } = Menu.useRootContext(DISPLAY_NAME);
  const { getItems } = Menu.useCollection();

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const defaultAlign = isContext ? 'start' : 'center';
  const align = alignProp || defaultAlign;

  return (
    <MenuContentContext
      onItemLeave={() => {
        const node = ref.current;
        node?.focus({ preventScroll: true });
      }}
      onItemSelect={() => {
        /**
         * @todo
         */
      }}
    >
      <Popper.Content
        avoidCollisions
        distance={distance}
        side={side}
        align={align}
        present={context.open}
      >
        <Dismissable
          asChild
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={composeHandlers(
            onFocusOutside,
            (event) => event.preventDefault(),
            false
          )}
          onDismiss={() => {
            onDismiss?.();
            context.onOpenChange(false);
          }}
        >
          <FocusTrap
            asChild
            trapped={context.open}
            onMount={(event) => {
              const node = ref.current;
              node?.focus({ preventScroll: true });
              event.preventDefault();
            }}
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
                  const nodes = items.map((i) => i.node);

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
          </FocusTrap>
        </Dismissable>
      </Popper.Content>
    </MenuContentContext>
  );
};

MenuContent.displayName = DISPLAY_NAME;
MenuContent.useContext = useMenuContentContext;
