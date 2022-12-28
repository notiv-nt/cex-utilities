import { Loop } from '../base/loop';
import { inject, singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import type { IUiService } from '../contracts/ui.service';
import { CurrentPriceService } from './current-price.service';
import { UserConfig } from '../config/user.config';
import { PriceService } from './price.service';
import { calculatePosition, calculatePositionWithFees } from '../math';
import { TOKENS } from '../constants';

@singleton()
export class AmountService extends BaseService {
  public manual = false;

  constructor(
    private readonly loop: Loop,
    @inject(TOKENS.UI_SERVICE) private readonly uiService: IUiService,
    private readonly currentPriceService: CurrentPriceService,
    private readonly userConfig: UserConfig,
    private readonly priceService: PriceService,
  ) {
    super();
  }

  private setAmount() {
    if (this.manual) {
      return;
    }

    const { config } = this.userConfig;

    const stopLossPrice = this.uiService.getStopLossPrice();
    const currentPrice = this.currentPriceService.lastPrice;
    const limitOrderPrice = this.uiService.getLimitPrice();

    const isLimitOrder = this.uiService.getPriceInputs().length && this.priceService.price !== null;
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

  public init() {
    this.loop.on('tick', () => {
      this.setAmount();
    });
  }
}
