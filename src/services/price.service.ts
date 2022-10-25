import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { UserConfig } from '../config/user.config';
import { Loop } from '../core/loop';
import { TradingviewIframeService } from './tradingview-iframe.service';
import { UiService } from './ui/ui.service';

@singleton()
export class PriceService extends BaseService {
  public price: null | number = null;

  constructor(
    private readonly loop: Loop,
    private readonly uiService: UiService,
    private readonly tradingviewIframeService: TradingviewIframeService,
    private readonly userConfig: UserConfig,
  ) {
    super();
  }

  public watchPrice() {
    this.loop.on('tick', () => {
      let price: null | number = null;
      const key = this.userConfig.config.price_hold_key || 'Alt';

      if (this.tradingviewIframeService.pressedKeys[key] && this.tradingviewIframeService.lastPrice !== null) {
        price = this.tradingviewIframeService.lastPrice;
      }

      if (price !== null && this.price !== price) {
        this.price = price;
        this.uiService.changePriceInput(price);
        this.emit('change', price);
      }
    });
  }
}
