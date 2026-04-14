import { useCallback, type ComponentProps } from 'react';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuSub';

type MenuSubContextValue = {
  onClose(): void;
};

const [MenuSubContext, useMenuSubContext] = createScopedContext<
  MenuSubContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuSubProps = ComponentProps<typeof Menu>;

export const MenuSub = (inProps: MenuSubProps) => {
  const { defaultOpen, open: openProp, onOpenChange, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen ?? false,
    prop: openProp,
    onChange: onOpenChange,
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MenuSubContext onClose={handleClose}>
      <Menu.Provider open={open} onOpenChange={setOpen} {...props} />
    </MenuSubContext>
  );
};

MenuSub.displayName = DISPLAY_NAME;
MenuSub.useContext = useMenuSubContext;
