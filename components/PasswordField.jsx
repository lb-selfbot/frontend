import React, { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

function PasswordField(props) {
  const [buttonVisisble, setButtonVisisble] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (event) => {
    setButtonVisisble(event.target.value.length > 0);

    if (event.target.value.length === 0) {
      setShowPassword(false);
    }

    props.onChange?.(event);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        sx={{ display: buttonVisisble ? "flex" : "none" }}
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      onChange={onChange}
      InputProps={{ endAdornment: endAdornment }}
    />
  );
}

export default PasswordField;
