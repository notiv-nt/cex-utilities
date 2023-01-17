// prettier-ignore
function waitFor(t,i){const n=()=>{if(t())return i();requestAnimationFrame(n)};n()}

const sendMessage = (data) => parent.postMessage({ $key: '__TRADINGVIEW_utilities', ...data }, '*');

document.addEventListener('keydown', (e) => sendMessage({ keydown: e.key }));
document.addEventListener('keyup', (e) => sendMessage({ keyup: e.key }));

waitFor(
  () => window.tradingViewApi,
  () => {
    tradingViewApi
      .chart()
      .crossHairMoved({})
      .subscribe({}, (e) => sendMessage({ price: e.price, messageType: 'crosshair' }));
  },
);
