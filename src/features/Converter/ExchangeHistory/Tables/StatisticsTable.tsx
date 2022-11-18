import { useAppStore } from "store/store";
import { BaseTable } from "features/Converter/ExchangeHistory/Tables/BaseTable";
import { useMemo } from "react";

const round = (num: number) => Math.round(num * 1000000) / 1000000;

export const StatisticsTable = () => {
  const exchangeHistory = useAppStore((state) => state.exchangeHistory);

  const data = useMemo(() => {
    if (!exchangeHistory) return [];

    const lowestRate = exchangeHistory.reduce((acc, curr) => {
      if (curr.rate < acc.rate) return curr;
      return acc;
    }, exchangeHistory[0]).rate;
    const highestRate = exchangeHistory.reduce((acc, curr) => {
      if (curr.rate > acc.rate) return curr;
      return acc;
    }, exchangeHistory[0]).rate;
    const averageRate = round(
      exchangeHistory.reduce((acc, curr) => acc + curr.rate, 0) /
        exchangeHistory.length
    );

    return [
      ["Lowest", lowestRate],
      ["Highest", highestRate],
      ["Average", averageRate],
    ];
  }, [exchangeHistory]);

  if (!exchangeHistory) return null;
  return <BaseTable rows={["Statistics", ""]} data={data} />;
};
