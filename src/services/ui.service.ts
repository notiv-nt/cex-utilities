import BaseService from '../base/base.service';

class UiService extends BaseService {
  forceStopLossOpen() {
    const loop = () => {
      if (!this.isAlive) {
        return;
      }

      this.openStopLossPanel();
      requestAnimationFrame(loop);
    };

    loop();
  }

  openStopLossPanel() {
    const stops = document.querySelectorAll<HTMLLabelElement>('.place-order-stop-selector label');

    stops.forEach((label) => {
      const text = String(label.innerText).toLowerCase();

      if (text === 'stop loss') {
        const checkbox = label.querySelector<HTMLInputElement>('input[type=checkbox]');

        if (checkbox && checkbox.checked !== true) {
          checkbox.click();
        }
      }
    });
  }

  openMarketPanel() {
    const tabs = document.querySelectorAll<HTMLDivElement>(
      '.place-order-inner-common .okui-tabs-pane-list-flex > .okui-tabs-pane',
    );

    tabs.forEach((tab) => {
      const label = String(tab.innerText).toLowerCase();

      if (label === 'market') {
        tab.click();
      }
    });
  }
}

export default new UiService();
