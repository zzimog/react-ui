export function dispatchEvent(
  name: string,
  target?: HTMLElement,
  handler?: (event: Event) => void
) {
  const customEvent = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
  });

  if (target && handler) {
    target.addEventListener(name, handler, { once: true });
    target.dispatchEvent(customEvent);
  }
}
