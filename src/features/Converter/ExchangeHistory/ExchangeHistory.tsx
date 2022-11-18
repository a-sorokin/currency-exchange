import { lazy, Suspense } from "react";
import s from "./ExchangeHistory.module.scss";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAppStore } from "store/store";
import { TExchangeHistoryPeriod, TStatisticsType } from "types";
import { ExchangeHistoryTable } from "features/Converter/ExchangeHistory/Tables/ExchangeHistoryTable";
import { StatisticsTable } from "features/Converter/ExchangeHistory/Tables/StatisticsTable";
import { ChangeType } from "features/Converter/ExchangeHistory/ChangeType/ChangeType";
import { PERIODS, STATISTICS_TYPES } from "constants";

const Chart = lazy(() => import("./Chart/Chart"));

export const ExchangeHistory = () => {
  const {
    exchangeHistoryPeriod,
    setExchangeHistoryPeriod,
    statisticsType,
    setStatisticsType,
  } = useAppStore((state) => ({
    exchangeHistoryPeriod: state.exchangeHistoryPeriod,
    setExchangeHistoryPeriod: state.setExchangeHistoryPeriod,
    statisticsType: state.statisticsType,
    setStatisticsType: state.setStatisticsType,
  }));

  const [period, setPeriod] = useState(exchangeHistoryPeriod);

  const changePeriod = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value as TExchangeHistoryPeriod);
  }, []);
  const changeType = useCallback((type: TStatisticsType) => {
    // @ts-ignore
    setStatisticsType(STATISTICS_TYPES[type]);
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

        <ChangeType
          className={s.type}
          type={statisticsType}
          changeType={changeType}
        />
      </div>

      {statisticsType === STATISTICS_TYPES.Table ? (
        <div className={s.tables}>
          <div>
            <ExchangeHistoryTable />
          </div>
          <div>
            <StatisticsTable />
          </div>
        </div>
      ) : null}

      {statisticsType === STATISTICS_TYPES.Chart ? (
        <Suspense fallback={<div>Loading...</div>}>
          <div className={s.tables}>
            <div className={s.chart}>
              <Chart />
            </div>
            <div>
              <StatisticsTable />
            </div>
          </div>
        </Suspense>
      ) : null}
    </div>
  );
};
