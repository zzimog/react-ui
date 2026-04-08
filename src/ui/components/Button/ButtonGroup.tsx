import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import type { ButtonSize, ButtonVariant } from './Button';
import { ButtonGroupContext } from './context';
import classes from './classes';

type ButtonGroupProps = NativeProps<'div'> & {
  column?: boolean;
  joined?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export const ButtonGroup = (inProps: ButtonGroupProps) => {
  const {
    column = false,
    joined = false,
    size,
    variant,
    color,
    disabled,
    className,
    children,
    ...props
  } = inProps;

  const context = {
    column,
    joined,
    size,
    variant,
    color,
    disabled,
  };

  const classNames = classes.group({ column, joined });

  return (
    <Native.div role="group" className={cn(classNames, className)} {...props}>
      <ButtonGroupContext value={context}>{children}</ButtonGroupContext>
    </Native.div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';
