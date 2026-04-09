import { useState, type AriaAttributes, type ComponentProps } from 'react';
import { createCollection, createScopedContext } from '@ui/utils';
import { RovingGroupContent } from './RovingGroupContent';
import { RovingGroupItem } from './RovingGroupItem';

const DISPLAY_NAME = 'RovingGroup';

type RovingGroupCollectionData = {
  disabled: boolean;
};

const [RovingGroupCollection, useRovingGroupCollection] =
  createCollection<RovingGroupCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type RovingGroupContextValue = {
  activeId: string;
  onActiveIdChange(id: string): void;
};

const [RovingGroupContext, useRovingGroupContext] = createScopedContext<
  RovingGroupContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type BaseProps = ComponentProps<typeof RovingGroupContent>;
type RovingGroupProps = BaseProps & {
  orientation?: AriaAttributes['aria-orientation'];
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
};

export const RovingGroup = (inProps: RovingGroupProps) => {
  const { orientation, dir, loop, ...props } = inProps;

  const [activeId, setActiveId] = useState('');

  console.debug(orientation, dir, loop);

  return (
    <RovingGroupCollection>
      <RovingGroupContext activeId={activeId} onActiveIdChange={setActiveId}>
        <RovingGroupContent {...props} />
      </RovingGroupContext>
    </RovingGroupCollection>
  );
};

RovingGroup.displayName = DISPLAY_NAME;
RovingGroup.useCollection = useRovingGroupCollection;
RovingGroup.useContext = useRovingGroupContext;
RovingGroup.Content = RovingGroupContent;
RovingGroup.Item = RovingGroupItem;
