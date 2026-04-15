import type { ReactNode } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { Spinner } from '@ui/components';
import { cn, type VariantProps } from '@ui/utils';
import { composeHandlers } from '../../utils/compose-handlers';
import { ButtonGroup } from './ButtonGroup';
import classes from './classes';

type ButtonClasses = typeof classes.button;
type ButtonVariantProps = VariantProps<ButtonClasses>;

type ButtonProps = NativeProps<'button'> & {
  size?: ButtonVariantProps['size'];
  variant?: ButtonVariantProps['variant'];
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
    onPointerDown,
    ...props
  } = inProps;

  const context = ButtonGroup.useContext();

  const mergedSize = size || context?.size;
  const mergedVariant = variant || context?.variant;
  const mergedDisabled = disabled || context?.disabled || false;

  const hasIcon = !!icon;
  const isJoined = context?.joined;
  const joinDirection = context?.column ? 'col' : 'row';

  return (
    <Native.button
      type={type}
      // Purposely use `aria-disabled` instead of `disabled` prop to
      // maintain the button focusable for accessibility
      aria-disabled={mergedDisabled ? 'true' : undefined}
      {...props}
      className={cn(
        classes.button({
          size: mergedSize,
          variant: mergedVariant,
          loading,
          joined: isJoined ? joinDirection : null,
        }),
        className
      )}
      onClick={composeHandlers(onClick, (event) => {
        const target = event.currentTarget;
        target.focus({ preventScroll: true });
      })}
      onPointerDown={composeHandlers(onPointerDown, (event) => {
        if (disabled || loading) {
          event.preventDefault();
        }
      })}
    >
      {hasIcon && (loading ? <Spinner /> : icon)}
      {children}
    </Native.button>
  );
};

Button.displayName = 'Button';
Button.Group = ButtonGroup;
