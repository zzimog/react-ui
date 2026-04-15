import { RovingGroup, type NativeProps } from '@ui/headless';
import { Toggle, ToggleGroup } from '@ui/components';
import { cn } from '@ui/utils';

const DISPLAY_NAME = 'ToggleGroupItem';

type BaseProps = NativeProps<'button'>;
type ToggleGroupItemProps = BaseProps & {
  value: string;
};

export const ToggleGroupItem = (inProps: ToggleGroupItemProps) => {
  const { value, className, ...props } = inProps;

  const context = ToggleGroup.useContext(DISPLAY_NAME);
  const isChecked = context.value.includes(value);

  return (
    <RovingGroup.Item asChild>
      <Toggle
        pressed={isChecked}
        aria-checked={isChecked}
        aria-pressed={undefined}
        {...props}
        className={cn(
          'not-first:rounded-l-none',
          'not-last:rounded-r-none',
          className
        )}
        onPressedChange={() => {
          context.onValueChange(value);
        }}
      />
    </RovingGroup.Item>
  );
};

ToggleGroupItem.displayName = DISPLAY_NAME;
