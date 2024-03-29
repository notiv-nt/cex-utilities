import { singleton } from 'tsyringe';
import BaseService from '../../../shared/src/base/base.service';
import { Loop } from '../../../shared/src/base/loop';
import { MARKET_TAB_TEXTS } from '../constants';

const PANEL_TABS =
  '.place-order-inner-common .okui-tabs-pane-list-container > .okui-tabs-pane-list-flex > .okui-tabs-pane';
const NESTED_TAB_SELECTOR = '.okui-select-text-value > span';
const ACTIVE_TAB_CLASS = 'okui-tabs-pane-underline-active';

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
          const span = tab.querySelector<HTMLSpanElement>(NESTED_TAB_SELECTOR);
          const newSelectedTab = (span ? span.innerText : tab.innerText).toLowerCase();

          if (newSelectedTab && this.currentTab !== newSelectedTab) {
            this.currentTab = newSelectedTab;
            this.emit('change-tab', newSelectedTab);
          }
        }
      });
    });
  }
}
