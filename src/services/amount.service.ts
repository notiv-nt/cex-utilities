import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { config } from '../config';
import { Loop } from '../core/loop';
import { calcAmount, calculatePosition } from '../lib';
import { log } from '../log';
import { CurrentPriceService } from './current-price.service';
import { StopLossService } from './stop-loss.service';
import { UiService } from './ui/ui.service';

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
      const position = calculatePosition({
        maxRisk: config.maxRisk,
        takerFee: config.takerFee,
        makerFee: config.makerFee,
        openPrice: currentPrice,
        stopLossPrice,
        entryOrderType: 'market',
        tpOrderType: 'market',
        slOrderType: 'market',
      });

      // const amount = calcAmount(currentPrice, stopLossPrice, config.maxRisk);

      this.uiService.setAmount(position.maxPosSizeUSD);
    }
  }

  public watchAmount() {
    this.loop.on('tick', () => {
      this.setAmount();
    });
  }
}
