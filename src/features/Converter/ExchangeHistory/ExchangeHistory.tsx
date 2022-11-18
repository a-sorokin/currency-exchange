import s from "./ExchangeHistory.module.scss";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAppStore } from "store/store";
import { TExchangeHistoryPeriod } from "types";
import { ExchangeHistoryTable } from "features/Converter/ExchangeHistory/Tables/ExchangeHistoryTable";
import { StatisticsTable } from "features/Converter/ExchangeHistory/Tables/StatisticsTable";
import { ChangeType } from "features/Converter/ExchangeHistory/ChangeType/ChangeType";

const PERIODS = ["7", "14", "30"];

export const ExchangeHistory = () => {
  const { exchangeHistoryPeriod, setExchangeHistoryPeriod } = useAppStore(
    (state) => ({
      exchangeHistoryPeriod: state.exchangeHistoryPeriod,
      setExchangeHistoryPeriod: state.setExchangeHistoryPeriod,
    })
  );
  const [period, setPeriod] = useState(exchangeHistoryPeriod);
  const changePeriod = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value as TExchangeHistoryPeriod);
  }, []);

  useEffect(() => {
    setExchangeHistoryPeriod(period);
  }, [period]);

  return (
    <div className={s.exchangeHistory}>
      <div className={s.title}>Exchange History</div>

      <div className={s.selectors}>
        <div className={s.selector}>
          <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              From
            </InputLabel>
            <NativeSelect
              value={period}
              inputProps={{ name: "from" }}
              onChange={changePeriod}
            >
              {PERIODS.map((period) => (
                <option key={period} value={period}>
                  {period} days
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>

        <ChangeType className={s.type} />
      </div>

      <div className={s.tables}>
        <div>
          <ExchangeHistoryTable />
        </div>
        <div>
          <StatisticsTable />
        </div>
      </div>
    </div>
  );
};
