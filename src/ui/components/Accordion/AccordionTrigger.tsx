import { Plus } from 'lucide-react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { AccordionItem } from './AccordionItem';
import classes from './classes';

const DISPLAY_NAME = 'AccordionTrigger';

type BaseProps = NativeProps<'button'>;
type AccordionTriggerProps = BaseProps;

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { className, children, onClick, ...props } = inProps;

  const { open, onOpenChange } = AccordionItem.useContext(DISPLAY_NAME);

  return (
    <Native.button
      data-open={open}
      {...props}
      className={cn(classes.trigger, className)}
      onClick={composeHandlers(onClick, () => {
        onOpenChange(!open);
      })}
    >
      {children}
      <Plus className={classes.arrow} />
    </Native.button>
  );
};

AccordionTrigger.displayName = DISPLAY_NAME;
