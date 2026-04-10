type Direction = 'ltr' | 'rtl';
type Intent = 'first' | 'prev' | 'next' | 'last';
type KeyMap = Record<string, Intent>;

export function getKeyIntent(key: string, dir: Direction) {
  const map: KeyMap = {
    Home: 'first',
    End: 'last',
    ArrowUp: 'prev',
    ArrowDown: 'next',
    ArrowRight: dir === 'ltr' ? 'next' : 'prev',
    ArrowLeft: dir === 'ltr' ? 'prev' : 'next',
  };

  return map[key];
}
