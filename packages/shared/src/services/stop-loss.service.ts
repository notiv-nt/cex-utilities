import type { IUiService } from '../contracts/ui.service';
import { Loop } from '../base/loop';
import { inject, singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { SymbolService } from './symbol.service';
import { TradingviewIframeService } from './tradingview-iframe.service';
import { UserConfig } from '../config/user.config';
import { TOKENS } from '../constants';

@singleton()
export class StopLossService extends BaseService {
  public stopLoss: null | number = null;

  constructor(
    private readonly loop: Loop,
    @inject(TOKENS.UI_SERVICE) private readonly uiService: IUiService,
    private readonly symbolService: SymbolService,
    private readonly tradingviewIframeService: TradingviewIframeService,
    private readonly userConfig: UserConfig,
  ) {
    super();

    this.symbolService.on('change', () => {
      this.stopLoss = null;
    });
  }

  public init() {
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
