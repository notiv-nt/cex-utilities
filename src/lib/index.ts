type OrderType = 'market' | 'limit';

type PositionInput = {
  maxRisk: number; // in $
  takerFee: number; // const
  makerFee: number; // const
  openPrice: number;
  stopLossPrice: number;
  targetPrice?: number;
  entryOrderType: OrderType;
  tpOrderType: OrderType;
  slOrderType: OrderType;
};

export function calculatePosition({
  maxRisk,
  takerFee,
  makerFee,
  openPrice,
  stopLossPrice,
  targetPrice,
  entryOrderType,
  tpOrderType,
  slOrderType,
}: PositionInput) {
  // basic stuff
  const isLong = openPrice > stopLossPrice;

  // risk : reward
  // const rewardPerUnit = isLong ? targetPrice - openPrice : openPrice - targetPrice;
  const riskPerUnit = isLong ? stopLossPrice - openPrice : openPrice - stopLossPrice;
  // const riskReward = rewardPerUnit / -riskPerUnit;

  // max position - calculating stop loss fee in
  const totalCostPerUnit = isLong ? stopLossPrice - openPrice : openPrice - stopLossPrice;
  const maxContracts = maxRisk / totalCostPerUnit;
  const maxPosSizeUSD = (maxRisk / totalCostPerUnit) * openPrice;

  // fees
  const entryFee = openPrice * calcFee(entryOrderType) * maxContracts * -1;
  const stopLossFee = stopLossPrice * calcFee(slOrderType) * maxContracts * -1;
  // const takeProfitFee = targetPrice * calcFee(tpOrderType) * maxPosSize * -1;

  // totals after deducting fees
  // const totalReward = isLong
  //   ? maxPosSize * targetPrice - maxPosSize * openPrice
  //   : maxPosSize * openPrice - maxPosSize * targetPrice;

  return {
    maxToRiskAmount: maxRisk,
    // rewardPerUnit,
    riskPerUnit,
    // riskReward,
    totalCostPerUnit,
    maxPosSizeUSD: Math.floor(Math.abs(maxPosSizeUSD)),
    entryFee,
    stopLossFee,
    // takeProfitFee,
    // totalReward,
    maxContracts: Math.floor(Math.abs(maxContracts)),
  };

  function calcFee(type: OrderType) {
    return type === 'market' ? makerFee : takerFee;
  }
}

export function calcAmount(enterPrice: number, stopPrice: number, maxLoss: number) {
  return Math.abs((enterPrice * maxLoss) / (stopPrice - enterPrice));
}

export function extractPriceFromElement(element: HTMLElement | null): number | null {
  if (!element) {
    return null;
  }
  const value = element.innerText.trim().replace(/[^\d.]/gm, '');
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
