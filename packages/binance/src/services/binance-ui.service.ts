import { singleton } from 'tsyringe';
import { Loop } from '../../../shared/src/base/loop';
import type { IUiService } from '../../../shared/src/contracts/ui.service';
import { extractPriceFromElement, log, parsePriceInput, triggerInputChange } from '../../../shared/src/lib';

const SYMBOL_SELECTOR = '.ticker-wrap h1';
const LAST_PRICE_TOP_BAR_SELECTOR =
  '.ticker-wrap > div:first-child > div:first-child > div:first-child > div:last-child';
const IFRAME_SELECTOR = 'iframe[name*="tradingview_"][id*="tradingview_"]';
const STOP_LOSS_INPUT_SELECTOR = '[name="orderForm"] [name="stopLossStopPrice"]';
const TAKE_PROFIT_INPUT_SELECTOR = '[name="orderForm"] [name="takeProfitStopPrice"]';
const PRICE_INPUT_SELECTOR = '[name="orderForm"] [name="limitPrice"], [name="orderForm"] [name="triggerPrice"]';
const AMOUNT_INPUT_SELECTOR = '[name="orderForm"] [name="unitAmount"]';

@singleton()
export class UiService implements IUiService {
  constructor(private readonly loop: Loop) {}

  public init() {
    this.patchIframe();
  }

  public getSymbol() {
    const symbol = document.querySelector<HTMLSpanElement>(SYMBOL_SELECTOR)?.innerText ?? null;
    return symbol ? symbol.trim() : null;
  }

  public getLastPrice() {
    const cursor = document.querySelector<HTMLDivElement>(LAST_PRICE_TOP_BAR_SELECTOR);
    return extractPriceFromElement(cursor?.innerText);
  }

  public setAmount(amount: number) {
    const amountInputs = document.querySelectorAll<HTMLInputElement>(AMOUNT_INPUT_SELECTOR);
    amountInputs.forEach((input) => triggerInputChange(input, amount));
  }

  private getStopLossInputs() {
    return document.querySelectorAll<HTMLInputElement>(STOP_LOSS_INPUT_SELECTOR);
  }

  public getStopLossPrice() {
    return [...this.getStopLossInputs()].map(parsePriceInput).filter((i) => i)[0] ?? null;
  }

  public changeStopLossInput(value: number) {
    this.getStopLossInputs().forEach((input) => triggerInputChange(input, value));
  }

  private getTakeProfitInputs() {
    return document.querySelectorAll<HTMLInputElement>(TAKE_PROFIT_INPUT_SELECTOR);
  }

  public changeTakeProfitInput(value: number) {
    this.getTakeProfitInputs().forEach((input) => triggerInputChange(input, value));
  }

  public getPriceInputs() {
    return document.querySelectorAll<HTMLInputElement>(PRICE_INPUT_SELECTOR);
  }

  public changePriceInput(value: number) {
    this.getPriceInputs().forEach((input) => triggerInputChange(input, value));
  }

  public getLimitPrice() {
    return [...this.getPriceInputs()].map(parsePriceInput).filter((i) => i)[0] ?? null;
  }

  private patchIframe() {
    const patch = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(IFRAME_SELECTOR);

      if (iframe && !iframe.getAttribute('data-utilities-patched')) {
        log('Patch tradingview iframe');

        iframe.setAttribute('data-utilities-patched', 'true');
        iframe.onmouseover = () => {
          iframe.focus();
        };
      }
    };

    this.loop.on('tick', patch);
  }
}
