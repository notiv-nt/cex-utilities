import { extractPriceFromElement } from '../lib';
import BaseService from '../base/base.service';

class PriceService extends BaseService {
  public lastPrice: null | number = null;

  public watchPrice = () => {
    const loop = () => {
      if (!this.isAlive) {
        return;
      }

      this.extractPrice();
      requestAnimationFrame(loop);
    };

    loop();
  };

  private extractPrice() {
    const lastPrice = this.getLastPrice();

    if (lastPrice === null || Number.isNaN(lastPrice)) {
      return;
    }

    if (this.lastPrice !== lastPrice) {
      this.lastPrice = lastPrice;
      this.emit('change-price', lastPrice);
    }
  }

  private getLastPrice() {
    const cursor = document.querySelector<HTMLDivElement>(
      '#okline-wrap .okline-indic-scale.okline-indic-scale-lastClose',
    );
    return extractPriceFromElement(cursor);
  }
}

export default new PriceService();
