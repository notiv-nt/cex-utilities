import BaseService from '../base/base.service';

const SYMBOL_PLACEHOLDER = '--';
const SYMBOL_SELECTOR = '#app .watch-drop-box .ticker-title';

class SymbolService extends BaseService {
  private symbol: string | null = null;

  public watchSymbol = () => {
    const symbol = this.querySymbol();

    if (symbol && symbol !== this.symbol && symbol !== SYMBOL_PLACEHOLDER) {
      this.symbol = symbol;
      this.emit('change', symbol);
    }

    if (this.isAlive) {
      requestAnimationFrame(this.watchSymbol);
    }
  };

  private querySymbol(): null | string {
    return document.querySelector<HTMLSpanElement>(SYMBOL_SELECTOR)?.innerText || null;
  }
}

export default new SymbolService();
