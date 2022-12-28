export interface IUiService {
  setAmount: (maxPosSizeUSD: number) => void;

  getStopLossPrice: () => number | null;
  changeStopLossInput: (stopLoss: number) => void;

  getTakeProfitInputs: () => HTMLInputElement[];
  changeTakeProfitInput: (price: number) => void;

  getPriceInputs: () => HTMLInputElement[];
  changePriceInput: (price: number) => unknown;

  getLimitPrice: () => number | null;
  getSymbol: () => null | string;
  getLastPrice: () => null | number;
}
