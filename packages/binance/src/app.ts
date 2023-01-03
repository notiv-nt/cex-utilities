import { container, injectable } from 'tsyringe';
import { BaseApp } from '../../shared/src/base/base-app';
import { UserConfig } from '../../shared/src/config/user.config';
import { OrderTypePanel } from './panels/order-type.panel';
import { GodService } from './services/god.service';
import { ManualAmountService } from './services/manual-amount.service';

@injectable()
export class App {
  constructor(
    private readonly baseApp: BaseApp,
    private readonly orderTypePanel: OrderTypePanel,
    private readonly godService: GodService,
    private readonly manualAmountService: ManualAmountService,
  ) {}

  async start() {
    await this.baseApp.start();

    this.orderTypePanel.init();
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
  }
}
