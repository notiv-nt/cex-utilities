import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { UserConfig } from '../config/user.config';
import { Loop } from '../core/loop';
import { parsePriceInput } from '../lib';
import { TradingviewIframeService } from './tradingview-iframe.service';
import { OrderTypePanel } from './ui/panels/order-type.panel';
import { UiService } from './ui/ui.service';

@singleton()
export class PriceService extends BaseService {
  public price: null | number = null;

  constructor(
    private readonly loop: Loop,
    private readonly uiService: UiService,
    private readonly tradingviewIframeService: TradingviewIframeService,
    private readonly userConfig: UserConfig,
    private readonly orderTypePanel: OrderTypePanel,
  ) {
    super();

    this.orderTypePanel.on('change-tab', this.onOrderTabChange);
  }

  onOrderTabChange = (tab) => {
    const input = this.uiService.getPriceInput();

    if (input && ['LIMIT', 'ADVANCED_LIMIT'].includes(tab)) {
      this.price = parseFloat(input.value) || null;
    } else {
      this.price = null;
    }
  };

  public watchPrice() {
    this.loop.on('tick', () => {
      if (!this.uiService.getPriceInput()) {
        this.price = null;
        return;
      }

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

  public getLimitPrice() {
    return parsePriceInput(this.uiService.getPriceInput());
  }
}
