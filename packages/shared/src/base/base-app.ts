import { container, injectable } from 'tsyringe';
import { UserConfig } from '../config/user.config';
import { TOKENS } from '../constants';
import { IUiService } from '../contracts/ui.service';
import { AmountService } from '../services/amount.service';
import { CurrentPriceService } from '../services/current-price.service';
import { PriceService } from '../services/price.service';
import { StopLossService } from '../services/stop-loss.service';
import { SymbolService } from '../services/symbol.service';
import { TakeProfitService } from '../services/take-profit.service';
import { TradingviewIframeService } from '../services/tradingview-iframe.service';
import { StyleService } from '../ui/style.service';
import { Loop } from './loop';

@injectable()
export class BaseApp {
  constructor(
    private readonly loop: Loop,
    private readonly userConfig: UserConfig,
    private readonly symbolService: SymbolService,
    private readonly tradingviewIframeService: TradingviewIframeService,
    private readonly stopLossService: StopLossService,
    private readonly takeProfitService: TakeProfitService,
    private readonly currentPriceService: CurrentPriceService,
    private readonly priceService: PriceService,
    private readonly amountService: AmountService,
    private readonly styleService: StyleService,
  ) {}

  async start() {
    this.loop.start();

    await this.userConfig.loadConfig();

    this.symbolService.init();
    this.tradingviewIframeService.init();
    this.stopLossService.init();
    this.takeProfitService.init();
    this.currentPriceService.init();
    this.styleService.init();
    this.priceService.init();
    this.amountService.init();

    const uiService = container.resolve<IUiService>(TOKENS.UI_SERVICE);
    uiService.init();
  }
}
