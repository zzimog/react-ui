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

type MenuRootContextValue = {
  isContext: boolean;
  onIsContextChange(isContext: boolean): void;
};

const [MenuRootContext, useMenuRootContext] = createScopedContext<
  MenuRootContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuContextValue = {
  triggerId: string;
  contentId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
};

const [MenuContext, useMenuContext] = createScopedContext<
  MenuContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuCollectionData = {
  node: HTMLElement;
  disabled?: boolean;
};

const [MenuCollection, useMenuCollection] =
  createCollection<MenuCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type MenuProps = PropsWithChildren<{
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}>;

export const Menu = (inProps: MenuProps) => {
  const { defaultOpen, open: openProp, onOpenChange, children } = inProps;

  const [isContext, setIsContext] = useState(false);

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen ?? false,
    prop: openProp,
    onChange: onOpenChange,
  });

  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  return (
    <Popper>
      <MenuRootContext isContext={isContext} onIsContextChange={setIsContext}>
        <MenuContext
          triggerId={triggerId}
          contentId={contentId}
          open={open}
          onOpenChange={setOpen}
        >
          <MenuCollection>{children}</MenuCollection>
        </MenuContext>
      </MenuRootContext>
    </Popper>
  );
};

Menu.displayName = DISPLAY_NAME;
Menu.useContext = useMenuContext;
Menu.useRootContext = useMenuRootContext;
Menu.useCollection = useMenuCollection;
Menu.Provider = MenuContext;
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
