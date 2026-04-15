import type { NativeProps } from '@ui/headless';
import { Button } from '@ui/components';
import { useControllableState } from '@ui/hooks';
import { cn, composeHandlers } from '@ui/utils';

const DISPLAY_NAME = 'Toggle';

type BaseProps = NativeProps<'button'>;
type ToggleProps = BaseProps & {
  defaultPressed?: boolean;
  pressed?: boolean;
  onPressedChange?(pressed: boolean): void;
};

export const Toggle = (inProps: ToggleProps) => {
  const {
    defaultPressed,
    pressed: pressedProp,
    disabled,
    className,
    onPressedChange,
    onClick,
    ...props
  } = inProps;

  const [pressed, setPressed] = useControllableState({
    defaultProp: defaultPressed,
    prop: pressedProp,
    onChange: onPressedChange,
  });

  return (
    <Button
      variant={pressed ? 'primary' : 'default'}
      aria-pressed={pressed}
      aria-disabled={disabled ? 'true' : undefined}
      {...props}
      className={cn([], className)}
      onClick={composeHandlers(onClick, () => {
        if (!disabled) setPressed(!pressed);
      })}
    />
  );
};

Toggle.displayName = DISPLAY_NAME;
