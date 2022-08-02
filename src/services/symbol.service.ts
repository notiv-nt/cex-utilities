import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { Loop } from '../core/loop';
import { UiService } from './ui.service';

@singleton()
export class SymbolService extends BaseService {
  private symbol: string | null = null;

  constructor(private readonly loop: Loop, private readonly uiService: UiService) {
    super();
  }

  public watchSymbol() {
    this.loop.on('tick', () => {
      const symbol = this.uiService.getSymbol();
      const lastPrice = this.uiService.getLastPriceFromTopBar();

      if (symbol && symbol !== this.symbol && lastPrice) {
        this.symbol = symbol;
        this.emit('change', symbol);
      }
    });
  }
}
