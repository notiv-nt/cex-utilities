import { singleton } from 'tsyringe';
import { SymbolService } from '../../symbol.service';

const PANEL_TABS = '.place-order-inner-common .okui-tabs-pane-list-flex > .okui-tabs-pane';

@singleton()
export class OrderTypePanel {
  constructor(private readonly symbolService: SymbolService) {}

  public autoOpenMarketTab() {
    this.symbolService.on('change', () => {
      this.openMarketTab();
    });
  }

  public openMarketTab() {
    const tabs = document.querySelectorAll<HTMLDivElement>(PANEL_TABS);
    tabs.forEach((tab) => {
      const label = String(tab.innerText).toLowerCase();
      if (label === 'market') {
        tab.click();
      }
    });
  }
}
