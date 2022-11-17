import { CURRENCIES, TABS } from "constants";

export type TTabs = typeof TABS[keyof typeof TABS];

export type TCurrencies = typeof CURRENCIES;

export type TRates = {
  amount: number;
  result: number;
  rate: number;
  from: keyof TCurrencies;
  to: keyof TCurrencies;
};
