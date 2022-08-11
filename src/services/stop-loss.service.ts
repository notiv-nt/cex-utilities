import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { Loop } from '../core/loop';
import { ShortcutsService } from './shortcuts.service';
import { SymbolService } from './symbol.service';
import { UiService } from './ui/ui.service';

@singleton()
export class StopLossService extends BaseService {
  public stopLoss: null | number = null;

  constructor(
    private readonly loop: Loop,
    private readonly uiService: UiService,
    private readonly shortcutsService: ShortcutsService,
    private readonly symbolService: SymbolService,
  ) {
    super();

    this.symbolService.on('change', () => {
      this.stopLoss = null;
    });
  }

  public watchStopLoss() {
    this.loop.on('tick', () => {
      if (!this.shortcutsService.isAltPressed) {
        return;
      }

      const stopLoss = this.uiService.getStopLoss();

      if (stopLoss !== null && this.stopLoss !== stopLoss) {
        this.stopLoss = stopLoss;
        this.uiService.changeStopLossInput(stopLoss);
        this.emit('change', stopLoss);
      }
    });
  }
}
