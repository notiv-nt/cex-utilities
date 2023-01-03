export interface IUiService {
  init: () => void;

  getSymbol: () => null | string;
  getLastPrice: () => null | number;

  setAmount: (maxPosSizeUSD: number) => void;

  getStopLossPrice: () => number | null;
  changeStopLossInput: (stopLoss: number) => void;

  changeTakeProfitInput: (price: number) => void;

  getPriceInputs: () => HTMLInputElement[] | NodeListOf<HTMLInputElement>;
  changePriceInput: (price: number) => unknown;

  getLimitPrice: () => number | null;
}
