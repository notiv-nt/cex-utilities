import { calcAmount, triggerInputChange } from '../lib';
import BaseService from '../base/base.service';
import priceService from './price.service';

class AmountService extends BaseService {
  private setAmount() {
    const stopLossElement = document.querySelector<HTMLInputElement>(
      '#app .place-order-form-box .place-order-input-box input[name="slTriggerPx"]',
    );

    if (!stopLossElement) {
      return;
    }

    const stopLossPrice = parseFloat(stopLossElement.value);
    const currentPrice = priceService.lastPrice;

    const amountInput = document.querySelector<HTMLInputElement>(
      '#app .place-order-form-box .place-order-input-box input[name="size"]',
    );

    if (!stopLossPrice || !currentPrice) {
      return;
    }

    const amount = calcAmount(currentPrice, stopLossPrice, 1);
    triggerInputChange(amountInput, amount);
  }

  public watchAmount() {
    const loop = () => {
      if (!this.isAlive) {
        return;
      }

      this.setAmount();
      requestAnimationFrame(loop);
    };

    loop();
  }
}

export default new AmountService();
