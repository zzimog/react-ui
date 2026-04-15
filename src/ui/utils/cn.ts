import { clsx as _clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type { VariantProps } from 'class-variance-authority';

export function cn(...inputs: ClassValue[]) {
  return twMerge(_clsx(inputs));
}

type ClassNames = string | string[];
type ClassDict = Record<string, ClassNames>;
interface ClsxFactory {
  (input: ClassNames): string;
  <D extends ClassDict>(input: D): { [K in keyof D]: string };
}

const clsxFactory = (input: ClassDict | ClassNames) => {
  if (typeof input === 'string') return input;
  if (Array.isArray(input)) return input.join(' ');

  return Object.entries(input).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]: _clsx(value),
    }),
    {}
  );
};

const clsx = clsxFactory as ClsxFactory;
export { clsx };
