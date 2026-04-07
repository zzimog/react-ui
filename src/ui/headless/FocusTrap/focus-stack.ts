import { useConstant } from '@ui/hooks';

type StackAPI = {
  enabled: boolean;
  pause(): void;
  resume(): void;
};

const stack: StackAPI[] = [];

function removeItem(item: StackAPI) {
  const index = stack.indexOf(item);
  if (index !== -1) {
    stack.splice(index, 1);
  }
}

export const FocusStack = {
  add(item: StackAPI) {
    if (item !== stack[0]) {
      stack[0]?.pause();
    }

    removeItem(item);
    stack.unshift(item);
  },
  remove(item: StackAPI) {
    removeItem(item);
    stack[0]?.resume();
  },
};

export function useFocusStackAPI() {
  return useConstant<StackAPI>({
    enabled: true,
    pause() {
      this.enabled = false;
    },
    resume() {
      this.enabled = true;
    },
  });
}
