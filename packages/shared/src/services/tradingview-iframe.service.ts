import { singleton } from 'tsyringe';
import { omit } from 'lodash';
import BaseService from '../base/base.service';

@singleton()
export class TradingviewIframeService extends BaseService {
  pressedKeys: Record<string, boolean> = {};

  lastPrice: number | null = null;

  public init() {
    window.addEventListener('message', (e) => {
      if (e.data.$key === '__TRADINGVIEW_utilities') {
        this.handleMessage(omit(e.data, '$key'));
      }
    });
  }

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
