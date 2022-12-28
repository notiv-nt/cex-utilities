import { singleton } from 'tsyringe';
import { Loop } from '../../../shared/src/base/loop';
import type { IUiService } from '../../../shared/src/contracts/ui.service';
import { extractPriceFromElement, log, parsePriceInput, triggerInputChange } from '../../../shared/src/lib';

const SYMBOL_PLACEHOLDER = '--';
const SYMBOL_SELECTOR = '#app .watch-drop-box .ticker-title';
const LAST_PRICE_TOP_BAR_SELECTOR = '#app .trade-header-box .ticker-last-box .last';
const IFRAME_SELECTOR = '.tv-chart-box > iframe[name*="tradingview_"]';
const STOP_LOSS_INPUT_SELECTOR = '#app .place-order-form-box input[name="slTriggerPx"]';
const TAKE_PROFIT_INPUT_SELECTOR = '#app .place-order-form-box input[name="tpTriggerPx"]';
const PRICE_INPUT_SELECTOR = '#leftPoForm [name="price"], #rightPoForm [name="price"]';
const AMOUNT_INPUT_SELECTOR = '#app .place-order-form-box input[name="size"]';

@singleton()
export class UiService implements IUiService {
  constructor(private readonly loop: Loop) {}

  public getSymbol() {
    const symbol = document.querySelector<HTMLSpanElement>(SYMBOL_SELECTOR)?.innerText ?? null;
    if (symbol && symbol !== SYMBOL_PLACEHOLDER) {
      return symbol;
    }
    return null;
  }

  public getLastPrice() {
    const cursor = document.querySelector<HTMLDivElement>(LAST_PRICE_TOP_BAR_SELECTOR);
    return extractPriceFromElement(cursor);
  }

  public patchIframe() {
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

  public getStopLossInputs() {
    return document.querySelectorAll<HTMLInputElement>(STOP_LOSS_INPUT_SELECTOR);
  }

  public changeStopLossInput(value: number) {
    this.getStopLossInputs().forEach((input) => {
      if (input) {
        triggerInputChange(input, value);
      }
    });
  }

  public getTakeProfitInputs() {
    return [...document.querySelectorAll<HTMLInputElement>(TAKE_PROFIT_INPUT_SELECTOR)];
  }

  public changeTakeProfitInput(value: number) {
    this.getTakeProfitInputs().forEach((input) => {
      if (input) {
        triggerInputChange(input, value);
      }
    });
  }

  public getPriceInputs() {
    return [...document.querySelectorAll<HTMLInputElement>(PRICE_INPUT_SELECTOR)];
  }

  public changePriceInput(value: number) {
    this.getPriceInputs().forEach((input) => {
      if (input) {
        triggerInputChange(input, value);
      }
    });
  }

  public getLimitPrice() {
    return parsePriceInput(this.getPriceInputs()[0]);
  }

  public getStopLossPrice() {
    return parsePriceInput(this.getStopLossInputs()[0]);
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
