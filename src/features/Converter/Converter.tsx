import { PickCurrency } from "features/Converter/PickCurrency/PickCurrency";
import { Rates } from "features/Converter/Rates/Rates";
import s from "./Converter.module.scss";
import { ExchangeHistory } from "features/Converter/ExchangeHistory/ExchangeHistory";
import { useAppStore } from "store/store";

export const Converter = () => {
  const { rates, isLoading } = useAppStore((state) => ({
    rates: state.rates,
    isLoading: state.isLoading,
  }));
  return (
    <div>
      <div className={s.title}>I want to convert</div>
      <PickCurrency />

      {rates ? (
        <>
          {isLoading ? <div className={s.loading} /> : null}
          <Rates />
          <ExchangeHistory />
        </>
      ) : null}
    </div>
  );
};
