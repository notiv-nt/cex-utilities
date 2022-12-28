import { ORDER_TAB_MAP } from '../constants';
import { singleton } from 'tsyringe';
import BaseService from '../../../shared/src/base/base.service';
import { Loop } from '../../../shared/src/base/loop';
import type { OrderTabs } from '../types';

const PANEL_TABS =
  '.place-order-inner-common .okui-tabs-pane-list-container > .okui-tabs-pane-list-flex > .okui-tabs-pane';
const NESTED_TAB_SELECTOR = '.okui-select-text-value > span';
const ACTIVE_TAB_CLASS = 'okui-tabs-pane-underline-active';

@singleton()
export class OrderTypePanel extends BaseService {
  currentTab!: OrderTabs;

  constructor(private readonly loop: Loop) {
    super();
  }

  public openMarketTab() {
    const tabs = document.querySelectorAll<HTMLDivElement>(PANEL_TABS);

    tabs.forEach((tab) => {
      const label = String(tab.innerText).toLowerCase();
      const marketTexts = ORDER_TAB_MAP.MARKET;

      if (marketTexts.find((text) => text.toLowerCase() === label)) {
        tab.click();
      }
    });
  }

  public init() {
    this.loop.on('tick', () => {
      const tabs = document.querySelectorAll<HTMLDivElement>(PANEL_TABS);
      let activeTabText = '';
      let newSelectedTab: OrderTabs | null = null;

      tabs.forEach((tab) => {
        if (!tab.classList.contains(ACTIVE_TAB_CLASS)) {
          return;
        }

        const span = tab.querySelector<HTMLSpanElement>(NESTED_TAB_SELECTOR);
        activeTabText = (span ? span.innerText : tab.innerText).toLowerCase();
      });

      Object.entries(ORDER_TAB_MAP).forEach(([name, texts]) => {
        if (texts.find((text) => text.toLowerCase() === activeTabText)) {
          newSelectedTab = name as OrderTabs;
        }
      });

      if (newSelectedTab && this.currentTab !== newSelectedTab) {
        this.currentTab = newSelectedTab;
        this.emit('change-tab', newSelectedTab);
      }
    });
  }
}
