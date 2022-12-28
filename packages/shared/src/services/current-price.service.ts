import { inject, singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { Loop } from '../base/loop';
import { TOKENS } from '../constants';
import type { IUiService } from '../contracts/ui.service';

@singleton()
export class CurrentPriceService extends BaseService {
  public lastPrice: null | number = null;

  constructor(private readonly loop: Loop, @inject(TOKENS.UI_SERVICE) private readonly uiService: IUiService) {
    super();
  }

  public init() {
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
