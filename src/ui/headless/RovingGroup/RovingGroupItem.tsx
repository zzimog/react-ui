import { Native, RovingGroup, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';

const DISPLAY_NAME = 'RovingGroupItem';

type RovingGroupItemProps = NativeProps<'span'> & {
  disabled?: boolean;
};

export const RovingGroupItem = (inProps: RovingGroupItemProps) => {
  const { ref: refProp, disabled = false, ...props } = inProps;

  const collection = RovingGroup.useCollection();

  const mergedRef = useMergedRefs(refProp, (node: HTMLElement) => {
    collection.onItemAdd(node, { disabled });
    return () => collection.onItemRemove(node);
  });

  return <Native.span ref={mergedRef} tabIndex={0} {...props} />;
};

RovingGroupItem.displayName = DISPLAY_NAME;
