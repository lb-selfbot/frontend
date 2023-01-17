import React from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { Material3Button } from "../Material3Button";

import dashStyles from "../../styles/Dashboard.module.css";

export function ActionTextField(props) {
  const { label, defaultValue, onSave } = props;
  const [value, setValue] = React.useState(defaultValue ?? "");

  const onValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box className={dashStyles.actionTextField}>
      <TextField
        variant="filled"
        label={label}
        value={value}
        onChange={onValueChange}
        fullWidth
      />

      <Material3Button variant="contained" onClick={() => onSave(value)}>
        Save
      </Material3Button>
    </Box>
  );
}
