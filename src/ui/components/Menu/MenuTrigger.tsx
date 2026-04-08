import { Native, Popper, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuTrigger';

type BaseProps = NativeProps<'button'>;
type MenuTriggerProps = BaseProps;

export const MenuTrigger = (inProps: MenuTriggerProps) => {
  const { ref: refProp, onClick, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const isOpen = context.open;

  const mergedRef = useMergedRefs(refProp, context.onTriggerChange);

  return (
    <Popper.Anchor asChild>
      <Native.button
        ref={mergedRef}
        id={context.triggerId}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={context.contentId}
        {...props}
        onClick={composeHandlers(onClick, (event) => {
          if (!props.disabled) {
            context.onOpenChange(!isOpen);
            event.preventDefault();
          }
        })}
      />
    </Popper.Anchor>
  );
};

MenuTrigger.displayName = DISPLAY_NAME;
