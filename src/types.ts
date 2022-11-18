import { CURRENCIES, PERIODS, STATISTICS_TYPES, TABS } from "constants";

export type TTabs = typeof TABS[keyof typeof TABS];

export type TCurrencies = typeof CURRENCIES;

export type TRates = {
  amount: number;
  result: number;
  rate: number;
  from: keyof TCurrencies;
  to: keyof TCurrencies;
};

export type TExchangeHistoryPeriod = typeof PERIODS[number];

export type TExchangeHistory = { date: string; rate: number }[];

export type TStatisticsType =
  typeof STATISTICS_TYPES[keyof typeof STATISTICS_TYPES];
