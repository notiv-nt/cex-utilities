import { IUserConfig } from '../types';

export const defaultConfig: IUserConfig = {
  max_risk: 1,
  maker_fee: 0.02,
  taker_fee: 0.05,
  auto_open_market_tab: false,
  sl_hold_key: 'Shift',
  price_hold_key: 'Alt',
};
