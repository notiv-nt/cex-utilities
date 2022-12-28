export type OrderHoldKey = 'Shift' | 'Control' | 'Alt' | 'Meta';

export interface IUserConfig {
  max_risk: number;
  maker_fee: number;
  taker_fee: number;
  auto_open_market_tab: boolean;
  sl_hold_key: OrderHoldKey;
  price_hold_key: OrderHoldKey;
  tp_hold_key: OrderHoldKey;
  hide_balance: boolean;
  include_fees: boolean;
}

export const defaultConfig: IUserConfig = {
  max_risk: 1,
  maker_fee: 0.02,
  taker_fee: 0.05,
  auto_open_market_tab: false,
  sl_hold_key: 'Shift',
  price_hold_key: 'Alt',
  tp_hold_key: 'Control',
  hide_balance: false,
  include_fees: true,
};
