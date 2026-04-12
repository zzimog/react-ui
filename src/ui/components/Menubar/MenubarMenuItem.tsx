import type { ComponentProps } from 'react';
import { Menu } from '@ui/components';

const DISPLAY_NAME = 'MenubarMenuItem';

type MenubarMenuItemProps = ComponentProps<typeof Menu.Item>;

export const MenubarMenuItem = (inProps: MenubarMenuItemProps) => {
  const { ...props } = inProps;

  return <Menu.Item {...props} />;
};

MenubarMenuItem.displayName = DISPLAY_NAME;
