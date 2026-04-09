import { useId, useState, type PropsWithChildren } from 'react';
import { Popper } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createCollection, createScopedContext } from '@ui/utils';
import { MenuCheckboxItem } from './MenuCheckboxItem';
import { MenuContent } from './MenuContent';
import { MenuContextArea } from './MenuContextArea';
import { MenuIcon } from './MenuIcon';
import { MenuItem } from './MenuItem';
import { MenuLabel } from './MenuLabel';
import { MenuRadioGroup } from './MenuRadioGroup';
import { MenuRadioItem } from './MenuRadioItem';
import { MenuSeparator } from './MenuSeparator';
import { MenuSub } from './MenuSub';
import { MenuSubContent } from './MenuSubContent';
import { MenuSubTrigger } from './MenuSubTrigger';
import { MenuTrigger } from './MenuTrigger';

const DISPLAY_NAME = 'Menu';

type MenuCollectionData = {
  node: HTMLElement;
  disabled?: boolean;
};

const [MenuCollection, useMenuCollection] =
  createCollection<MenuCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type MenuContextValue = {
  triggerId: string;
  contentId: string;
  open: boolean;
  trigger: HTMLElement | null;
  content: HTMLElement | null;
  onOpenChange(open: boolean): void;
  onTriggerChange(trigger: HTMLElement | null): void;
  onContentChange(element: HTMLElement | null): void;
};

const [MenuContext, useMenuContext] = createScopedContext<
  MenuContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuRootContextValue = {
  isContext: boolean;
  onIsContextChange(isContext: boolean): void;
  onClose(): void;
};

const [MenuRootContext, useMenuRootContext] = createScopedContext<
  MenuRootContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuProps = PropsWithChildren<{
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}>;

type BaseMenuProps = Omit<MenuProps, 'defaultOpen'>;
type MenuProviderProps = BaseMenuProps & {
  open: boolean;
  onOpenChange(open: boolean): void;
};

const MenuProvider = (inProps: MenuProviderProps) => {
  const { open, onOpenChange, children } = inProps;

  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [content, setContent] = useState<HTMLElement | null>(null);

  return (
    <Popper>
      <MenuContext
        triggerId={triggerId}
        contentId={contentId}
        open={open}
        trigger={trigger}
        content={content}
        onOpenChange={onOpenChange}
        onTriggerChange={setTrigger}
        onContentChange={setContent}
      >
        {children}
      </MenuContext>
    </Popper>
  );
};

MenuProvider.displayName = `${DISPLAY_NAME}Provider`;

export const Menu = (inProps: MenuProps) => {
  const {
    defaultOpen,
    open: openProp,
    onOpenChange,
    children,
    ...props
  } = inProps;

  const [isContext, setIsContext] = useState(false);

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen ?? false,
    prop: openProp,
    onChange: onOpenChange,
  });

  return (
    <MenuCollection>
      <MenuProvider open={open} onOpenChange={setOpen} {...props}>
        <MenuRootContext
          isContext={isContext}
          onIsContextChange={setIsContext}
          onClose={() => setOpen(false)}
        >
          {children}
        </MenuRootContext>
      </MenuProvider>
    </MenuCollection>
  );
};

Menu.displayName = DISPLAY_NAME;
Menu.useContext = useMenuContext;
Menu.useRootContext = useMenuRootContext;
Menu.useCollection = useMenuCollection;
Menu.Provider = MenuProvider;
Menu.Collection = MenuCollection;
Menu.Trigger = MenuTrigger;
Menu.ContextArea = MenuContextArea;
Menu.Content = MenuContent;
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Separator = MenuSeparator;
Menu.Icon = MenuIcon;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
Menu.CheckboxItem = MenuCheckboxItem;
Menu.Sub = MenuSub;
Menu.SubTrigger = MenuSubTrigger;
Menu.SubContent = MenuSubContent;
