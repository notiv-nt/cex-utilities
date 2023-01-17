import { container, injectable } from 'tsyringe';
import { OrderTypePanel } from './panels/order-type.panel';
import { SlTpPanel } from './panels/sl-tp.panel';
import { ManualAmountService } from './services/manual-amount.service';
import { GodService } from './services/god.service';
import { BaseApp } from '../../shared/src/base/base-app';
import { UserConfig } from '../../shared/src/config/user.config';

@injectable()
export class App {
  constructor(
    private readonly baseApp: BaseApp,
    private readonly orderTypePanel: OrderTypePanel,
    private readonly slTpPanel: SlTpPanel,
    private readonly manualAmountService: ManualAmountService,
    private readonly godService: GodService,
  ) {}

  async start() {
    await this.baseApp.start();

    this.orderTypePanel.init();
    this.slTpPanel.init();
    this.manualAmountService.init();

    this.godService.init();

    const userConfig = container.resolve(UserConfig);
    // userConfig.clearConfig();
    if (userConfig.config.auto_open_market_tab) {
      // TODO: rewrite this hack:  app.on('ready')
      setTimeout(() => {
        this.orderTypePanel.openMarketTab();
      }, 500);
    }

    // TODO: refactor
    setTimeout(() => {
      const iframe = document.querySelector('iframe[id*=tradingview_]');
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('static/tv-iframe-script.js');
      iframe.contentDocument.querySelector('body').appendChild(script);
    }, 2000);
  }
}
