import { TableCell, TableRow as MuiTableRow, Typography } from "@mui/material";
import { FC } from "react";

import { PlayerInfo } from "./PlayerInfo";
import { RowData } from "./types";

type TableRowProps = {
  data: RowData;
};

export const TableRow: FC<TableRowProps> = ({
  data: { place, name = "Name", email = "email@email.ru", img, score },
}) => {
  return (
    <MuiTableRow>
      <TableCell>
        <Typography>{place}</Typography>
      </TableCell>
      <TableCell>
        <PlayerInfo name={name} email={email} img={img} />
      </TableCell>
      <TableCell>
        <Typography>{score}</Typography>
      </TableCell>
    </MuiTableRow>
  );
};
