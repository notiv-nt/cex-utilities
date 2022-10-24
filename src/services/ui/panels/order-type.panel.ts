import { singleton } from 'tsyringe';

const PANEL_TABS = '.place-order-inner-common .okui-tabs-pane-list-flex > .okui-tabs-pane';
const marketTexts = ['market', 'маркет', 'marché'];

@singleton()
export class OrderTypePanel {
  public openMarketTab() {
    const tabs = document.querySelectorAll<HTMLDivElement>(PANEL_TABS);

    tabs.forEach((tab) => {
      const label = String(tab.innerText).toLowerCase();

      if (marketTexts.includes(label)) {
        tab.click();
      }
    });
  }
}
