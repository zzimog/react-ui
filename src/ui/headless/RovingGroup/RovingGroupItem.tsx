import { Native, RovingGroup, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { getKeyIntent } from './get-key-intent';

const DISPLAY_NAME = 'RovingGroupItem';

type RovingGroupItemProps = NativeProps<'span'> & {
  disabled?: boolean;
};

export const RovingGroupItem = (inProps: RovingGroupItemProps) => {
  const { ref: refProp, disabled = false, onKeyDown, ...props } = inProps;

  const { getItems, ...collection } = RovingGroup.useCollection();
  const { direction, loop } = RovingGroup.useContext(DISPLAY_NAME);

  const mergedRef = useMergedRefs(refProp, (node: HTMLElement) => {
    collection.onItemAdd(node, { node, disabled });
    return () => collection.onItemRemove(node);
  });

  return (
    <Native.span
      ref={mergedRef}
      tabIndex={0}
      {...props}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        const node = event.currentTarget as HTMLElement;
        if (disabled) return;
        if (event.target !== node) return;

        const items = getItems();
        const nodes = items.map((i) => i.node);
        const [first, ...others] = nodes;
        const [last] = others.reverse();

        const INTENT = getKeyIntent(event.key, direction);
        let target: HTMLElement | undefined;

        if (INTENT === 'first') target = first;
        else if (INTENT === 'last') target = last;
        else if (INTENT === 'prev') {
          if (loop && node === first) target = last;
        } else if (INTENT === 'next') {
          if (loop && node === last) target = first;
        } else {
          /**
           const currentIndex = nodes.indexOf(node);
           * @todo
           */
        }

        setTimeout(() => target?.focus());
      })}
    />
  );
};

RovingGroupItem.displayName = DISPLAY_NAME;
