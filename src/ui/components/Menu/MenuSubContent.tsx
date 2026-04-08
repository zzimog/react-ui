import { useCallback, useRef, type ComponentPropsWithRef } from 'react';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { Menu } from './Menu';
import { MenuContent } from './MenuContent';
import { MenuSub } from './MenuSub';

const DISPLAY_NAME = 'MenuSubContent';

type BaseProps = ComponentPropsWithRef<typeof MenuContent>;
type MenuSubContentProps = BaseProps;

export const MenuSubContent = (inProps: MenuSubContentProps) => {
  const { ref: refProp, onKeyDown, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const { trigger, onContentChange } = MenuSub.useContext(DISPLAY_NAME);

  const mergedRef = useMergedRefs(refProp, onContentChange);
  const timeoutRef = useRef<number>(0);

  const handleOutside = useCallback(
    (event: Event) => {
      if (event.target === trigger) {
        event.preventDefault();
      }
    },
    [trigger]
  );

  return (
    <Menu.Collection>
      <MenuContent
        ref={mergedRef}
        side="right"
        align="start"
        distance={0}
        id={context.contentId}
        aria-labelledby={context.triggerId}
        {...props}
        onFocusOutside={handleOutside}
        onPointerDownOutside={handleOutside}
        onKeyDown={composeHandlers(onKeyDown, (event) => {
          if (event.key === 'ArrowLeft') {
            context.onOpenChange(false);
            trigger?.focus();
            event.preventDefault();
          }
        })}
        onPointerEnter={(event) => {
          clearTimeout(timeoutRef.current);
          context.onOpenChange(true);
          event.preventDefault();
        }}
        onPointerLeave={(event) => {
          if (event.relatedTarget !== trigger) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              context.onOpenChange(false);
              event.preventDefault();
            }, 500);
          }
        }}
      />
    </Menu.Collection>
  );
};

MenuSubContent.displayName = DISPLAY_NAME;
