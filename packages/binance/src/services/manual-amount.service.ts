import { singleton } from 'tsyringe';
import BaseService from '../../../shared/src/base/base.service';
import { Loop } from '../../../shared/src/base/loop';
import { log } from '../../../shared/src/lib';
import { AmountService } from '../../../shared/src/services/amount.service';

const AMOUNT_INPUT_SELECTOR = '[name="orderForm"] [name="unitAmount"]';

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
    return !document.querySelector('[data-amount-button="42"]');
  }

  private addButton() {
    const root = document.querySelector(AMOUNT_INPUT_SELECTOR)?.parentElement?.parentElement;
    if (!root) {
      return;
    }

    const button = document.createElement('div');
    button.innerText = 'manual';
    button.setAttribute(
      'style',
      `
      color: ${this.amountService.manual ? '#0569ff' : 'gray'};
      cursor: pointer;
      line-height: 1;
      background: #fff;
      text-align: right;
      margin-left: auto;
    `,
    );
    button.setAttribute('data-amount-button', '42');
    root.appendChild(button);

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
