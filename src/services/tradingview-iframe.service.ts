import { singleton } from 'tsyringe';
import { omit } from 'lodash';
import BaseService from '../base/base.service';

@singleton()
export class TradingviewIframeService extends BaseService {
  pressedKeys: Record<string, boolean> = {};

  lastPrice: number | null = null;

  public setupListeners() {
    window.addEventListener('message', (e) => {
      if (e.data.$key === 'OKX_TRADINGVIEW') {
        this.handleMessage(omit(e.data, '$key'));
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleMessage(message: any) {
    if (message.keydown) {
      this.pressedKeys[message.keydown] = true;
    }

    if (message.keyup) {
      delete this.pressedKeys[message.keyup];
    }

    if (message.messageType === 'crosshair' && Number.isFinite(message.price)) {
      this.lastPrice = message.price;
    }
  }
}
