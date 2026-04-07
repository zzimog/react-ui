import { useContext, type ReactNode } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { Spinner } from '@ui/components';
import { cn } from '@ui/utils';
import { ButtonGroup } from './ButtonGroup';
import { ButtonGroupContext } from './context';
import classes from './classes';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'danger'
  | 'outlined'
  | 'ghost';

type ButtonProps = NativeProps<'button'> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
};

export const Button = (inProps: ButtonProps) => {
  const {
    icon,
    size = 'md',
    variant = 'default',
    loading = false,
    type = 'button',
    disabled,
    className,
    children,
    onClick,
    ...props
  } = inProps;

  const context = useContext(ButtonGroupContext);

  const mergedSize = size || context?.size;
  const mergedVariant = variant || context?.variant;
  const mergedDisabled = disabled || context?.disabled || false;

  const hasIcon = !!icon;
  const isJoined = context?.joined;
  const joinDirection = context?.column ? 'col' : 'row';

  return (
    <Native.button
      type={type}
      disabled={mergedDisabled}
      className={cn(
        classes.button({
          size: mergedSize,
          variant: mergedVariant,
          loading,
          joined: isJoined ? joinDirection : null,
        }),
        className
      )}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
      {...props}
    >
      {hasIcon && (loading ? <Spinner /> : icon)}
      {children}
    </Native.button>
  );
};

Button.displayName = 'Button';
Button.Group = ButtonGroup;
