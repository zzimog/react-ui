import { createContext, useContext, type ComponentProps } from 'react';
import { Menu } from '@ui/components';
import { Menubar } from './Menubar';

const DISPLAY_NAME = 'MenubarContent';

type MenubarContentContextValue = boolean;

const MenubarContentContext = createContext<MenubarContentContextValue>(false);
const useMenubarContentContext = () => useContext(MenubarContentContext);

/*---------------------------------------------------------------------------*/

type MenubarContentProps = ComponentProps<typeof Menu.Content>;

export const MenubarContent = (inProps: MenubarContentProps) => {
  const { ...props } = inProps;

  Menubar.useContext(DISPLAY_NAME);

  return (
    <MenubarContentContext value={true}>
      <Menu.Content
        align="start"
        {...props}
        onUnmountFocus={(event) => event.preventDefault()}
        onFocusOutside={(event) => event.preventDefault()}
      />
    </MenubarContentContext>
  );
};

MenubarContent.displayName = DISPLAY_NAME;
MenubarContent.useContext = useMenubarContentContext;
