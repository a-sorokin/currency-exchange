import { Button, FormControl, InputLabel, NativeSelect } from "@mui/material";
import s from "./PickCurrency.module.scss";
import TextField from "@mui/material/TextField";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useAppStore } from "store/store";
import { TCurrencies } from "types";
import { FC, useCallback, useState } from "react";

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
  const { currencies, convert } = useAppStore((state) => ({
    currencies: state.currencies,
    convert: state.convert,
  }));
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(Object.keys(currencies)[0]);
  const [toCurrency, setToCurrency] = useState(Object.keys(currencies)[1]);

  const handleConvert = useCallback(() => {
    convert(
      fromCurrency as keyof TCurrencies,
      toCurrency as keyof TCurrencies,
      amount
    );
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className={s.pickCurrency}>
      <div className={s.element}>
        <TextField
          id="standard-basic"
          label="Amount"
          variant="standard"
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <div className={s.element}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            From
          </InputLabel>
          <NativeSelect
            inputProps={{ name: "from", id: "uncontrolled-native" }}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <GetCurrencyOptions currencies={currencies} />
          </NativeSelect>
        </FormControl>
      </div>

      <div className={s.element}>
        <Button
          variant="contained"
          sx={{ minWidth: 40, padding: 1 }}
          className={s.swapBtn}
        >
          <CompareArrowsIcon />
        </Button>
      </div>

      <div className={s.element}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            To
          </InputLabel>
          <NativeSelect
            defaultValue={"USD"}
            inputProps={{ name: "to", id: "uncontrolled-native" }}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <GetCurrencyOptions currencies={currencies} />
          </NativeSelect>
        </FormControl>
      </div>

      <div className={s.element}>
        <Button
          variant="contained"
          className={s.convertBtn}
          onClick={handleConvert}
        >
          Convert
        </Button>
      </div>
    </div>
  );
};
