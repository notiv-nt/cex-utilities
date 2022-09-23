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
import { log } from './lib/log';

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
  ) {}

  async start() {
    this.loop.start();

    log('Loading config...');
    const cfg = await this.userConfig.loadConfig();
    log('Config loaded', cfg);

    log('Loading rest...');
    this.symbolService.watchSymbol();
    this.stopLossService.watchStopLoss();
    this.orderTypePanel.autoOpenMarketTab();
    this.slTpPanel.autoEnableStopLoss();
    this.currentPriceService.watchCurrentPrice();
    this.amountService.watchAmount();
    this.tradingviewIframeService.setupListeners();
  }
}
