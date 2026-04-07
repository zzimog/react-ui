import type { Measurable } from './Popper';

type ContentSide = 'top' | 'bottom' | 'left' | 'right';

type ContentAlign = 'start' | 'center' | 'end';

type PlaceContentOptions = {
  anchor: Measurable;
  content: HTMLElement;
  distance?: number;
  padding?: number;
  side?: ContentSide;
  align?: ContentAlign;
  minSize?: number;
  maxSize?: number;
  avoidCollisions?: boolean;
};

const OPPOSITES = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const;

export function placeContent({
  anchor,
  content,
  distance = 8,
  padding = 16,
  side = 'bottom',
  align = 'center',
  //minSize = 0,
  //maxSize,
  avoidCollisions,
}: PlaceContentOptions) {
  const anchorRect = anchor.getBoundingClientRect();
  content.style.setProperty('--anchor-width', `${anchorRect.width}px`);
  content.style.setProperty('--anchor-height', `${anchorRect.height}px`);

  function getRect(side: ContentSide): DOMRect {
    const contentRect = content.getBoundingClientRect();

    const isVertical = ['top', 'bottom'].includes(side);
    const refSide = isVertical ? 'left' : 'top';
    const refSize = isVertical ? 'width' : 'height';

    const main = {
      top: anchorRect.top - contentRect.height - distance,
      bottom: anchorRect.bottom + distance,
      left: anchorRect.left - contentRect.width - distance,
      right: anchorRect.right + distance,
    };

    const start = anchorRect[refSide];
    const sizeDiff = anchorRect[refSize] - contentRect[refSize];
    const cross = {
      start,
      center: start + sizeDiff / 2,
      end: start + sizeDiff,
    };

    const left = isVertical ? cross[align] : main[side];
    const top = isVertical ? main[side] : cross[align];

    return new DOMRect(left, top, contentRect.width, contentRect.height);
  }

  function hasOverflow(rect: DOMRect) {
    return {
      top: rect.top < padding,
      bottom: rect.bottom > window.innerHeight - padding,
      left: rect.left < padding,
      right: rect.right > window.innerWidth - padding,
    }[side];
  }

  let rect = getRect(side);

  if (avoidCollisions && hasOverflow(rect)) {
    const newRect = getRect(OPPOSITES[side]);
    if (!hasOverflow(newRect)) {
      rect = newRect;
    }
  }

  const availableHeight = {
    top: anchorRect.top - distance - padding,
    bottom: window.innerHeight - padding - anchorRect.bottom - distance,
    left: window.innerHeight - padding * 2,
    right: window.innerHeight - padding * 2,
  }[side];

  const availableWidth = {
    top: window.innerWidth - padding * 2,
    bottom: window.innerWidth - padding * 2,
    left: anchorRect.left - distance - padding,
    right: window.innerWidth - padding - anchorRect.right - distance,
  }[side];

  content.style.setProperty('--available-width', `${availableWidth}px`);
  content.style.setProperty('--available-height', `${availableHeight}px`);
  //content.style.transformOrigin = `${origin.x}px ${origin.y}px`;
  content.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
}
