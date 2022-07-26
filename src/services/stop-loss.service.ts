import { extractPriceFromElement, triggerInputChange } from '../lib';
import BaseService from '../base/base.service';

class StopLossService extends BaseService {
  private isAltPressed = false;

  public setupListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Alt') {
        this.isAltPressed = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Alt') {
        this.isAltPressed = false;
      }
    });
  }

  public watchStopLoss = () => {
    const loop = () => {
      if (!this.isAlive) {
        return;
      }

      this.extractStopLossPrice();
      requestAnimationFrame(loop);
    };

    loop();
  };

  private extractStopLossPrice() {
    const cursorPrice = this.getCursorPrice();

    if (cursorPrice !== null && this.isAltPressed) {
      const stopLossInput = document.querySelector(
        '#app .place-order-form-box .place-order-input-box input[name="slTriggerPx"]',
      );

      triggerInputChange(stopLossInput, cursorPrice);
    }
  }

  private getCursorPrice() {
    const cursor = document.querySelector<HTMLDivElement>(
      '#okline-wrap .okline-indic-scale.okline-indic-scale-rangeSelect',
    );
    return extractPriceFromElement(cursor);
  }
}

export default new StopLossService();
