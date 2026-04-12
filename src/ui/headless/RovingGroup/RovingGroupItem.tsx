import { useEffect, useId } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { getKeyIntent } from './get-key-intent';
import { RovingGroup } from './RovingGroup';

const DISPLAY_NAME = 'RovingGroupItem';

type RovingGroupItemProps = NativeProps<'span'> & {
  active?: boolean;
  focusable?: boolean;
};

export const RovingGroupItem = (inProps: RovingGroupItemProps) => {
  const {
    ref: refProp,
    active = false,
    focusable = true,
    onFocus,
    onMouseDown,
    onKeyDown,
    ...props
  } = inProps;

  const { getItems, ...collection } = RovingGroup.useCollection();
  const context = RovingGroup.useContext(DISPLAY_NAME);
  const { orientation, direction, loop, activeId, onActiveIdChange } = context;

  const autoId = useId();
  const stopId = props.id || autoId;

  const mergedRef = useMergedRefs(refProp, (node: HTMLElement) => {
    collection.onItemAdd(node, { node, active, stopId, focusable });
    return () => collection.onItemRemove(node);
  });

  useEffect(() => {
    if (focusable) {
      context.onItemAdd();
      return () => context.onItemRemove();
    }
  }, [focusable, context]);

  return (
    <Native.span
      ref={mergedRef}
      tabIndex={activeId === stopId ? 0 : -1}
      {...props}
      onFocus={composeHandlers(onFocus, () => onActiveIdChange(stopId))}
      onMouseDown={composeHandlers(onMouseDown, (event) => {
        if (focusable) onActiveIdChange(stopId);
        else event.preventDefault();
      })}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        const node = event.currentTarget as HTMLElement;
        if (event.target !== node) return;

        const items = getItems().filter((i) => i.focusable);
        const nodes = items.map((i) => i.node);
        const [first, ...others] = nodes;
        const [last] = others.reverse();

        const [KEYS, INTENT] = getKeyIntent(event.key, orientation, direction);
        if (KEYS.includes(event.key)) {
          let target: HTMLElement | undefined;

          if (INTENT === 'first') target = first;
          else if (INTENT === 'last') target = last;
          else if (INTENT === 'prev') {
            if (loop && node === first) target = last;
            else {
              const currentIndex = nodes.indexOf(node);
              const nextIndex = currentIndex - 1;
              if (nextIndex > -1) {
                target = nodes[nextIndex];
              }
            }
          } else if (INTENT === 'next') {
            if (loop && node === last) target = first;
            else {
              const currentIndex = nodes.indexOf(node);
              const nextIndex = currentIndex + 1;
              if (nextIndex < nodes.length) {
                target = nodes[nextIndex];
              }
            }
          }

          setTimeout(() => target?.focus());
          event.preventDefault();
        }
      })}
    />
  );
};

RovingGroupItem.displayName = DISPLAY_NAME;
