import { TCurrencies } from "types";
import { getFormattedDate } from "http/utils";

export const getConvertData = (
  from: keyof TCurrencies,
  to: keyof TCurrencies,
  amount: number
) => {
  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
  return fetch(url).then((response) => response.json());
};

export const getRatesHistory = (
  period: string,
  from: keyof TCurrencies,
  to: keyof TCurrencies
) => {
  const startDate = getFormattedDate(period);
  const endDate = getFormattedDate();
  const urlProps = `start_date=${startDate}&end_date=${endDate}&base=${from}&symbols=${from},${to}`;
  const url = `https://api.exchangerate.host/timeseries?${urlProps}`;

  return fetch(url).then((response) => response.json());
};
