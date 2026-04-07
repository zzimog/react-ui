import { useCallback } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers } from '@ui/utils';
import { Menu } from './Menu';
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
    onSelect,
    ...props
  } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const { onItemAdd, onItemRemove } = Menu.useCollection();

  const mergedRef = useMergedRefs(refProp, (node: HTMLElement) => {
    onItemAdd(node, { node, disabled });
    return () => onItemRemove(node);
  });

  return (
    <Native.button
      ref={mergedRef}
      role="menuitem"
      type="button"
      tabIndex={-1}
      aria-disabled={disabled}
      {...props}
      className={cn(classes.item, className)}
      onClick={composeHandlers(
        onClick,
        useCallback(
          (originalEvent) => {
            if (disabled) {
              return;
            }

            if (onSelect) {
              const event = new CustomEvent(SELECT_EVENT, SELECT_EVENT_OPTIONS);
              const node = originalEvent.target as HTMLElement;
              node.addEventListener(SELECT_EVENT, onSelect, { once: true });
              node.dispatchEvent(event);
              if (event.defaultPrevented) {
                return;
              }
            }

            context.onOpenChange(false);
          },
          [disabled, context, onSelect]
        )
      )}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        const target = event.target as HTMLElement;
        target.focus({ preventScroll: true });
      })}
    />
  );
};

MenuItem.displayName = DISPLAY_NAME;
