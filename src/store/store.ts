import create from "zustand";
import {
  TCurrencies,
  TExchangeHistory,
  TExchangeHistoryPeriod,
  TRates,
  TStatisticsType,
  TTabs,
} from "types";
import { CURRENCIES, PERIODS, STATISTICS_TYPES, TABS } from "constants";
import { getConvertData, getRatesHistory } from "http/http";
import { saveToLocalStorage } from "store/localStorageUtils";

interface TState {
  tabUsed: TTabs;
  amount: number | null;
  currencies: TCurrencies;
  rates: TRates | null;
  isLoading: boolean;
  exchangeHistoryPeriod: TExchangeHistoryPeriod;
  exchangeHistory: TExchangeHistory | null;
  statisticsType: TStatisticsType;

  changeTab: (tab: TTabs) => void;
  setAmount: (amount: number) => void;
  setExchangeHistoryPeriod: (period: TExchangeHistoryPeriod) => void;
  setStatisticsType: (type: TStatisticsType) => void;

  convert: (
    from: keyof TCurrencies,
    to: keyof TCurrencies,
    amount: number
  ) => void;
  setExchangeHistory: () => void;
}

export const useAppStore = create<TState>((set, get) => ({
  tabUsed: TABS.CONVERTER,
  amount: null,
  currencies: CURRENCIES,
  rates: null,
  isLoading: false,
  exchangeHistoryPeriod: PERIODS[0],
  exchangeHistory: null,
  statisticsType: STATISTICS_TYPES.Table,

  changeTab: (tab: TTabs) => set(() => ({ tabUsed: tab })),
  setAmount: (amount: number) => set(() => ({ amount })),
  setExchangeHistoryPeriod: (period: TExchangeHistoryPeriod) => {
    set(() => ({ exchangeHistoryPeriod: period }));
    get().setExchangeHistory();
  },
  setStatisticsType: (type: TStatisticsType) => {
    set(() => ({ statisticsType: type }));
  },

  convert: (from: keyof TCurrencies, to: keyof TCurrencies, amount: number) => {
    if (amount !== get().amount) {
      set(() => ({ amount }));
    }
    set(() => ({ isLoading: true }));
    getConvertData(from, to, amount)
      .then((data) => {
        saveToLocalStorage({
          date: new Date().toLocaleString(),
          amount,
          from,
          to,
        });

        set(() => ({
          rates: {
            amount: data.query.amount,
            result: data.result,
            rate: data.info.rate,
            from: data.query.from,
            to: data.query.to,
          },
          isLoading: false,
        }));
      })
      .then(() => {
        get().setExchangeHistory();
      });
  },
  setExchangeHistory: () => {
    const { rates, exchangeHistoryPeriod } = get();
    if (!rates) return {};
    getRatesHistory(exchangeHistoryPeriod, rates.from, rates.to).then(
      (data) => {
        const history: TExchangeHistory = Object.entries(data.rates)
          .map(([key, value]: [key: string, value: any]) => ({
            date: key,
            rate: value[rates.to],
          }))
          .filter((item) => item.rate);

        set(() => ({ exchangeHistory: history }));
      }
    );
  },
}));
