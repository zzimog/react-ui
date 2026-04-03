import type { ComponentPropsWithRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@ui/components';
import { useTheme } from '@ui/hooks';

type ThemeSwitcherProps = Omit<
  ComponentPropsWithRef<typeof Button>,
  'children'
>;

export const ThemeSwitcher = (inProps: ThemeSwitcherProps) => {
  const [scheme, setScheme] = useTheme();

  const isDark = scheme === 'dark';
  const other = isDark ? 'light' : 'dark';

  return (
    <Button
      {...inProps}
      title={`Set ${other} mode`}
      onClick={() => setScheme(other)}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};

ThemeSwitcher.displayName = 'ThemeSwitcher';
