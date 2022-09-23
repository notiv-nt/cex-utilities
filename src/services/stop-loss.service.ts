import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { Loop } from '../core/loop';
import { SymbolService } from './symbol.service';
import { TradingviewIframeService } from './tradingview-iframe.service';
import { UiService } from './ui/ui.service';

@singleton()
export class StopLossService extends BaseService {
  public stopLoss: null | number = null;

  constructor(
    private readonly loop: Loop,
    private readonly uiService: UiService,
    private readonly symbolService: SymbolService,
    private readonly tradingviewIframeService: TradingviewIframeService,
  ) {
    super();

    this.symbolService.on('change', () => {
      this.stopLoss = null;
    });
  }

  public watchStopLoss() {
    this.loop.on('tick', () => {
      let stopLoss: null | number = null;

      if (this.tradingviewIframeService.pressedKeys.Shift && this.tradingviewIframeService.lastPrice !== null) {
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
