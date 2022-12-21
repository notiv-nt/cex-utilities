type OrderType = 'market' | 'limit';

export type PositionInput = {
  maxRisk: number; // in $
  takerFee: number; // const in %
  makerFee: number; // const in %
  openPrice: number;
  stopLossPrice: number;
  entryOrderType: OrderType;
  slOrderType: OrderType;
};

export type Position = {
  maxPosSizeUSD: number;
  maxContracts: number;
  entryFee: number;
  stopLossFee: number;
  totalFee: number;
  amount: number;
  total: number;
};

export function calculatePosition({
  maxRisk,
  takerFee,
  makerFee,
  openPrice,
  stopLossPrice,
  entryOrderType,
  slOrderType,
}: PositionInput): Position {
  const isLong = openPrice > stopLossPrice;
  const totalCostPerUnit = isLong ? stopLossPrice - openPrice : openPrice - stopLossPrice;
  const entryFee = openPrice * getFee(entryOrderType) * (maxRisk / totalCostPerUnit) * -1;
  const stopLossFee = stopLossPrice * getFee(slOrderType) * (maxRisk / totalCostPerUnit) * -1;

  const maxContracts = maxRisk / totalCostPerUnit;

  const maxPosSizeUSD = maxContracts * openPrice;

  return {
    maxPosSizeUSD: Math.floor(Math.abs(maxPosSizeUSD)),
    maxContracts: Math.floor(Math.abs(maxContracts)),
    entryFee,
    stopLossFee,
    totalFee: entryFee + stopLossFee,
    amount: maxRisk,
    total: maxRisk + entryFee + stopLossFee,
  };

  function getFee(type: OrderType) {
    return type === 'market' ? takerFee : makerFee;
  }
}

export function calculatePositionWithFees(args: PositionInput) {
  let i = 0;
  let lastRisk = args.maxRisk;
  const maxTries = 30;

  let position = calculatePosition({ ...args, maxRisk: lastRisk });

  while (i++ < maxTries) {
    const diff = args.maxRisk / position.total;
    if (diff === 1) {
      break;
    }
    lastRisk *= diff;
    position = calculatePosition({ ...args, maxRisk: lastRisk });
  }

  return position;
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
