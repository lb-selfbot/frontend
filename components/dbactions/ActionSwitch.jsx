import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";

import dashStyles from "../../styles/Dashboard.module.css";
import loginStyles from "../../styles/Login.module.css";

export function ActionSwitch(props) {
  const { label, defaultValue, onChange } = props;
  const [value, setValue] = React.useState(defaultValue);

  const onValueChange = (event) => {
    setValue(event.target.checked);
    onChange(event.target.checked);
  };

  const switchControl = (
    <Switch checked={value ?? false} onChange={onValueChange} />
  );

  return (
    <FormControl fullWidth className={loginStyles.input}>
      <Box className={dashStyles.configSwitchContainer}>
        <FormControlLabel
          label={label}
          control={switchControl}
          className={dashStyles.configSwitch}
        />
      </Box>
    </FormControl>
  );
}
