import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoaderView() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color="secondary" />
    </Box>
  );
}
