export type IUserConfig = {
  max_risk: number;
  maker_fee: number;
  taker_fee: number;
  auto_open_market_tab: boolean;
  sl_hold_key: OrderHoldKey;
  price_hold_key: OrderHoldKey;
};

export type OrderHoldKey = 'Shift' | 'Control' | 'Alt' | 'Meta';
