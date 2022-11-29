import { singleton } from 'tsyringe';
import { omit } from 'lodash';
import BaseService from '../base/base.service';
import { Loop } from '../core/loop';
import { log } from '../lib/log';

const IFRAME_SELECTOR = '.tv-chart-box > iframe[name*="tradingview_"]';

@singleton()
export class TradingviewIframeService extends BaseService {
  pressedKeys: Record<string, boolean> = {};

  lastPrice: number | null = null;

  constructor(private readonly loop: Loop) {
    super();
  }

  public setupListeners() {
    window.addEventListener('message', (e) => {
      if (e.data.$key === 'OKX_TRADINGVIEW') {
        this.handleMessage(omit(e.data, '$key'));
      }
    });

    this.loop.on('tick', () => {
      this.patchIframe();
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

  private patchIframe() {
    const iframe = document.querySelector<HTMLIFrameElement>(IFRAME_SELECTOR);

    if (iframe && !iframe.getAttribute('data-okx-patched')) {
      log('Patch tradingview iframe');

      iframe.setAttribute('data-okx-patched', 'true');
      iframe.onmouseover = () => {
        iframe.focus();
      };
    }
  }
}
