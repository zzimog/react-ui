import type { RefObject } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { Popper } from './Popper';

const DISPLAY_NAME = 'PopperAnchor';

type BaseProps = NativeProps<'div'>;
type PopperAnchorProps = BaseProps & {
  virtualRect?: RefObject<DOMRect>;
};

function getVirtualAnchor(rect?: DOMRect) {
  return rect ? { getBoundingClientRect: () => rect } : undefined;
}

export const PopperAnchor = (inProps: PopperAnchorProps) => {
  const { ref: refProp, virtualRect, ...props } = inProps;

  const { onAnchorChange } = Popper.useContext(DISPLAY_NAME);

  const mergedRef = useMergedRefs(refProp, (node) => {
    const virtualAnchor = getVirtualAnchor(virtualRect?.current);
    onAnchorChange(virtualAnchor || node);
  });

  return <Native.div ref={mergedRef} {...props} />;
};

PopperAnchor.displayName = DISPLAY_NAME;
