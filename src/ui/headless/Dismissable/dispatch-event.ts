export function dispatchEvent<E extends Event>(
  name: string,
  originalEvent: E,
  handler?: (event: Event) => void
) {
  const customEvent = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
  });

  const target = originalEvent.target;
  if (target && handler) {
    target.addEventListener(name, handler, { once: true });
    target.dispatchEvent(customEvent);
  }
}
