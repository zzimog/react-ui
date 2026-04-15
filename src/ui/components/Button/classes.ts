import { cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'inline-flex',
    'justify-center',
    'items-center',
    'gap-2',
    'min-w-fit',
    'rounded-shape',
    'font-semibold',
    'text-foreground',
    'bg-foreground/15',
    'whitespace-nowrap',
    'text-ellipsis',
    'overflow-hidden',
    'shadow-sm',
    'transition-all',
    'cursor-pointer',
    // focus
    'focusable',
    'focus-visible:outline-foreground/20',
    // hover
    'hover:bg-foreground/20',
    // active
    'active:bg-foreground/25',
    // disabled
    'aria-disabled:opacity-50',
    'aria-disabled:cursor-not-allowed',
    // icon
    '[&_svg]:shrink-0',
    '[&_svg]:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'min-w-6 h-6 px-1 gap-1 text-sm [&_svg]:size-4',
        md: 'min-w-8 h-8 px-2 text-sm [&_svg]:size-4',
        lg: 'min-w-10 h-10 px-2 text-base [&_svg]:size-6',
      },
      variant: {
        default: null,
        primary: [
          'text-primary-contrast',
          'bg-primary/80',
          'hover:bg-primary/90',
          'active:bg-primary',
          'focus-visible:outline-primary/50',
        ],
        danger: [
          'text-danger-contrast',
          'bg-danger/80',
          'hover:bg-danger/90',
          'active:bg-danger',
          'focus-visible:outline-danger/50',
        ],
        outlined: [
          'border',
          'text-inherit',
          'bg-transparent',
          'border-current/50',
          'hover:bg-current/10',
          'active:bg-current/15',
        ],
        ghost: [
          'shadow-none',
          'text-inherit',
          'bg-transparent',
          'hover:bg-current/10',
          'active:bg-current/15',
        ],
      },
      loading: {
        true: 'opacity-75! cursor-progress!',
      },
      joined: {
        col: 'not-first:rounded-t-none not-last:rounded-b-none',
        row: 'not-first:rounded-l-none not-last:rounded-r-none',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const buttonGroupClasses = cva('group inline-flex items-center', {
  variants: {
    column: {
      true: 'flex-col items-stretch',
    },
    joined: {
      true: 'gap-px',
      false: 'gap-1',
    },
  },
});

export default {
  button: buttonClasses,
  group: buttonGroupClasses,
};
