import { Table as MuiTable } from "@mui/material";
import { FC, useState } from "react";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { RowData } from "./types";
import { TableFooter } from "./TableFooter";

type TableProps = {
  data: RowData[];
  startPage: number;
  defaultPerPage: number;
};

export const Table: FC<TableProps> = ({ data, startPage, defaultPerPage }) => {
  const [page, setPage] = useState(startPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPerPage);

  const rowsOffset = page * rowsPerPage;

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(startPage);
  };

  return (
    <MuiTable>
      <TableHead />
      <TableBody data={data} rowsCount={rowsPerPage} rowsOffset={rowsOffset} />
      <TableFooter
        pagesCount={data.length}
        rowsPerPage={rowsPerPage}
        currPage={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </MuiTable>
  );
};
