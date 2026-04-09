import { Native, RovingGroup, type NativeProps } from '@ui/headless';
import { composeHandlers } from '@ui/utils';

const DISPLAY_NAME = 'RovingGroupContent';

type RovingGroupContentProps = NativeProps<'div'>;

export const RovingGroupContent = (inProps: RovingGroupContentProps) => {
  const { onKeyDown, ...props } = inProps;

  const { getItems } = RovingGroup.useCollection();
  const context = RovingGroup.useContext(DISPLAY_NAME);

  return (
    <Native.div
      aria-activedescendant={context.activeId || undefined}
      {...props}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        const items = getItems();
        console.log(items);

        event.preventDefault();
      })}
    />
  );
};

RovingGroupContent.displayName = DISPLAY_NAME;
