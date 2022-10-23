import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { UserConfig } from '../config/user.config';
import { Loop } from '../core/loop';
import { calculatePosition } from '../lib';
import { CurrentPriceService } from './current-price.service';
import { StopLossService } from './stop-loss.service';
import { AmountUiService } from './ui/amount-ui.service';
import { UiService } from './ui/ui.service';

@singleton()
export class AmountService extends BaseService {
  constructor(
    private readonly loop: Loop,
    private readonly uiService: UiService,
    private readonly currentPriceService: CurrentPriceService,
    private readonly stopLossService: StopLossService,
    private readonly userConfig: UserConfig,
    private readonly amountUiService: AmountUiService,
  ) {
    super();
  }

  private setAmount() {
    const stopLossPrice = this.stopLossService.stopLoss;
    const currentPrice = this.currentPriceService.lastPrice;

    if (stopLossPrice !== null && currentPrice !== null) {
      const { config } = this.userConfig;

      const position = calculatePosition({
        maxRisk: config.max_risk,
        takerFee: config.taker_fee / 100,
        makerFee: config.maker_fee / 100,

        openPrice: currentPrice,
        entryOrderType: 'market',

        stopLossPrice,
        slOrderType: 'market',
      });

      if (!this.amountUiService.isManualAmount) {
        // const amount = calcAmount(currentPrice, stopLossPrice, config.maxRisk);

        this.uiService.setAmount(position.maxPosSizeUSD);
      }
    }
  }

  public watchAmount() {
    this.loop.on('tick', () => {
      this.setAmount();
    });
  }
}
