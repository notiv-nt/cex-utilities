import { singleton } from 'tsyringe';
import { Loop } from './core/loop';
import { AmountService } from './services/amount.service';
import { CurrentPriceService } from './services/current-price.service';
import { OrderTypePanel } from './services/panels/order-type.panel';
import { SlTpPanel } from './services/panels/sl-tp.panel';
import { ShortcutsService } from './services/shortcuts.service';
import { StopLossService } from './services/stop-loss.service';
import { SymbolService } from './services/symbol.service';

@singleton()
export class App {
  constructor(
    private readonly loop: Loop,
    private readonly symbolService: SymbolService,
    private readonly stopLossService: StopLossService,
    private readonly shortcutsService: ShortcutsService,
    private readonly orderTypePanel: OrderTypePanel,
    private readonly slTpPanel: SlTpPanel,
    private readonly currentPriceService: CurrentPriceService,
    private readonly amountService: AmountService,
  ) {}

  start() {
    this.loop.start();
    this.symbolService.watchSymbol();
    this.shortcutsService.setupListeners();
    this.stopLossService.watchStopLoss();
    this.orderTypePanel.autoOpenMarketTab();
    this.slTpPanel.autoEnableStopLoss();
    this.currentPriceService.watchCurrentPrice();
    this.amountService.watchAmount();
  }
}
