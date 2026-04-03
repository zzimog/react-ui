const classes = {
  trigger: [
    'flex',
    'justify-between',
    'items-center',
    'gap-2',
    'w-full',
    'h-8',
    'px-2.5',
    'text-sm',
    'border',
    'bg-input',
    'rounded-shape',
    'transition-colors',
    '[&_svg]:size-4',
    '[&_svg]:transition-transform',
    '[&_svg]:shrink-0',
    // hover
    'hover:border-primary',
    // focus
    'focusable',
    'focus:border-primary',
    'focus:outline-outline',
    // disabled
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    // expanded
    'aria-expanded:border-primary',
    'aria-expanded:[&_svg]:rotate-180',
    // invalid
    'aria-invalid:border-danger!',
    'aria-invalid:focus:outline-danger/50',
  ],
  value: 'truncate shrink data-placeholder:text-muted',
  dialog: [
    'w-(--anchor-width)',
    'data-[open=true]:animate-in',
    'data-[open=false]:animate-out',
  ],
  content: [
    'max-h-50',
    'p-1',
    'border',
    'rounded-shape',
    'bg-input',
    'text-foreground',
    'transition',
    'overflow-auto',
    'overscroll-contain',
  ],
  group: null,
  legend: 'p-2 text-muted text-xs font-semibold cursor-default',
  option: [
    'relative',
    'pl-8',
    'pr-4',
    'outline-0',
    'rounded-shape',
    'text-sm/8',
    'select-none',
    'aria-disabled:text-muted',
    'data-[empty]:text-muted',
    'data-[active]:bg-highlight',
    'data-[active]:text-highlight-contrast',
  ],
  check: 'absolute left-2 ml-0.5 top-1/2 -translate-y-1/2 size-3',
};

export default classes;
