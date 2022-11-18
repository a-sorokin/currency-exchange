import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import s from "./ChangeType.module.scss";
import { FC } from "react";

export const ChangeType: FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <FormControl>
      <RadioGroup row name="row-radio-buttons-group">
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
