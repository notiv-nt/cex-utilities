import { singleton } from 'tsyringe';
import { Loop } from '../../../shared/src/base/loop';
import { SymbolService } from '../../../shared/src/services/symbol.service';

const ORDER_TYPE_TABS = '.place-order-stop-selector label';
const stopLossTexts = [
  'tp/sl',
  'stop loss',
  'Стоп-лосс',
  '止损',
  'Arrêter les pertes',
  'Stop-Loss',
  'Zatrzymaj stratę',
].map((i) => i.toLowerCase());

@singleton()
export class SlTpPanel {
  constructor(private readonly loop: Loop, private readonly symbolService: SymbolService) {
    // TODO: change to events
    this.loop.on('tick', () => {
      this.enableStopLoss();
    });
  }

  public init() {
    this.symbolService.on('change', () => {
      this.enableStopLoss();
    });
  }

  public enableStopLoss() {
    const labels = document.querySelectorAll<HTMLLabelElement>(ORDER_TYPE_TABS);

    labels.forEach((label) => {
      const text = String(label.innerText).toLowerCase();

      if (stopLossTexts.includes(text)) {
        const checkbox = label.querySelector<HTMLInputElement>('input[type=checkbox]');

        if (checkbox && !checkbox.checked) {
          checkbox.click();
        }
      }
    });
  }
}
