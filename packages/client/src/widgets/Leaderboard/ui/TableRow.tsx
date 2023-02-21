import { TableRow as MuiTableRow, TableCell, Typography } from "@mui/material";
import { FC } from "react";
import { PlayerInfo } from "./PlayerInfo";
import { RowData } from "./types";

type TableRowProps = {
  data: RowData;
  place: number;
};

export const TableRow: FC<TableRowProps> = ({
  data: { name = "Name", email = "email@email.ru", img, score },
  place,
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
