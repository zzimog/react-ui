import type { ComponentProps } from 'react';
import { Menu } from '@ui/components';

const DISPLAY_NAME = 'MenubarMenu';

type MenubarMenuProps = ComponentProps<typeof Menu>;

export const MenubarMenu = (inProps: MenubarMenuProps) => {
  const { ...props } = inProps;

  return <Menu {...props} />;
};

MenubarMenu.displayName = DISPLAY_NAME;
