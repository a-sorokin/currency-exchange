import create from "zustand";
import {
  TCurrencies,
  TExchangeHistory,
  TExchangeHistoryPeriod,
  TRates,
  TTabs,
} from "types";
import { CURRENCIES, TABS } from "constants";
import { getConvertData, getRatesHistory } from "http/http";

interface TState {
  tabUsed: TTabs;
  currencies: TCurrencies;
  rates: TRates | null;
  isLoading: boolean;
  exchangeHistoryPeriod: TExchangeHistoryPeriod;
  exchangeHistory: TExchangeHistory | null;

  changeTab: (tab: TTabs) => void;
  useCurrency: (currency: keyof TCurrencies) => void;
  convert: (
    from: keyof TCurrencies,
    to: keyof TCurrencies,
    amount: number
  ) => void;
  setExchangeHistoryPeriod: (period: TExchangeHistoryPeriod) => void;
}

export const useAppStore = create<TState>((set) => ({
  tabUsed: TABS.CONVERTER,
  currencies: CURRENCIES,
  rates: null,
  isLoading: false,
  exchangeHistoryPeriod: "7",
  exchangeHistory: null,

  changeTab: (tab: TTabs) => set(() => ({ tabUsed: tab })),
  useCurrency: (currency: keyof TCurrencies) =>
    set((state) => ({
      currencies: { ...state.currencies, [currency]: { isUsed: true } },
    })),
  convert: (from: keyof TCurrencies, to: keyof TCurrencies, amount: number) => {
    if (!amount) return;
    set(() => ({ isLoading: true }));
    getConvertData(from, to, amount).then((data) =>
      set(() => ({
        rates: {
          amount: data.query.amount,
          result: data.result,
          rate: data.info.rate,
          from: data.query.from,
          to: data.query.to,
        },
        isLoading: false,
      }))
    );
  },
  setExchangeHistoryPeriod: (period: TExchangeHistoryPeriod) => {
    set(() => ({ exchangeHistoryPeriod: period }));
    set((state) => {
      if (!state.rates) return {};
      getRatesHistory(period, state.rates.from, state.rates.to).then((data) => {
        // @ts-ignore
        const history: TExchangeHistory = Object.entries(data.rates).map(
          // @ts-ignore
          ([key, value]) => ({ date: key, rate: value[state.rates.to] })
        );

        set(() => ({ exchangeHistory: history }));
      });
      return {};
    });
  },
}));
