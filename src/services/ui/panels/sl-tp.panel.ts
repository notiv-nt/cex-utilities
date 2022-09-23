import { singleton } from 'tsyringe';
import { Loop } from '../../../core/loop';
import { SymbolService } from '../../symbol.service';

const ORDER_TYPE_TABS = '.place-order-stop-selector label';
const stopLossTexts = ['stop loss', 'стоп-лосс', 'arrêter les pertes'];

@singleton()
export class SlTpPanel {
  constructor(private readonly loop: Loop, private readonly symbolService: SymbolService) {
    // TODO: change to events
    this.loop.on('tick', () => {
      this.enableStopLoss();
    });
  }

  public autoEnableStopLoss() {
    this.symbolService.on('change', () => {
      this.enableStopLoss();
    });
  }

  public enableStopLoss() {
    const stops = document.querySelectorAll<HTMLLabelElement>(ORDER_TYPE_TABS);

    stops.forEach((label) => {
      const text = String(label.innerText).toLowerCase();

      if (stopLossTexts.includes(text)) {
        const checkbox = label.querySelector<HTMLInputElement>('input[type=checkbox]');

        if (checkbox && checkbox.checked !== true) {
          checkbox.click();
        }
      }
    });
  }
}
