import {
  useCallback,
  useMemo,
  type ComponentProps,
  type PropsWithChildren,
} from 'react';
import { RovingGroup } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { cn, createScopedContext } from '@ui/utils';
import { ToggleGroupItem } from './ToggleGroupItem';

const DISPLAY_NAME = 'ToggleGroup';

type ToggleGroupContextValue = {
  roving: boolean;
  multiple: boolean;
  value: string[];
  onValueChange(value: string): void;
};

const [ToggleGroupContext, useToggleGroupContext] = createScopedContext<
  ToggleGroupContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type ToggleGroupSingleProps = PropsWithChildren<{
  multiple?: false;
  defaultValue?: string;
  value?: string;
  onValueChange?(value: string): void;
}>;

const ToggleGroupSingle = (inProps: ToggleGroupSingleProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    onValueChange,
    children,
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <ToggleGroupContext
      value={useMemo(() => (value ? [value] : []), [value])}
      onValueChange={setValue}
    >
      {children}
    </ToggleGroupContext>
  );
};

ToggleGroupSingle.displayName = `${DISPLAY_NAME}Single`;

/*---------------------------------------------------------------------------*/

type ToggleGroupMultipleProps = PropsWithChildren<{
  multiple: true;
  defaultValue?: string[];
  value?: string[];
  onValueChange?(value: string[]): void;
}>;

const ToggleGroupMultiple = (inProps: ToggleGroupMultipleProps) => {
  const {
    defaultValue = [],
    value: valueProp,
    onValueChange,
    children,
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  const handleValueChange = useCallback(
    (value: string) => {
      setValue((prev) => {
        return prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value];
      });
    },
    [setValue]
  );

  return (
    <ToggleGroupContext value={value} onValueChange={handleValueChange}>
      {children}
    </ToggleGroupContext>
  );
};

ToggleGroupMultiple.displayName = `${DISPLAY_NAME}Multiple`;

/*---------------------------------------------------------------------------*/

type BaseProps = ComponentProps<typeof RovingGroup>;
type ToggleGroupProps = BaseProps &
  (ToggleGroupSingleProps | ToggleGroupMultipleProps);

export const ToggleGroup = (inProps: ToggleGroupProps) => {
  const {
    multiple = false,
    defaultValue = '',
    value,
    className,
    children,
    onValueChange,
    ...props
  } = inProps;

  const contextProps = { defaultValue, value, children, onValueChange };

  return (
    <RovingGroup
      role="group"
      orientation="horizontal"
      {...props}
      className={cn('flex', 'gap-px', className)}
    >
      {multiple ? (
        <ToggleGroupMultiple {...(contextProps as ToggleGroupMultipleProps)} />
      ) : (
        <ToggleGroupSingle {...(contextProps as ToggleGroupSingleProps)} />
      )}
    </RovingGroup>
  );
};

ToggleGroup.displayName = DISPLAY_NAME;
ToggleGroup.useContext = useToggleGroupContext;
ToggleGroup.Item = ToggleGroupItem;
