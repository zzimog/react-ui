import { useEffect, useRef, type ComponentProps } from 'react';
import { Popper } from '@ui/headless';
import { composeHandlers } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuContextArea';

type BaseProps = ComponentProps<typeof Popper.Anchor>;
type MenuContextAreaProps = BaseProps;

export const MenuContextArea = (inProps: MenuContextAreaProps) => {
  const { onContextMenu, ...props } = inProps;

  const virtualRef = useRef(DOMRect.fromRect({ x: 0, y: 0 }));

  const context = Menu.useContext(DISPLAY_NAME);
  const { onIsContextChange } = Menu.useRootContext(DISPLAY_NAME);

  useEffect(() => {
    onIsContextChange(true);
    return () => onIsContextChange(false);
  }, [onIsContextChange]);

  useEffect(() => {
    const close = () => context.onOpenChange(false);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', close);
    return () => {
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', close);
    };
  });

  return (
    <Popper.Anchor
      virtualRect={virtualRef}
      {...props}
      // eslint-disable-next-line react-hooks/refs
      onContextMenu={composeHandlers(onContextMenu, (event) => {
        const { clientX, clientY } = event;
        const rect = DOMRect.fromRect({ x: clientX, y: clientY });
        virtualRef.current = rect;
        context.onOpenChange(true);
        event.preventDefault();
      })}
    />
  );
};

MenuContextArea.displayName = DISPLAY_NAME;
