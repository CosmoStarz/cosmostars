import { TableCell, Typography } from "@mui/material";
import { FC } from "react";

type TableHeadCellProps = {
  text: string;
};

export const TableHeadCell: FC<TableHeadCellProps> = ({ text }) => {
  return (
    <TableCell>
      <Typography
        sx={{
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "10px",
          lineHeight: "15px",
          textTransform: "uppercase",
        }}>
        {text}
      </Typography>
    </TableCell>
  );
};
