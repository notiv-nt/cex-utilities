tradingViewApi.chart().crossHairMoved((e) => {
  sendMessage({
    price: e.price,
    messageType: 'crosshair',
  });
});

document.addEventListener('keydown', (e) => {
  sendMessage({ keydown: e.key });
});

document.addEventListener('keyup', (e) => {
  sendMessage({ keyup: e.key });
});

function sendMessage(data) {
  let message = {
    $key: 'OKX_TRADINGVIEW',
    ...data,
  };

  parent.postMessage(message, '*');
}

setTimeout(() => {
  const indicator = document.querySelector('.pane-legend .pane-legend-icon-container .pane-legend-icon.icon-hide');
  if (indicator) {
    indicator.click();
  }
}, 2000);
