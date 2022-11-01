import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { UserConfig } from '../config/user.config';
import { Loop } from '../core/loop';
import { SymbolService } from './symbol.service';
import { TradingviewIframeService } from './tradingview-iframe.service';
import { OrderTypePanel } from './ui/panels/order-type.panel';
import { UiService } from './ui/ui.service';

@singleton()
export class StopLossService extends BaseService {
  public stopLoss: null | number = null;

  constructor(
    private readonly loop: Loop,
    private readonly uiService: UiService,
    private readonly symbolService: SymbolService,
    private readonly tradingviewIframeService: TradingviewIframeService,
    private readonly userConfig: UserConfig,
    private readonly orderTypePanel: OrderTypePanel,
  ) {
    super();

    this.orderTypePanel.on('change-tab', () => {
      setTimeout(() => {
        this.uiService.changeStopLossInput(this.stopLoss as number);
      }, 20);
    });

    this.symbolService.on('change', () => {
      this.stopLoss = null;
    });
  }

  public watchStopLoss() {
    this.loop.on('tick', () => {
      let stopLoss: null | number = null;
      const key = this.userConfig.config.sl_hold_key || 'Shift';

      if (this.tradingviewIframeService.pressedKeys[key] && this.tradingviewIframeService.lastPrice !== null) {
        stopLoss = this.tradingviewIframeService.lastPrice;
      }

      if (stopLoss !== null && this.stopLoss !== stopLoss) {
        this.stopLoss = stopLoss;
        this.uiService.changeStopLossInput(stopLoss);
        this.emit('change', stopLoss);
      }
    });
  }
}
