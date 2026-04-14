import { useState } from 'react';
import { Native, RovingGroup, type NativeProps } from '@ui/headless';
import { cn, createCollection, createScopedContext } from '@ui/utils';
import { MenubarContent } from './MenubarContent';
import { MenubarItem } from './MenubarItem';
import { MenubarMenu } from './MenubarMenu';
import { MenubarSeparator } from './MenubarSeparator';
import { MenubarSubContent } from './MenubarSubContent';
import { MenubarTrigger } from './MenubarTrigger';
import classes from './classes';

const DISPLAY_NAME = 'Menubar';

type MenubarCollectionData = {
  node: HTMLElement;
  stopId: string;
};

const [MenubarCollection, useMenubarCollection] =
  createCollection<MenubarCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type MenubarContextValue = {
  stopId: string;
  onStopIdChange(stopId: string): void;
};

const [MenubarContext, useMenubarContext] = createScopedContext<
  MenubarContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type BaseProps = NativeProps<'div'>;
type MenubarProps = BaseProps;

export const Menubar = (inProps: MenubarProps) => {
  const { className, ...props } = inProps;

  const [stopId, setStopId] = useState('');

  return (
    <MenubarCollection>
      <MenubarContext stopId={stopId} onStopIdChange={setStopId}>
        <RovingGroup orientation="horizontal" asChild>
          <Native.div
            role="menubar"
            aria-orientation="horizontal"
            {...props}
            className={cn(classes.root, className)}
          />
        </RovingGroup>
      </MenubarContext>
    </MenubarCollection>
  );
};

Menubar.displayName = DISPLAY_NAME;
Menubar.useCollection = useMenubarCollection;
Menubar.useContext = useMenubarContext;
Menubar.Separator = MenubarSeparator;
Menubar.Item = MenubarItem;
Menubar.SubContent = MenubarSubContent;
Menubar.Menu = MenubarMenu;
Menubar.Trigger = MenubarTrigger;
Menubar.Content = MenubarContent;
