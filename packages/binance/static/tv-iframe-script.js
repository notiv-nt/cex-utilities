// prettier-ignore
function waitFor(t,i){const n=()=>{if(t())return i();requestAnimationFrame(n)};n()}

waitFor(() => window.tradingViewApi, init);

function init() {
  tradingViewApi
    .chart()
    .crossHairMoved({})
    .subscribe({}, (e) => sendMessage({ price: e.price, messageType: 'crosshair' }));
}

document.addEventListener('keydown', (e) => sendMessage({ keydown: e.key }));
document.addEventListener('keyup', (e) => sendMessage({ keyup: e.key }));

function sendMessage(data) {
  const message = { $key: '__TRADINGVIEW_utilities', ...data };
  parent.postMessage(message, '*');
}

(() => {
  function loop() {
    const indicator = document.querySelector('.pane-legend .pane-legend-icon-container .pane-legend-icon.delete');
    if (indicator) {
      indicator.click();
    }
    requestAnimationFrame(loop);
  }

  loop();
})();
