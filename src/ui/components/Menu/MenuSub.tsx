import { useCallback, useId, useState, type PropsWithChildren } from 'react';
import { Popper } from '@ui/headless';
import { createScopedContext } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuSub';

type MenuSubContextValue = {
  content: HTMLElement | null;
  onOpenToggle(): void;
  onContentChange(element: HTMLElement | null): void;
};

const [MenuSubContext, useMenuSubContext] = createScopedContext<
  MenuSubContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuSubProps = PropsWithChildren;

export const MenuSub = (inProps: MenuSubProps) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<HTMLElement | null>(null);

  const handleToggle = useCallback(() => {
    setOpen((open) => !open);
  }, [setOpen]);

  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  return (
    <Popper>
      <Menu.Provider
        triggerId={triggerId}
        contentId={contentId}
        open={open}
        onOpenChange={setOpen}
      >
        <MenuSubContext
          content={content}
          onOpenToggle={handleToggle}
          onContentChange={setContent}
        >
          {inProps.children}
        </MenuSubContext>
      </Menu.Provider>
    </Popper>
  );
};

MenuSub.displayName = DISPLAY_NAME;
MenuSub.useContext = useMenuSubContext;
