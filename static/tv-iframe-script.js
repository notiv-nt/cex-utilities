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


(() => {
  function loop() {
    const indicator = document.querySelector('.pane-legend .pane-legend-icon-container .pane-legend-icon.delete');
    if (indicator) {
      indicator.click();
    }
    requestAnimationFrame(loop);
  }

  loop();
})()
