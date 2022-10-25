import { singleton } from 'tsyringe';
import { extractPriceFromElement, triggerInputChange } from '../../lib';

const SYMBOL_PLACEHOLDER = '--';
const SYMBOL_SELECTOR = '#app .watch-drop-box .ticker-title';
const STOP_LOSS_INPUT_SELECTOR = '#app .place-order-form-box .place-order-input-box input[name="slTriggerPx"]';
const LAST_PRICE_TOP_BAR_SELECTOR = '#app .trade-header-box .ticker-last-box .last';
const AMOUNT_INPUT_SELECTOR = '#app .place-order-form-box .place-order-input-box input[name="size"]';
const PRICE_INPUT_SELECTOR = '#leftPoForm .place-order-input-box [name="price"]';

@singleton()
export class UiService {
  public getSymbol(): null | string {
    const symbol = document.querySelector<HTMLSpanElement>(SYMBOL_SELECTOR)?.innerText || null;

    if (symbol && symbol !== SYMBOL_PLACEHOLDER) {
      return symbol;
    }

    return null;
  }

  public getLastPrice(): null | number {
    const cursor = document.querySelector<HTMLDivElement>(LAST_PRICE_TOP_BAR_SELECTOR);
    return extractPriceFromElement(cursor);
  }

  public getStopLossInput() {
    return document.querySelector<HTMLInputElement>(STOP_LOSS_INPUT_SELECTOR);
  }

  public getPriceInput() {
    return document.querySelector<HTMLInputElement>(PRICE_INPUT_SELECTOR);
  }

  public changePriceInput(value: number) {
    const input = this.getPriceInput();
    if (input) {
      triggerInputChange(input, value);
    }
  }

  public changeStopLossInput(value: number) {
    const input = this.getStopLossInput();
    if (input) {
      triggerInputChange(input, value);
    }
  }

  public setAmount(amount: number) {
    const amountInput = document.querySelector<HTMLInputElement>(AMOUNT_INPUT_SELECTOR);
    if (amountInput) {
      triggerInputChange(amountInput, amount);
    }
  }
}
