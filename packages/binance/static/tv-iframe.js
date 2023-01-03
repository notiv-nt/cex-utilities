function injectScript(file_path, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}

const scriptSrc = chrome.runtime.getURL('static/tv-iframe-script.js');

injectScript(scriptSrc, 'body');
