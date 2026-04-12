import type { ComponentProps } from 'react';
import { RovingGroup } from '@ui/headless';
import { cn } from '@ui/utils';
import { composeHandlers } from '../../utils/compose-handlers';
import classes from './classes';

const DISPLAY_NAME = 'MenubarItem';

type RovingGroupItemProps = ComponentProps<typeof RovingGroup.Item>;
type MenubarItemProps = RovingGroupItemProps;

export const MenubarItem = (inProps: MenubarItemProps) => {
  const { className, onPointerMove, ...props } = inProps;

  return (
    <RovingGroup.Item
      {...props}
      className={cn(classes.item, className)}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        const target = event.currentTarget;
        target.focus();
      })}
    />
  );
};

MenubarItem.displayName = DISPLAY_NAME;
