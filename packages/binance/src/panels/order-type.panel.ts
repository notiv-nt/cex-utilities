import { singleton } from 'tsyringe';
import BaseService from '../../../shared/src/base/base.service';
import { Loop } from '../../../shared/src/base/loop';
import { MARKET_TAB_TEXTS } from '../constants';

const PANEL_TABS = '[name="orderForm"] .order-tabs [id*=tab] .tab';
const ACTIVE_TAB_CLASS = 'active';

@singleton()
export class OrderTypePanel extends BaseService {
  currentTab!: string;

  constructor(private readonly loop: Loop) {
    super();
  }

  public openMarketTab() {
    const tabs = document.querySelectorAll<HTMLDivElement>(PANEL_TABS);

    tabs.forEach((tab) => {
      const label = String(tab.innerText).toLowerCase();
      if (MARKET_TAB_TEXTS.find((text) => text.toLowerCase() === label)) {
        tab.click();
      }
    });
  }

  public init() {
    this.loop.on('tick', () => {
      const tabs = document.querySelectorAll<HTMLDivElement>(PANEL_TABS);

      tabs.forEach((tab) => {
        if (tab.classList.contains(ACTIVE_TAB_CLASS)) {
          const newSelectedTab = tab.innerText.toLowerCase();

          if (newSelectedTab && this.currentTab !== newSelectedTab) {
            this.currentTab = newSelectedTab;
            this.emit('change-tab', newSelectedTab);
          }
        }
      });
    });
  }
}
