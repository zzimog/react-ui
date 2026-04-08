import type { ComponentProps } from 'react';
import { createScopedContext } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuSub';

type MenuSubContextValue = object;

const [MenuSubContext, useMenuSubContext] = createScopedContext<
  MenuSubContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuSubProps = ComponentProps<typeof Menu>;

export const MenuSub = (inProps: MenuSubProps) => {
  const { children, ...props } = inProps;

  //const context = Menu.useContext(DISPLAY_NAME);

  return (
    <Menu {...props}>
      <MenuSubContext>{children}</MenuSubContext>
    </Menu>
  );
};

MenuSub.displayName = DISPLAY_NAME;
MenuSub.useContext = useMenuSubContext;
