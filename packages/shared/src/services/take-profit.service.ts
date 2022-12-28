import type { IUiService } from '../contracts/ui.service';
import { inject, singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { UserConfig } from '../config/user.config';
import { Loop } from '../base/loop';
import { TradingviewIframeService } from './tradingview-iframe.service';
import { TOKENS } from '../constants';

@singleton()
export class TakeProfitService extends BaseService {
  public price: null | number = null;

  constructor(
    private readonly loop: Loop,
    @inject(TOKENS.UI_SERVICE) private readonly uiService: IUiService,
    private readonly tradingviewIframeService: TradingviewIframeService,
    private readonly userConfig: UserConfig,
  ) {
    super();
  }

  public init() {
    this.loop.on('tick', () => {
      let price: null | number = null;
      const key = this.userConfig.config.tp_hold_key || 'Control';

      if (this.tradingviewIframeService.pressedKeys[key] && this.tradingviewIframeService.lastPrice !== null) {
        price = this.tradingviewIframeService.lastPrice;
      }

      if (price !== null && this.price !== price) {
        this.price = price;
        this.uiService.changeTakeProfitInput(price);
        this.emit('change', price);
      }
    });
  }
}
