import { singleton } from 'tsyringe';
import { Loop } from './core/loop';
import { AmountService } from './services/amount.service';
import { CurrentPriceService } from './services/current-price.service';
import { OrderTypePanel } from './services/ui/panels/order-type.panel';
import { SlTpPanel } from './services/ui/panels/sl-tp.panel';
import { StopLossService } from './services/stop-loss.service';
import { SymbolService } from './services/symbol.service';
import { UserConfig } from './config/user.config';
import { TradingviewIframeService } from './services/tradingview-iframe.service';
import { AmountUiService } from './services/ui/amount-ui.service';

@singleton()
export class App {
  constructor(
    private readonly loop: Loop,
    private readonly symbolService: SymbolService,
    private readonly stopLossService: StopLossService,
    private readonly orderTypePanel: OrderTypePanel,
    private readonly slTpPanel: SlTpPanel,
    private readonly currentPriceService: CurrentPriceService,
    private readonly amountService: AmountService,
    private readonly userConfig: UserConfig,
    private readonly tradingviewIframeService: TradingviewIframeService,
    private readonly amountUiService: AmountUiService,
  ) {}

  async start() {
    this.loop.start();

    await this.userConfig.loadConfig();

    this.symbolService.watchSymbol();
    this.stopLossService.watchStopLoss();
    this.slTpPanel.autoEnableStopLoss();
    this.currentPriceService.watchCurrentPrice();
    this.amountService.watchAmount();
    this.tradingviewIframeService.setupListeners();
    this.amountUiService.init();

    if (this.userConfig.config.auto_open_market_tab) {
      this.orderTypePanel.openMarketTab();
    }
  }
}
