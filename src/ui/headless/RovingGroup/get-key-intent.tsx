import type { ComponentProps } from 'react';
import type { RovingGroup } from './RovingGroup';

type RovingGroupProps = ComponentProps<typeof RovingGroup>;
type Orientation = RovingGroupProps['orientation'];
type Direction = RovingGroupProps['dir'];

type Intent = 'first' | 'prev' | 'next' | 'last';
type KeyMap = Record<string, Intent>;

const EDGES_KEYS: KeyMap = {
  Home: 'first',
  PageUp: 'first',
  End: 'last',
  PageDown: 'last',
};

const VERTICAL_KEYS: KeyMap = {
  ArrowUp: 'prev',
  ArrowDown: 'next',
};

const HORIZONTAL_KEYS: KeyMap = {
  ArrowLeft: 'prev',
  ArrowRight: 'next',
};

function getDirectedKey(key: string, dir: Direction) {
  if (dir !== 'rtl') return key;
  return key === 'ArrowRight'
    ? 'ArrowLeft'
    : key === 'ArrowLeft'
      ? 'ArrowRight'
      : key;
}

export function getKeyIntent(
  key: string,
  orientation: Orientation,
  direction: Direction
) {
  const directedKey = getDirectedKey(key, direction);
  const isHorizontal = orientation !== 'vertical';
  const map: KeyMap = {
    ...EDGES_KEYS,
    ...(isHorizontal ? HORIZONTAL_KEYS : VERTICAL_KEYS),
  };

  return [Object.keys(map), map[directedKey]] as const;
}
