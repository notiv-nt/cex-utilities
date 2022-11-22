export type IUserConfig = {
  max_risk: number;
  maker_fee: number;
  taker_fee: number;
  auto_open_market_tab: boolean;
  sl_hold_key: OrderHoldKey;
  price_hold_key: OrderHoldKey;
  hide_balance: boolean;
};

export type OrderHoldKey = 'Shift' | 'Control' | 'Alt' | 'Meta';

export type OrderTabs = 'MARKET' | 'LIMIT' | 'STOP' | 'TRAILING_STOP' | 'ADVANCED_LIMIT';
