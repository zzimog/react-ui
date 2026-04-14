import { useId } from 'react';
import { Native, RovingGroup, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { composeHandlers } from '../../utils/compose-handlers';
import { Menu } from '../Menu/Menu';
import { Menubar } from './Menubar';
import { MenubarContent } from './MenubarContent';
import classes from './classes';

const DISPLAY_NAME = 'MenubarItem';

type BaseProps = NativeProps<'button'>;
type MenubarItemProps = BaseProps;

export const MenubarItem = (inProps: MenubarItemProps) => {
  const {
    ref: refProp,
    className,
    onFocus,
    onPointerMove,
    onKeyDown,
    ...props
  } = inProps;

  const { getItems, ...collection } = Menubar.useCollection();
  const context = Menubar.useContext(DISPLAY_NAME);
  const contentContext = MenubarContent.useContext();
  const isRootItem = !contentContext;

  const autoId = useId();
  const stopId = props.id || autoId;

  const mergedRef = useMergedRefs(refProp, (node: HTMLElement) => {
    if (isRootItem) {
      collection.onItemAdd(node, { node, stopId });
      return () => collection.onItemRemove(node);
    }
  });

  const Item = (
    <Native.button
      ref={mergedRef}
      {...props}
      className={cn(classes.item, className)}
      onFocus={composeHandlers(onFocus, () => {
        if (isRootItem) {
          context.onStopIdChange(stopId);
        }
      })}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        const target = event.currentTarget;
        target.focus();
      })}
    />
  );

  return isRootItem ? (
    <RovingGroup.Item asChild>{Item}</RovingGroup.Item>
  ) : (
    <Menu.Item
      asChild
      children={Item}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        const KEYS = ['ArrowLeft', 'ArrowRight'];
        if (KEYS.includes(event.key)) {
          const items = getItems();
          const nodes = items.map((i) => i.node);
          const currentIndex = items.findIndex(
            (i) => i.stopId === context.stopId
          );

          const clamp = (n: number, min: number, max: number) =>
            Math.max(min, Math.min(n, max));

          const dir = event.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = clamp(currentIndex + dir, 0, nodes.length - 1);
          const nextNode = nodes[nextIndex];
          nextNode?.focus();

          console.log(items);
          console.log(nextNode);

          event.preventDefault();
        }
      })}
    />
  );
};

MenubarItem.displayName = DISPLAY_NAME;
