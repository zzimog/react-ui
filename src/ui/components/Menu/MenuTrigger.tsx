import { useRef } from 'react';
import { Native, Popper, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '../../utils/compose-handlers';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuTrigger';

type BaseProps = NativeProps<'button'>;
type MenuTriggerProps = BaseProps;

export const MenuTrigger = (inProps: MenuTriggerProps) => {
  const { ref: refProp, onClick, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const isOpen = context.open;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  return (
    <Popper.Anchor asChild>
      <Native.button
        ref={mergedRef}
        id={context.triggerId}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={context.contentId}
        {...props}
        onClick={composeHandlers(onClick, () => {
          if (!props.disabled) {
            context.onOpenChange(!isOpen);
          }
        })}
      />
    </Popper.Anchor>
  );
};

MenuTrigger.displayName = DISPLAY_NAME;
