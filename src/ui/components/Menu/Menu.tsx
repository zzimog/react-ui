import { useId, type PropsWithChildren } from 'react';
import { Popper } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createCollection, createScopedContext } from '@ui/utils';
import { MenuCheckboxItem } from './MenuCheckboxItem';
import { MenuContent } from './MenuContent';
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
      <MenuContext
        triggerId={triggerId}
        contentId={contentId}
        open={open}
        onOpenChange={setOpen}
      >
        <MenuCollection>{children}</MenuCollection>
      </MenuContext>
    </Popper>
  );
};

Menu.displayName = DISPLAY_NAME;
Menu.useContext = useMenuContext;
Menu.useCollection = useMenuCollection;
Menu.Provider = MenuContext;
Menu.Collection = MenuCollection;
Menu.Trigger = MenuTrigger;
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
