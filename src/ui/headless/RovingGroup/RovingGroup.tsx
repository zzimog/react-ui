import { useCallback, useState, type AriaAttributes } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import {
  composeHandlers,
  createCollection,
  createScopedContext,
} from '@ui/utils';
import { RovingGroupItem } from './RovingGroupItem';

type Orientation = AriaAttributes['aria-orientation'];
type Direction = 'ltr' | 'rtl';

const DISPLAY_NAME = 'RovingGroup';

type RovingGroupCollectionData = {
  node: HTMLElement;
  active: boolean;
  stopId: string;
  focusable: boolean;
};

const [RovingGroupCollection, useRovingGroupCollection] =
  createCollection<RovingGroupCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type RovingGroupContextValue = {
  orientation: Orientation;
  direction: Direction;
  loop: boolean;
  activeId: string;
  onActiveIdChange(id: string): void;
  onItemAdd(): void;
  onItemRemove(): void;
};

const [RovingGroupContext, useRovingGroupContext] = createScopedContext<
  RovingGroupContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type BaseProps = NativeProps<'div'>;
type RovingGroupProps = BaseProps & {
  orientation?: Orientation;
  dir?: Direction;
  loop?: boolean;
};

const RovingGroupContainer = (inProps: RovingGroupProps) => {
  const {
    orientation = 'vertical',
    dir,
    loop = false,
    onFocus,
    ...props
  } = inProps;

  const { getItems } = RovingGroup.useCollection();

  const [itemCount, setItemCount] = useState(0);
  const [activeId, setActiveId] = useState('');

  const onItemCountAdd = useCallback(
    (amount: 1 | -1) => () => {
      setItemCount((c) => c + amount);
    },
    []
  );

  return (
    <RovingGroupContext
      orientation={orientation}
      direction={dir || 'ltr'}
      loop={loop}
      activeId={activeId}
      onActiveIdChange={setActiveId}
      onItemAdd={onItemCountAdd(1)}
      onItemRemove={onItemCountAdd(-1)}
    >
      <Native.div
        dir={dir}
        tabIndex={itemCount && !activeId ? 0 : -1}
        aria-orientation={orientation}
        {...props}
        onFocus={composeHandlers(onFocus, (event) => {
          const node = event.currentTarget;
          if (!activeId && event.target === node) {
            const allItems = getItems().filter((i) => i.focusable);
            const active = allItems.find((i) => i.active);
            const current = allItems.find((i) => i.stopId === activeId);
            const items = [active, current, ...allItems].filter(Boolean);
            const nodes = items.map((i) => i!.node);

            for (const target of nodes) {
              target?.focus();
              if (document.activeElement === target) return;
            }
          }
        })}
      />
    </RovingGroupContext>
  );
};

export const RovingGroup = (props: RovingGroupProps) => (
  <RovingGroupCollection>
    <RovingGroupContainer {...props} />
  </RovingGroupCollection>
);

RovingGroupContainer.displayName = `${DISPLAY_NAME}Container`;
RovingGroup.displayName = DISPLAY_NAME;
RovingGroup.useCollection = useRovingGroupCollection;
RovingGroup.useContext = useRovingGroupContext;
RovingGroup.Item = RovingGroupItem;
