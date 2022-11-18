import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import s from "./ChangeType.module.scss";
import { FC } from "react";
import { TStatisticsType } from "types";

export const ChangeType: FC<{
  type: TStatisticsType;
  changeType: (type: TStatisticsType) => void;
  className?: string;
}> = ({ type, className, changeType }) => (
  <div className={className}>
    <FormControl>
      <RadioGroup
        row
        name="row-radio-buttons-group"
        value={type}
        onChange={(e) => changeType(e.target.value as TStatisticsType)}
      >
        <FormControlLabel
          value="Table"
          control={<Radio className={s.radio} />}
          label="Table"
        />
        <FormControlLabel
          value="Chart"
          control={<Radio className={s.radio} />}
          label="Chart"
        />
      </RadioGroup>
    </FormControl>
  </div>
);
