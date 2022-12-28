// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(...msg: any) {
  console.log('[Utilities]', ...msg);
}

export function extractPriceFromElement(element: HTMLElement | null): number | null {
  if (!element) {
    return null;
  }
  const value = element.innerText
    .trim()
    // TODO: check number formats on different languages
    // .replace(/[,]/gm, '.')
    .replace(/[^\d.]+/gm, '');

  const price = parseFloat(value);
  if (Number.isNaN(price)) {
    return null;
  }
  return price;
}

export function triggerInputChange(node: any, value: string | number = '') {
  /* eslint-disable no-proto */
  const inputTypes = [window.HTMLInputElement, window.HTMLSelectElement, window.HTMLTextAreaElement];

  if (inputTypes.includes(node.__proto__.constructor)) {
    const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value')?.set;
    const event = new Event('input', { bubbles: true });

    setValue?.call(node, value);
    node.dispatchEvent(event);
  }
}

export function parsePriceInput(input: HTMLInputElement | null) {
  if (!input) {
    return null;
  }
  const parsedValue = parseFloat(input.value.replace(/[^\d.]+/gim, ''));
  if (Number.isNaN(parsedValue)) {
    return null;
  }
  return parsedValue;
}
