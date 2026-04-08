import { createContext } from 'react';
import type { ButtonSize, ButtonVariant } from './Button';

type ButtonGroupContextType = {
  column?: boolean;
  joined?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export const ButtonGroupContext = createContext<
  ButtonGroupContextType | undefined
>(undefined);
