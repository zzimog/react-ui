import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'MenubarSeparator';

type MenubarSeparatorProps = NativeProps<'div'>;

export const MenubarSeparator = (inProps: MenubarSeparatorProps) => {
  const { className, ...props } = inProps;

  return (
    <Native.div
      role="separator"
      aria-orientation="vertical"
      {...props}
      className={cn(classes.separator, className)}
    />
  );
};

MenubarSeparator.displayName = DISPLAY_NAME;
