import { Fragment, type ComponentProps, type ElementType } from 'react';

type UseWrapperOptions<E extends ElementType> = {
  when?: boolean;
  component: E;
  props: ComponentProps<E>;
};

export function useWrapper<E extends ElementType>(
  options: UseWrapperOptions<E>
) {
  const { when, component, props } = options;
  const WrapperElement = when ? component : Fragment;
  const wrapperProps = when ? props : undefined;

  return [WrapperElement, wrapperProps] as const;
}
