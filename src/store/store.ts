import create from "zustand";
import { TCurrencies, TRates, TTabs } from "types";
import { CURRENCIES, TABS } from "constants";
import { getConvertData } from "http/http";

interface TState {
  tabUsed: TTabs;
  currencies: TCurrencies;
  rates: TRates | null;
  changeTab: (tab: TTabs) => void;
  useCurrency: (currency: keyof TCurrencies) => void;
  convert: (
    from: keyof TCurrencies,
    to: keyof TCurrencies,
    amount: number
  ) => void;
}

export const useAppStore = create<TState>((set) => ({
  tabUsed: TABS.CONVERTER,
  currencies: CURRENCIES,
  rates: null,
  changeTab: (tab: TTabs) => set(() => ({ tabUsed: tab })),
  useCurrency: (currency: keyof TCurrencies) =>
    set((state) => ({
      currencies: { ...state.currencies, [currency]: { isUsed: true } },
    })),
  convert: (from: keyof TCurrencies, to: keyof TCurrencies, amount: number) => {
    if (!amount) return;
    getConvertData(from, to, amount).then((data) =>
      set(() => ({
        rates: {
          amount: data.query.amount,
          result: data.result,
          rate: data.info.rate,
          from: data.query.from,
          to: data.query.to,
        },
      }))
    );
  },
}));
