import { TCurrencies } from "types";

const getConvertUrl = (
  from: keyof TCurrencies,
  to: keyof TCurrencies,
  amount: number
) => {
  return `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
};

export const getConvertData = (
  from: keyof TCurrencies,
  to: keyof TCurrencies,
  amount: number
) => {
  const url = getConvertUrl(from, to, amount);
  return fetch(url).then((response) => response.json());
};
