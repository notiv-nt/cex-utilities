import { singleton } from 'tsyringe';
import { extractPriceFromElement, triggerInputChange } from '../../lib';

const SYMBOL_PLACEHOLDER = '--';
const SYMBOL_SELECTOR = '#app .watch-drop-box .ticker-title';
const CURSOR_SELECTOR = '#okline-wrap .okline-indic-scale.okline-indic-scale-rangeSelect';
const STOP_LOSS_INPUT_SELECTOR = '#app .place-order-form-box .place-order-input-box input[name="slTriggerPx"]';
const LAST_PRICE_SELECTOR = '#okline-wrap .okline-indic-scale.okline-indic-scale-lastClose';
const LAST_PRICE_TOP_BAR_SELECTOR = '#app .trade-header-box .ticker-last-box .last';
const AMOUNT_INPUT_SELECTOR = '#app .place-order-form-box .place-order-input-box input[name="size"]';

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
    const cursor = document.querySelector<HTMLDivElement>(LAST_PRICE_SELECTOR);
    return extractPriceFromElement(cursor);
  }

  public getLastPriceFromTopBar(): null | number {
    const cursor = document.querySelector<HTMLDivElement>(LAST_PRICE_TOP_BAR_SELECTOR);
    return extractPriceFromElement(cursor);
  }

  public getStopLoss(): null | number {
    const cursor = document.querySelector<HTMLDivElement>(CURSOR_SELECTOR);
    return extractPriceFromElement(cursor);
  }

  public getStopLossInput() {
    const stopLossElement = document.querySelector<HTMLInputElement>(STOP_LOSS_INPUT_SELECTOR);
    return stopLossElement;
  }

  public changeStopLossInput(value: number) {
    const stopLossInput = this.getStopLossInput();
    if (stopLossInput) {
      triggerInputChange(stopLossInput, value);
    }
  }

  public setAmount(amount: number) {
    const amountInput = document.querySelector<HTMLInputElement>(AMOUNT_INPUT_SELECTOR);
    if (amountInput) {
      triggerInputChange(amountInput, amount);
    }
  }
}
