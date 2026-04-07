import { useId } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { cn, createCollection, createScopedContext } from '@ui/utils';
import { RadioGroupItem } from './RadioGroupItem';
import classes from './classes';

const DISPLAY_NAME = 'RadioGroup';

type RadioGroupContextValue = {
  baseId: string;
  value: string;
  name?: string;
  disabled?: boolean;
  onValueChange(value: string): void;
};

const [RadioGroupContext, useRadioGroupContext] = createScopedContext<
  RadioGroupContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type RadioGroupCollectionData = { node: HTMLElement };

const [RadioGroupCollection, useRadioGroupCollection] =
  createCollection<RadioGroupCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type RadioGroupProps = NativeProps<'div'> & {
  defaultValue?: string;
  value?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?(value: string): void;
};

export const RadioGroup = (inProps: RadioGroupProps) => {
  const {
    name,
    defaultValue,
    value: valueProp,
    required,
    disabled,
    className,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue ?? '',
    prop: valueProp,
    onChange: onValueChange,
  });

  const baseId = useId();
  const hasValue = value !== '';

  return (
    <RadioGroupContext
      baseId={baseId}
      name={name}
      value={value}
      disabled={disabled}
      onValueChange={setValue}
    >
      <RadioGroupCollection>
        <Native.div
          role="radiogroup"
          aria-required={required ? true : undefined}
          aria-disabled={disabled ? true : undefined}
          tabIndex={hasValue ? -1 : 0}
          {...props}
          className={cn(classes.root, className)}
        />
      </RadioGroupCollection>
    </RadioGroupContext>
  );
};

RadioGroup.displayName = DISPLAY_NAME;
RadioGroup.useContext = useRadioGroupContext;
RadioGroup.useCollection = useRadioGroupCollection;
RadioGroup.Item = RadioGroupItem;
