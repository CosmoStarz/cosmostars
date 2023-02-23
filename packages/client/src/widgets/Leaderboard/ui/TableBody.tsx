import {
  TableBody as MuiTableBody,
  TableCell,
  TableRow as MuiTableRow,
} from "@mui/material";
import { FC } from "react";

import { TableRow } from "./TableRow";
import { RowData } from "./types";

type TableBodyProps = {
  data: RowData[];
  rowsCount: number;
  rowsOffset: number;
  emptyRows?: number;
};

export const TableBody: FC<TableBodyProps> = ({
  data,
  rowsOffset = 0,
  rowsCount = Infinity,
}) => {
  const actualData = data.slice(rowsOffset, rowsOffset + rowsCount);

  const rows = actualData.map((data, index) => (
    <TableRow key={index} data={data} />
  ));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rowsOffset > 0 ? rowsCount - actualData.length : 0;

  return (
    <MuiTableBody>
      {rows}
      {emptyRows > 0 && (
        <MuiTableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </MuiTableRow>
      )}
    </MuiTableBody>
  );
};
