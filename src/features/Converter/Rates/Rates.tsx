import s from "./Rates.module.scss";
import { useAppStore } from "store/store";

const round = (num: number) => Math.round(num * 1000) / 1000;

export const Rates = () => {
  // const rates = useAppStore((state) => state.rates);
  const rates = {
    amount: 123,
    result: 127.596206,
    rate: 1.037368,
    from: "EUR",
    to: "USD",
  };
  return (
    <div className={s.rates}>
      <div>
        <span>
          {rates.amount} {rates.from}
        </span>
        <span> = </span>
        <span>
          {round(rates.result)} {rates.to}
        </span>
      </div>
    </div>
  );
};
