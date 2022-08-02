import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { Loop } from '../core/loop';
import { calcAmount } from '../lib';
import { CurrentPriceService } from './current-price.service';
import { StopLossService } from './stop-loss.service';
import { UiService } from './ui.service';

@singleton()
export class AmountService extends BaseService {
  constructor(
    private readonly loop: Loop,
    private readonly uiService: UiService,
    private readonly currentPriceService: CurrentPriceService,
    private readonly stopLossService: StopLossService,
  ) {
    super();
  }

  private setAmount() {
    const stopLossPrice = this.stopLossService.stopLoss;
    const currentPrice = this.currentPriceService.lastPrice;

    if (stopLossPrice !== null && currentPrice !== null) {
      const amount = calcAmount(currentPrice, stopLossPrice, 1);
      this.uiService.setAmount(amount);
    }
  }

  public watchAmount() {
    this.loop.on('tick', () => {
      this.setAmount();
    });
  }
}
