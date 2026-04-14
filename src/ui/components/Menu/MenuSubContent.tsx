import type { ComponentProps } from 'react';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { Menu } from './Menu';
import { MenuContent } from './MenuContent';
import { MenuSub } from './MenuSub';

const DISPLAY_NAME = 'MenuSubContent';

type BaseProps = ComponentProps<typeof MenuContent>;
type MenuSubContentProps = BaseProps;

export const MenuSubContent = (inProps: MenuSubContentProps) => {
  const { ref: refProp, onKeyDown, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const rootContext = Menu.useRootContext(DISPLAY_NAME);
  const subContext = MenuSub.useContext(DISPLAY_NAME);

  const mergedRef = useMergedRefs(refProp, context.onContentChange);

  return (
    <Menu.Collection>
      <MenuContent
        ref={mergedRef}
        distance={0}
        side="right"
        align="start"
        trapFocus={false}
        id={context.contentId}
        aria-labelledby={context.triggerId}
        {...props}
        onUnmountFocus={(event) => {
          event.preventDefault();
        }}
        onFocusOutside={(event) => {
          if (event.target !== context.trigger) {
            context.onOpenChange(false);
            subContext.onClose();
          }
        }}
        onPointerDownOutside={(event) => {
          if (event.target !== context.trigger) {
            context.onOpenChange(false);
            rootContext.onClose();
          }
        }}
        onPointerEnter={(event) => {
          context.onOpenChange(true);
          event.preventDefault();
        }}
        onKeyDown={composeHandlers(onKeyDown, (event) => {
          if (event.key === 'ArrowLeft') {
            context.onOpenChange(false);
            context.trigger?.focus();
            event.preventDefault();
          }
        })}
      />
    </Menu.Collection>
  );
};

MenuSubContent.displayName = DISPLAY_NAME;
