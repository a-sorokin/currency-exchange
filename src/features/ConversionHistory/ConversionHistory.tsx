import s from "./ConversionHistory.module.scss";
import { ConversionTable } from "features/ConversionHistory/ConversionTable/ConversionTable";
import { useCallback, useState } from "react";
import { TCurrencies, THistory } from "types";
import {
  getFromLocalStorage,
  replaceHistoryInLocalStorage,
} from "store/localStorageUtils";
import { useAppStore } from "store/store";
import { TABS } from "constants";

export const ConversionHistory = () => {
  const { changeTab, convert } = useAppStore((state) => ({
    changeTab: state.changeTab,
    convert: state.convert,
  }));
  const [history, setHistory] = useState<THistory>(getFromLocalStorage());

  const removeFromHistory = useCallback(
    (index: number) => {
      const newHistory = [...history];
      newHistory.splice(index, 1);
      setHistory(newHistory);
      replaceHistoryInLocalStorage(newHistory);
    },
    [history]
  );

  const showConvertTab = useCallback(
    (from: keyof TCurrencies, to: keyof TCurrencies, amount: number) => {
      changeTab(TABS.CONVERTER);
      convert(from, to, amount);
    },
    [changeTab, convert]
  );

  return (
    <div className={s.history}>
      <div className={s.title}>Conversion history</div>

      {history.length ? (
        <ConversionTable
          history={history}
          removeFromHistory={removeFromHistory}
          showConvertTab={showConvertTab}
        />
      ) : (
        <div>Empty for now</div>
      )}
    </div>
  );
};
