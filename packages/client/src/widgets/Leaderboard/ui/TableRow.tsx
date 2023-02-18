import { TableCell, TableRow as MuiTableRow, Typography } from "@mui/material";
import { FC } from "react";

import { PlayerInfo } from "./PlayerInfo";
import { RowData } from "./types";

type TableRowProps = {
  data: RowData;
};

export const TableRow: FC<TableRowProps> = ({
  data: { name, email, img, score, status, lastGameDate },
}) => {
  return (
    <MuiTableRow>
      <TableCell>
        <PlayerInfo name={name} email={email} img={img} />
      </TableCell>
      <TableCell>
        <Typography>{score}</Typography>
      </TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{lastGameDate}</TableCell>
    </MuiTableRow>
  );
};
