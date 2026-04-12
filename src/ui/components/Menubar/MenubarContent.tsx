import { createContext, type ComponentProps } from 'react';
import { Menu } from '@ui/components';

const DISPLAY_NAME = 'MenubarContent';

type MenubarContentContextValue = Partial<object>;

const MenubarContentContext = createContext<MenubarContentContextValue>({});

/*---------------------------------------------------------------------------*/

type MenubarContentProps = ComponentProps<typeof Menu.Content>;

export const MenubarContent = (inProps: MenubarContentProps) => {
  const { ...props } = inProps;

  return (
    <MenubarContentContext value={{}}>
      <Menu.Content
        align="start"
        {...props}
        onUnmountFocus={(event) => event.preventDefault()}
      />
    </MenubarContentContext>
  );
};

MenubarContent.displayName = DISPLAY_NAME;
