export function composeHandlers<E extends { defaultPrevented: boolean }>(
  propHandler?: (event: E) => void,
  customHandler?: (event: E) => void,
  checkPrevented: boolean = true
) {
  return function (event: E) {
    propHandler?.(event);

    if (!checkPrevented || !event.defaultPrevented) {
      customHandler?.(event);
    }
  };
}
