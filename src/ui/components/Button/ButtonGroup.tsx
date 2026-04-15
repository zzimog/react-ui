import { createContext, useContext } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, type VariantProps } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'ButtonGroup';

type ButtonClasses = typeof classes.button;
type ButtonVariantProps = VariantProps<ButtonClasses>;

type ButtonGroupContextType = {
  column?: boolean;
  joined?: boolean;
  size?: ButtonVariantProps['size'];
  variant?: ButtonVariantProps['variant'];
  disabled?: boolean;
};

const ButtonGroupContext = createContext<ButtonGroupContextType | undefined>(
  undefined
);

/*---------------------------------------------------------------------------*/

type ButtonGroupProps = NativeProps<'div'> & {
  column?: boolean;
  joined?: boolean;
  size?: ButtonVariantProps['size'];
  variant?: ButtonVariantProps['variant'];
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
    <ButtonGroupContext value={context}>
      <Native.div
        role="group"
        {...props}
        className={cn(classNames, className)}
      />
    </ButtonGroupContext>
  );
};

ButtonGroup.displayName = DISPLAY_NAME;
ButtonGroup.useContext = () => useContext(ButtonGroupContext);
