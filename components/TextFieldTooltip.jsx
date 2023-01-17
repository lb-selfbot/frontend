import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import InfoButton from "./InfoButton";

function TextFieldTooltip(props) {
  const { tooltip, ...other } = props;

  const tooltipAdornment = (
    <InputAdornment position="end">
      <InfoButton info={tooltip} />
    </InputAdornment>
  );

  return (
    <TextField {...other} InputProps={{ endAdornment: tooltipAdornment }} />
  );
}

export { TextFieldTooltip };
