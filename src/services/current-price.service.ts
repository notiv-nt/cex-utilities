import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { Loop } from '../core/loop';
import { UiService } from './ui.service';

@singleton()
export class CurrentPriceService extends BaseService {
  public lastPrice: null | number = null;

  constructor(private readonly loop: Loop, private readonly uiService: UiService) {
    super();
  }

  public watchCurrentPrice() {
    this.loop.on('tick', () => {
      const lastPrice = this.uiService.getLastPrice();

      if (lastPrice === null) {
        return;
      }

      if (this.lastPrice !== lastPrice) {
        this.lastPrice = lastPrice;
        this.emit('change', lastPrice);
      }
    });
  }
}
