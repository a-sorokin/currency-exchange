import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { FC } from "react";
import { TCurrencies, THistory } from "types";
import { DeleteBtn } from "features/ConversionHistory/ConversionTable/DeleteBtn/DeleteBtn";
import { ViewBtn } from "features/ConversionHistory/ConversionTable/ViewBtn/ViewBtn";
import s from "./ConversionTable.module.scss";

const formatDate = (date: string) => {
  const [dateStr, timeStr] = date.split(",");
  const [day, month, year] = dateStr.split("/");
  const [hh, mm] = timeStr.split(":");

  return `${day}/${month}/${year} @ ${hh}:${mm}`;
};

export const ConversionTable: FC<{
  history: THistory;
  removeFromHistory: (index: number) => void;
  showConvertTab: (
    from: keyof TCurrencies,
    to: keyof TCurrencies,
    amount: number
  ) => void;
}> = ({ history, removeFromHistory, showConvertTab }) => {
  return (
    <TableContainer component={Paper} sx={{ width: 1010 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={s.row}>Date</TableCell>
            <TableCell className={s.row}>Event</TableCell>
            <TableCell className={s.row}>Actions</TableCell>
            <TableCell className={s.row} />
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((h, i) => (
            <TableRow
              key={`${h.date}-${i}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className={s.row}
            >
              <TableCell component="th" scope="row">
                {formatDate(h.date)}
              </TableCell>
              <TableCell>
                Converted amount of {h.amount} from {h.from} to {h.to}
              </TableCell>
              <TableCell>
                <div
                  className={s.btn}
                  onClick={() => showConvertTab(h.from, h.to, h.amount)}
                >
                  <ViewBtn />
                </div>
              </TableCell>
              <TableCell>
                <div className={s.btn} onClick={() => removeFromHistory(i)}>
                  <DeleteBtn />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
