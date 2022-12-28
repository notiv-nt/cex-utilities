import type { IUiService } from '../contracts/ui.service';
import { inject, singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { Loop } from '../base/loop';
import { TOKENS } from '../constants';

@singleton()
export class SymbolService extends BaseService {
  private symbol: string | null = null;

  constructor(private readonly loop: Loop, @inject(TOKENS.UI_SERVICE) private readonly uiService: IUiService) {
    super();
  }

  public init() {
    this.loop.on('tick', () => {
      const symbol = this.uiService.getSymbol();
      const lastPrice = this.uiService.getLastPrice();

      if (symbol && symbol !== this.symbol && lastPrice) {
        this.symbol = symbol;
        this.emit('change', symbol);
      }
    });
  }
}
