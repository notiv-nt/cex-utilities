import amountService from './services/amount.service';
import priceService from './services/price.service';
import stopLossService from './services/stop-loss.service';
import symbolService from './services/symbol.service';
import uiService from './services/ui.service';

uiService.forceStopLossOpen();

stopLossService.watchStopLoss();
stopLossService.setupListeners();

priceService.watchPrice();

symbolService.watchSymbol();

amountService.watchAmount();

symbolService.on('change', () => {
  uiService.openMarketPanel();
});

setTimeout(() => {
  uiService.openMarketPanel();
}, 1000);
