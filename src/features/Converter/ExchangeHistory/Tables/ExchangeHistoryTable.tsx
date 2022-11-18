import { BaseTable } from "features/Converter/ExchangeHistory/Tables/BaseTable";
import { useAppStore } from "store/store";
import { useMemo } from "react";

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

export const ExchangeHistoryTable = () => {
  const exchangeHistory = useAppStore((state) => state.exchangeHistory);

  const data = useMemo(() => {
    if (!exchangeHistory) return [];
    return exchangeHistory.map((row) => [formatDate(row.date), row.rate]);
  }, [exchangeHistory]);

  if (!exchangeHistory) return null;
  return <BaseTable rows={["Date", "Exchange rate"]} data={data} />;
};
