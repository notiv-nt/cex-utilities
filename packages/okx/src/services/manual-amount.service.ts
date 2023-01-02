import { singleton } from 'tsyringe';
import BaseService from '../../../shared/src/base/base.service';
import { Loop } from '../../../shared/src/base/loop';
import { log } from '../../../shared/src/lib';
import { AmountService } from '../../../shared/src/services/amount.service';

@singleton()
export class ManualAmountService extends BaseService {
  private uiButton!: HTMLDivElement;

  constructor(private readonly loop: Loop, private readonly amountService: AmountService) {
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
    button.setAttribute(
      'style',
      `
      margin-left: auto;
      color: ${this.amountService.manual ? '#0569ff' : 'gray'};
      cursor: pointer;
      border-bottom: 1px dashed;
      line-height: 1;
      order: 9;
    `,
    );
    button.setAttribute('data-amount-button', '42');
    label.appendChild(button);

    button.addEventListener('click', () => {
      this.switchMode();
    });

    this.uiButton = button;
  }

  private switchMode() {
    log('Change amount mode', this.amountService.manual ? 'auto' : 'manual');

    this.amountService.manual = !this.amountService.manual;
    this.updateUiButton();
  }

  private updateUiButton() {
    if (this.uiButton) {
      this.uiButton.style.color = this.amountService.manual ? '#0569ff' : 'gray';
    }
  }
}
