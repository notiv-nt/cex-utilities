import { container, injectable } from 'tsyringe';
import { Loop } from '../../shared/src/base/loop';
import { UserConfig } from '../../shared/src/config/user.config';
import { TOKENS } from '../../shared/src/constants';
import { CurrentPriceService } from '../../shared/src/services/current-price.service';
import { PriceService } from '../../shared/src/services/price.service';
import { StopLossService } from '../../shared/src/services/stop-loss.service';
import { SymbolService } from '../../shared/src/services/symbol.service';
import { AmountService } from '../../shared/src/services/amount.service';
import { TradingviewIframeService } from '../../shared/src/services/tradingview-iframe.service';
import { StyleService } from '../../shared/src/ui/style.service';
import { OrderTypePanel } from './panels/order-type.panel';
import { SlTpPanel } from './panels/sl-tp.panel';
import { ManualAmountService } from './services/manual-amount.service';
import { GodService } from './services/god.service';
import { UiService } from './services/okx-ui.service';
import { TakeProfitService } from '../../shared/src/services/take-profit.service';

@injectable()
export class App {
  constructor(
    private readonly loop: Loop,
    private readonly userConfig: UserConfig,
    private readonly symbolService: SymbolService,
    private readonly tradingviewIframeService: TradingviewIframeService,
    private readonly stopLossService: StopLossService,
    private readonly takeProfitService: TakeProfitService,
    private readonly orderTypePanel: OrderTypePanel,
    private readonly slTpPanel: SlTpPanel,
    private readonly currentPriceService: CurrentPriceService,
    private readonly priceService: PriceService,
    private readonly manualAmountService: ManualAmountService,
    private readonly amountService: AmountService,
    private readonly styleService: StyleService,
    private readonly godService: GodService,
  ) {}

  async start() {
    this.loop.start();

    await this.userConfig.loadConfig();

    this.symbolService.init();
    this.tradingviewIframeService.init();
    this.stopLossService.init();
    this.takeProfitService.init();
    this.orderTypePanel.init();
    this.slTpPanel.init();
    this.currentPriceService.init();
    this.manualAmountService.init();
    this.styleService.init();
    this.priceService.init();
    this.amountService.init();

    this.godService.init();

    const uiService = container.resolve<UiService>(TOKENS.UI_SERVICE);
    uiService.patchIframe();

    // this.userConfig.clearConfig();

    if (this.userConfig.config.auto_open_market_tab) {
      // TODO: rewrite this hack:  app.on('ready')
      setTimeout(() => {
        this.orderTypePanel.openMarketTab();
      }, 500);
    }
  }
}
