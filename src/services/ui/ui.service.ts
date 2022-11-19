import { singleton } from 'tsyringe';
import { extractPriceFromElement, triggerInputChange } from '../../lib';

const SYMBOL_PLACEHOLDER = '--';
const SYMBOL_SELECTOR = '#app .watch-drop-box .ticker-title';
const STOP_LOSS_INPUT_SELECTOR = '#app .place-order-form-box input[name="slTriggerPx"]';
const LAST_PRICE_TOP_BAR_SELECTOR = '#app .trade-header-box .ticker-last-box .last';
const AMOUNT_INPUT_SELECTOR = '#app .place-order-form-box input[name="size"]';
const PRICE_INPUT_SELECTOR = '#leftPoForm [name="price"], #rightPoForm [name="price"]';

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

  public getStopLossInputs() {
    return document.querySelectorAll<HTMLInputElement>(STOP_LOSS_INPUT_SELECTOR);
  }

  public getPriceInput() {
    return document.querySelector<HTMLInputElement>(PRICE_INPUT_SELECTOR);
  }

  public getPriceInputs() {
    return document.querySelectorAll<HTMLInputElement>(PRICE_INPUT_SELECTOR);
  }

  public changePriceInput(value: number) {
    this.getPriceInputs().forEach((input) => {
      if (input) {
        triggerInputChange(input, value);
      }
    });
  }

  public changeStopLossInput(value: number) {
    this.getStopLossInputs().forEach((input) => {
      if (input) {
        triggerInputChange(input, value);
      }
    });
  }

  public setAmount(amount: number) {
    const amountInputs = document.querySelectorAll<HTMLInputElement>(AMOUNT_INPUT_SELECTOR);
    amountInputs.forEach((input) => {
      if (input) {
        triggerInputChange(input, amount);
      }
    });
  }
}
