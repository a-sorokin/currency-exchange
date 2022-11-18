import { Button, FormControl, InputLabel, NativeSelect } from "@mui/material";
import s from "./PickCurrency.module.scss";
import TextField from "@mui/material/TextField";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useAppStore } from "store/store";
import { TCurrencies } from "types";
import { FC, useCallback, useMemo, useState } from "react";

const GetCurrencyOptions: FC<{ currencies: TCurrencies }> = ({
  currencies,
}) => (
  <>
    {Object.keys(currencies).map((currency, id) => (
      <option key={`${currency}-${id}`} value={currency}>
        {currency}
      </option>
    ))}
  </>
);

export const PickCurrency = () => {
  const { amount, setAmount, currencies, convert } = useAppStore((state) => ({
    amount: state.amount,
    setAmount: state.setAmount,
    currencies: state.currencies,
    convert: state.convert,
  }));
  const [fromCurrency, setFromCurrency] = useState(Object.keys(currencies)[0]);
  const [toCurrency, setToCurrency] = useState(Object.keys(currencies)[1]);

  const handleConvert = useCallback(() => {
    if (!amount || sameCurrency) return;
    convert(
      fromCurrency as keyof TCurrencies,
      toCurrency as keyof TCurrencies,
      amount
    );
  }, [fromCurrency, toCurrency, amount]);

  const currenciesOptions = useMemo(
    () => GetCurrencyOptions({ currencies }),
    [currencies]
  );

  const sameCurrency = useMemo(
    () => fromCurrency === toCurrency,
    [fromCurrency, toCurrency]
  );

  const swapCurrencies = useCallback(() => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }, [fromCurrency, toCurrency]);

  return (
    <div className={s.pickCurrency}>
      <div className={s.element}>
        <TextField
          id="standard-basic"
          label="Amount"
          variant="standard"
          type="number"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <div className={s.element}>
        <FormControl sx={{ minWidth: 50, width: 300 }} error={sameCurrency}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            From
          </InputLabel>
          <NativeSelect
            value={fromCurrency}
            inputProps={{ name: "from" }}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currenciesOptions}
          </NativeSelect>
        </FormControl>
      </div>

      <div className={s.element}>
        <Button
          variant="contained"
          sx={{ minWidth: 40, padding: 1 }}
          className={s.swapBtn}
          onClick={swapCurrencies}
        >
          <CompareArrowsIcon />
        </Button>
      </div>

      <div className={s.element}>
        <FormControl sx={{ minWidth: 50, width: 300 }} error={sameCurrency}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            To
          </InputLabel>
          <NativeSelect
            value={toCurrency}
            inputProps={{ name: "to" }}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currenciesOptions}
          </NativeSelect>
        </FormControl>
      </div>

      <div className={s.element}>
        <Button
          variant="contained"
          className={s.convertBtn}
          onClick={handleConvert}
          disabled={!amount || sameCurrency}
        >
          Convert
        </Button>
      </div>
    </div>
  );
};
