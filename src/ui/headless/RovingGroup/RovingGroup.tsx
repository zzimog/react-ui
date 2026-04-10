import { useState, type AriaAttributes } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { createCollection, createScopedContext } from '@ui/utils';
import { RovingGroupItem } from './RovingGroupItem';

type Orientation = AriaAttributes['aria-orientation'];
type Direction = 'ltr' | 'rtl';

const DISPLAY_NAME = 'RovingGroup';

type RovingGroupCollectionData = {
  node: HTMLElement;
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

export const RovingGroup = (inProps: RovingGroupProps) => {
  const {
    orientation = 'vertical',
    dir = 'ltr',
    loop = false,
    ...props
  } = inProps;

  const [activeId, setActiveId] = useState('');

  return (
    <RovingGroupCollection>
      <RovingGroupContext
        orientation={orientation}
        direction={dir}
        loop={loop}
        activeId={activeId}
        onActiveIdChange={setActiveId}
      >
        <Native.div dir={dir} {...props} />
      </RovingGroupContext>
    </RovingGroupCollection>
  );
};

RovingGroup.displayName = DISPLAY_NAME;
RovingGroup.useCollection = useRovingGroupCollection;
RovingGroup.useContext = useRovingGroupContext;
RovingGroup.Item = RovingGroupItem;
