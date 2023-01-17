import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
}
