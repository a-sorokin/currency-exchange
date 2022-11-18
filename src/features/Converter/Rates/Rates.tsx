import s from "./Rates.module.scss";
import { useAppStore } from "store/store";

const round = (num: number, decimal: number = 3) => {
  const n = Number("1" + "0".repeat(decimal));
  return Math.round(num * n) / n;
};

export const Rates = () => {
  const rates = useAppStore((state) => state.rates);

  if (!rates) return null;
  return (
    <div className={s.rates}>
      <div className={s.fromTo}>
        <span>
          {rates.amount} {rates.from}
        </span>
        <span> = </span>
        <span className={s.to}>
          {round(rates.result)} {rates.to}
        </span>
      </div>

      <div className={s.currencyRates}>
        <div>
          1 {rates.from} = {rates.rate} {rates.to}
        </div>
        <div>
          1 {rates.to} = {round(1 / rates.rate, 6)} {rates.from}
        </div>
      </div>
    </div>
  );
};
