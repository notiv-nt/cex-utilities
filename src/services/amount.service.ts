import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { UserConfig } from '../config/user.config';
import { Loop } from '../core/loop';
import { calculatePosition, calculatePositionWithFees } from '../lib';
import { CurrentPriceService } from './current-price.service';
import { PriceService } from './price.service';
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
    private readonly priceService: PriceService,
  ) {
    super();
  }

  private setAmount() {
    if (this.amountUiService.isManualAmount) {
      return;
    }

    const { config } = this.userConfig;

    const stopLossPrice = this.stopLossService.getStopLossPrice();
    const currentPrice = this.currentPriceService.lastPrice;
    const limitOrderPrice = this.priceService.getLimitPrice();

    const isLimitOrder = this.uiService.getPriceInput() && this.priceService.price !== null;
    const entryPrice = isLimitOrder ? limitOrderPrice : currentPrice;

    if (stopLossPrice !== null && entryPrice !== null) {
      const calcFn = config.include_fees ? calculatePositionWithFees : calculatePosition;
      const position = calcFn({
        maxRisk: config.max_risk,
        takerFee: config.taker_fee / 100,
        makerFee: config.maker_fee / 100,

        openPrice: entryPrice,
        entryOrderType: isLimitOrder ? 'limit' : 'market',

        stopLossPrice,
        slOrderType: 'market',
      });

      this.uiService.setAmount(position.maxPosSizeUSD);
    }
  }

  public watchAmount() {
    this.loop.on('tick', () => {
      this.setAmount();
    });
  }
}
