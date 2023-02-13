import { Table as MuiTable } from "@mui/material";
import { FC, useState } from "react";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { RowData } from "./types";
import { TableFooter } from "./TableFooter";

type TableProps = {
  data: RowData[];
};

export const Table: FC<TableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    setPage(0);
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
