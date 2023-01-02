// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(...msg: any) {
  console.log('[Utilities]', ...msg);
}

export function extractPriceFromElement(text: string | undefined): number | null {
  if (!text) return null;
  let str = text.trim().replace(/[^\d.,]+/gm, '');
  const [hasComma, commaIndex, hasDot, dotIndex] = [
    str.includes(','),
    str.indexOf(','),
    str.includes('.'),
    str.indexOf('.'),
  ];
  if (hasComma && hasDot && commaIndex < dotIndex) {
    str = str.replaceAll(',', '');
  } else if (hasComma && hasDot && commaIndex > dotIndex) {
    str = str.replaceAll('.', '').replaceAll(',', '.');
  } else if (hasComma && !hasDot) {
    str = str.replaceAll(',', '.');
  }
  const price = parseFloat(str);
  return Number.isNaN(price) ? null : price;
}

export function triggerInputChange(node: any, value: string | number = '') {
  /* eslint-disable no-proto */
  if (!node?.__proto__?.constructor) {
    return;
  }
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
