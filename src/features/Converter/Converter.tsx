import { PickCurrency } from "features/Converter/PickCurrency/PickCurrency";
import { Rates } from "features/Converter/Rates/Rates";
import s from "./Converter.module.scss";

export const Converter = () => {
  return (
    <div>
      <div className={s.title}>I want to convert</div>
      <br />
      <PickCurrency />
      <Rates />
    </div>
  );
};
