export function calcAmount(enterPrice: number, stopPrice: number, maxLoss: number) {
  return Math.abs((enterPrice * maxLoss) / (stopPrice - enterPrice));
}

export function extractPriceFromElement(element: HTMLElement | null): number | null {
  if (!element) {
    return null;
  }
  const value = element.innerText.trim().replace(/[^\d.]/gm, '');
  return parseFloat(value);
}

export function triggerInputChange(node, value: string | number = '') {
  /* eslint-disable no-proto */

  const inputTypes = [window.HTMLInputElement, window.HTMLSelectElement, window.HTMLTextAreaElement];

  if (inputTypes.indexOf(node.__proto__.constructor) > -1) {
    const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value')?.set;
    const event = new Event('input', { bubbles: true });

    setValue?.call(node, value);
    node.dispatchEvent(event);
  }
}
