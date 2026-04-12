import { Native, RovingGroup, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import { MenubarContent } from './MenubarContent';
import { MenubarItem } from './MenubarItem';
import { MenubarMenu } from './MenubarMenu';
import { MenubarMenuItem } from './MenubarMenuItem';
import { MenubarSubContent } from './MenubarSubContent';
import classes from './classes';

const DISPLAY_NAME = 'Menubar';

type BaseProps = NativeProps<'div'>;
type MenubarProps = BaseProps;

type MenubarContextValue = object;

const [MenubarContext, useMenubarContext] = createScopedContext<
  MenubarContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

export const Menubar = (inProps: MenubarProps) => {
  const { className, ...props } = inProps;

  return (
    <MenubarContext>
      <RovingGroup orientation="horizontal" asChild>
        <Native.div
          role="menubar"
          aria-orientation="horizontal"
          {...props}
          className={cn(classes.root, className)}
        />
      </RovingGroup>
    </MenubarContext>
  );
};

Menubar.displayName = DISPLAY_NAME;
Menubar.useContext = useMenubarContext;
Menubar.Item = MenubarItem;
Menubar.SubContent = MenubarSubContent;
Menubar.Menu = MenubarMenu;
Menubar.MenuItem = MenubarMenuItem;
Menubar.Content = MenubarContent;
