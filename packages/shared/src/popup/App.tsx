import { useEffect, useState } from 'react';
import { defaultConfig, OrderHoldKey } from '../config/default-config';
import { META_KEYS } from '../constants';

export function App() {
  const [config, setConfig] = useState({ ...defaultConfig });

  useEffect(() => {
    void loadConfig();
  }, []);

  function save(newConfig: any) {
    console.log('save config');
    console.log(newConfig);
    chrome.storage.local.set({ config: newConfig });
  }

  async function loadConfig() {
    const storage = await chrome.storage.local.get('config');

    console.log('load config', storage.config);

    if (!storage.config) {
      return;
    }

    for (const [key, value] of Object.entries(storage.config)) {
      if (key in config) {
        // @ts-expect-error
        config[key] = value;
        setConfig({ ...config });
      }
    }
  }

  function onChange(event: any) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.type === 'number') {
      value = parseFloat(value);
    }

    const newConfig = {
      ...config,
      [name]: value,
    };

    setConfig(newConfig);
    save(newConfig);
  }

  return (
    <>
      <div className="bg-black text-white py-1 px-2 font-semibold">config</div>

      <form className="p-2" onSubmitCapture={save}>
        <label className="block mb-2">
          <div className="form-label">Max Risk</div>
          <input
            type="number"
            className="form-input"
            name="max_risk"
            value={config.max_risk}
            onInput={onChange}
            step="0.1"
          />
        </label>

        <label className="block mb-2">
          <div className="form-label">Maker fee</div>
          <input
            type="number"
            className="form-input"
            name="maker_fee"
            value={config.maker_fee}
            onInput={onChange}
            step="0.01"
          />
        </label>

        <label className="block mb-2">
          <div className="form-label">Taker fee</div>
          <input
            type="number"
            className="form-input"
            name="taker_fee"
            value={config.taker_fee}
            onInput={onChange}
            step="0.01"
          />
        </label>

        <label className="block mb-2">
          <div className="form-label">Stop-Loss key</div>

          <select className="form-input" name="sl_hold_key" value={config.sl_hold_key} onChange={onChange}>
            {META_KEYS.map((key) => (
              <option
                value={key}
                key={key}
                disabled={[config.price_hold_key, config.tp_hold_key].includes(key as OrderHoldKey)}
              >
                {key}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          <div className="form-label">Take-profit key</div>

          <select className="form-input" name="tp_hold_key" value={config.tp_hold_key} onChange={onChange}>
            {META_KEYS.map((key) => (
              <option
                value={key}
                key={key}
                disabled={[config.sl_hold_key, config.price_hold_key].includes(key as OrderHoldKey)}
              >
                {key}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          <div className="form-label">Enter price key</div>

          <select className="form-input" name="price_hold_key" value={config.price_hold_key} onChange={onChange}>
            {META_KEYS.map((key) => (
              <option
                value={key}
                key={key}
                disabled={[config.sl_hold_key, config.tp_hold_key].includes(key as OrderHoldKey)}
              >
                {key}
              </option>
            ))}
          </select>
        </label>

        <label className="mb-2 flex items-center">
          <input
            type="checkbox"
            name="auto_open_market_tab"
            checked={config.auto_open_market_tab}
            onChange={onChange}
          />
          <span className="ml-1">Auto open market tab</span>
        </label>

        <label className="mb-2 flex items-center">
          <input type="checkbox" name="hide_balance" checked={config.hide_balance} onChange={onChange} />
          <span className="ml-1">Hide balance</span>
        </label>

        <label className="mb-2 flex items-center">
          <input type="checkbox" name="include_fees" checked={config.include_fees} onChange={onChange} />
          <span className="ml-1">Include fees in order amount</span>
        </label>
      </form>
    </>
  );
}
