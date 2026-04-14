import { ChevronDown } from 'lucide-react';
import { Native, RovingGroup, type NativeProps } from '@ui/headless';
import { Menu } from '@ui/components';
import { cn, composeHandlers } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'MenubarTrigger';

type MenubarTriggerProps = NativeProps<'button'>;

export const MenubarTrigger = (inProps: MenubarTriggerProps) => {
  const { className, children, onPointerMove, ...props } = inProps;

  return (
    <Menu.Trigger asChild>
      <RovingGroup.Item asChild>
        <Native.button
          {...props}
          className={cn(classes.item, className)}
          onPointerMove={composeHandlers(onPointerMove, (event) => {
            const target = event.currentTarget;
            target.focus();
          })}
        >
          {children}
          <ChevronDown />
        </Native.button>
      </RovingGroup.Item>
    </Menu.Trigger>
  );
};

MenubarTrigger.displayName = DISPLAY_NAME;
