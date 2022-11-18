import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import s from "./BaseTable.module.scss";
import { FC } from "react";

export const BaseTable: FC<{ rows: string[]; data: any[][] }> = ({
  rows,
  data,
}) => {
  return (
    <TableContainer component={Paper} sx={{ width: 500 }}>
      <Table>
        <TableHead>
          <TableRow>
            {rows.map((r, i) => (
              <TableCell key={`${r}-${i}`} className={s.row}>
                {r}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => (
            <TableRow
              key={d[0]}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {d[0]}
              </TableCell>
              <TableCell>{d[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
