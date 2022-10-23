import { singleton } from 'tsyringe';
import BaseService from '../../base/base.service';
import { Loop } from '../../core/loop';
import { log } from '../../lib/log';

@singleton()
export class AmountUiService extends BaseService {
  public isManualAmount = false;

  private uiButton: HTMLDivElement;

  constructor(private readonly loop: Loop) {
    super();
  }

  public init() {
    this.loop.on('tick', () => {
      if (this.isStaleButton()) {
        this.addButton();
      }
    });
  }

  private isStaleButton() {
    return !document.querySelector('#leftPoForm [data-amount-button="42"]');
  }

  private addButton() {
    const root = document.querySelector('#leftPoForm .place-order-input-box:has(input[name="size"])');

    if (!root) {
      return;
    }

    const label = root.querySelector<HTMLDivElement>('.input-label-box');

    if (!label) {
      return;
    }

    label.style.display = 'flex';

    const button = document.createElement('div');
    button.innerText = 'manual';
    button.style = `
      margin-left: auto;
      color: ${this.isManualAmount ? '#0569ff' : 'gray'};
      cursor: pointer;
      border-bottom: 1px dashed;
      line-height: 1;
    `;
    button.setAttribute('data-amount-button', '42');
    label.appendChild(button);

    button.addEventListener('click', () => {
      this.switchMode();
    });

    this.uiButton = button;
  }

  private switchMode() {
    log('Change amount mode', this.isManualAmount ? 'auto' : 'manual');

    this.isManualAmount = !this.isManualAmount;
    this.updateUiButton();
  }

  private updateUiButton() {
    if (this.uiButton) {
      this.uiButton.style.color = this.isManualAmount ? '#0569ff' : 'gray';
    }
  }
}
