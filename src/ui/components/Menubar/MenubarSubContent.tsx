import type { ComponentProps } from 'react';
import { Menu } from '@ui/components';
import { cn } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'MenubarSubContent';

type RovingGroupItemProps = ComponentProps<typeof Menu.SubContent>;
type MenubarSubContentProps = RovingGroupItemProps;

export const MenubarSubContent = (inProps: MenubarSubContentProps) => {
  const { className, ...props } = inProps;

  return <Menu.SubContent {...props} className={cn(classes.item, className)} />;
};

MenubarSubContent.displayName = DISPLAY_NAME;
