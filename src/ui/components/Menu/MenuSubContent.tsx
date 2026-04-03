import type { ComponentPropsWithRef } from 'react';
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
        onFocusOutside={(event) => {
          if (event.target === trigger) {
            event.preventDefault();
          }
        }}
        onKeyDown={composeHandlers(onKeyDown, (event) => {
          if (event.key === 'ArrowLeft') {
            context.onOpenChange(false);
          }
        })}
      />
    </Menu.Collection>
  );
};

MenuSubContent.displayName = DISPLAY_NAME;
