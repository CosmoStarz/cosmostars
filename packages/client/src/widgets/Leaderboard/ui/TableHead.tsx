import { TableHead as MuiTableHead, TableRow } from "@mui/material";
import { FC } from "react";

import { TableHeadCell } from "./TableHeadCell";

export const TableHead: FC = () => {
  return (
    <MuiTableHead>
      <TableRow>
        <TableHeadCell text="Place" />
        <TableHeadCell text="Player" />
        <TableHeadCell text="Score" />
      </TableRow>
    </MuiTableHead>
  );
};
