const classes = {
  root: [
    'flex',
    'flex-col',
    'p-1',
    'border',
    'text-card-contrast',
    'bg-card',
    'rounded-shape-1',
    'transition',
    'outline-0',
    'shadow-sm',
    /**
     * Debug only
     * @todo To be removed
     */
    'focus:border-foreground',
  ],
  label: 'text-muted px-2 py-1 text-xs font-extrabold transition',
  separator: 'w-full h-px my-1 bg-border transition',
  item: [
    'relative',
    'grid',
    'grid-cols-[1fr_calc(var(--spacing)*4)]',
    'gap-2',
    'justify-between',
    'items-center',
    'w-full',
    'p-2',
    'pl-8',
    'text-left',
    'text-sm/4',
    'rounded-shape',
    'outline-0',
    '[&_svg]:size-4',
    'focus:bg-highlight',
    'aria-disabled:opacity-50',
    'aria-expanded:bg-highlight/50',
  ],
  icon: 'absolute left-2',
};

export default classes;
