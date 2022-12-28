type OrderType = 'market' | 'limit';

export interface PositionInput {
  maxRisk: number; // in $, e.g. '1'
  takerFee: number; // const in % e.g. '0.04'
  makerFee: number; // const in % e.g. '0.02'
  openPrice: number;
  stopLossPrice: number;
  entryOrderType: OrderType;
  slOrderType: OrderType;
}

export interface Position {
  maxPosSizeUSD: number;
  maxContracts: number;
  entryFee: number;
  stopLossFee: number;
  totalFee: number;
  amount: number;
  total: number;
}

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
