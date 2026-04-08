import { useState, type PropsWithChildren } from 'react';
import { createScopedContext } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuSub';

type MenuSubContextValue = object;

const [MenuSubContext, useMenuSubContext] = createScopedContext<
  MenuSubContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuSubProps = PropsWithChildren;

export const MenuSub = (inProps: MenuSubProps) => {
  //const context = Menu.useContext(DISPLAY_NAME);

  const [open, setOpen] = useState(false);

  return (
    <Menu open={open} onOpenChange={setOpen}>
      <MenuSubContext>{inProps.children}</MenuSubContext>
    </Menu>
  );
};

MenuSub.displayName = DISPLAY_NAME;
MenuSub.useContext = useMenuSubContext;
