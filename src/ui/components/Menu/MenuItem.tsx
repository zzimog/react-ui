import { useCallback, type PointerEvent } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers } from '@ui/utils';
import { Menu } from './Menu';
import { MenuContent } from './MenuContent';
import classes from './classes';

const DISPLAY_NAME = 'MenuItem';
const SELECT_EVENT = `${DISPLAY_NAME}.Select`;
const SELECT_EVENT_OPTIONS = { bubbles: false, cancelable: true };

type BaseProps = NativeProps<'button'>;
type MenuItemProps = Omit<BaseProps, 'type'> & {
  onSelect?(event: Event): void;
};

export const MenuItem = (inProps: MenuItemProps) => {
  const {
    ref: refProp,
    disabled,
    className,
    onClick,
    onPointerMove,
    onPointerLeave,
    onSelect,
    ...props
  } = inProps;

  const { onItemAdd, onItemRemove } = Menu.useCollection();
  const context = Menu.useContext(DISPLAY_NAME);
  const contentContext = MenuContent.useContext(DISPLAY_NAME);

  const mergedRef = useMergedRefs(refProp, (node: HTMLElement) => {
    onItemAdd(node, { node, disabled });
    return () => onItemRemove(node);
  });

  const handleSelect = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      if (!event.defaultPrevented && onSelect) {
        const node = event.target as HTMLElement;
        const selectEvent = new CustomEvent(SELECT_EVENT, SELECT_EVENT_OPTIONS);
        node.addEventListener(SELECT_EVENT, onSelect, { once: true });
        node.dispatchEvent(selectEvent);
        if (selectEvent.defaultPrevented) {
          return;
        }
      }

      context.onOpenChange(false);
      contentContext.onItemSelect();
    },
    [disabled, context, contentContext, onSelect]
  );

  return (
    <Native.button
      ref={mergedRef}
      role="menuitem"
      type="button"
      tabIndex={-1}
      aria-disabled={disabled}
      {...props}
      className={cn(classes.item, className)}
      onClick={composeHandlers(onClick, handleSelect)}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        const target = event.target as HTMLElement;
        target.focus({ preventScroll: true });
      })}
      onPointerLeave={composeHandlers(onPointerLeave, () => {
        contentContext.onItemLeave();
      })}
    />
  );
};

MenuItem.displayName = DISPLAY_NAME;
