import { inject, singleton } from 'tsyringe';
import { TOKENS } from '../../../shared/src/constants';
import type { IUiService } from '../../../shared/src/contracts/ui.service';
import { PriceService } from '../../../shared/src/services/price.service';
import { StopLossService } from '../../../shared/src/services/stop-loss.service';
import { TakeProfitService } from '../../../shared/src/services/take-profit.service';
import { LIMIT_TAB_TEXTS } from '../constants';
import { OrderTypePanel } from '../panels/order-type.panel';

@singleton()
export class GodService {
  constructor(
    @inject(TOKENS.UI_SERVICE) private readonly uiService: IUiService,
    private readonly orderTypePanel: OrderTypePanel,
    private readonly stopLossService: StopLossService,
    private readonly takeProfitService: TakeProfitService,
    private readonly priceService: PriceService,
  ) {}

  public init() {
    // TODO: where?
    this.orderTypePanel.on('change-tab', (tab: string) => {
      setTimeout(() => {
        if (this.stopLossService.stopLoss !== null) {
          this.uiService.changeStopLossInput(this.stopLossService.stopLoss);
        }

        if (this.takeProfitService.price !== null) {
          this.uiService.changeTakeProfitInput(this.takeProfitService.price);
        }

        const isLimitTab = [...LIMIT_TAB_TEXTS].includes(tab);
        if (this.priceService.price !== null && isLimitTab) {
          this.uiService.changePriceInput(this.priceService.price);
        }
      }, 100);
    });
  }
}
