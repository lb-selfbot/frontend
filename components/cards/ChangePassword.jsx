import React from "react";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Material3Button } from "../Material3Button";
import PasswordField from "../PasswordField";
import { Card } from "../Card";

import { useSnackbar } from "notistack";

import { api } from "../../api/api";

import dashStyles from "../../styles/Dashboard.module.css";
import loginStyles from "../../styles/Login.module.css";

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [helperText, setHelperText] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  const onCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const onNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const onRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleChangePassword = () => {
    if (newPassword !== repeatPassword) {
      setHelperText("Passwords do not match.");
      return;
    }

    api.ChangePassword(currentPassword, newPassword).then((apiResponse) => {
      if (apiResponse.success) {
        enqueueSnackbar("Password changed successfully.", {
          variant: "success",
        });
        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
        return;
      }

      const error =
        apiResponse.json?.message ?? "An unknown error has occurred";
      enqueueSnackbar(error, { variant: "error" });
    });
  };

  return (
    <Card.MuiCard>
      <CardContent className={dashStyles.itemContainer}>
        <Typography variant="h4" className={dashStyles.itemTitle}>
          Change Password
        </Typography>

        <PasswordField
          variant="filled"
          label="Current Password"
          value={currentPassword}
          error={helperText !== ""}
          helperText={helperText}
          onChange={onCurrentPasswordChange}
          className={loginStyles.input}
        />

        <PasswordField
          variant="filled"
          label="New Password"
          value={newPassword}
          error={helperText !== ""}
          helperText={helperText}
          onChange={onNewPasswordChange}
          className={loginStyles.input}
        />

        <PasswordField
          variant="filled"
          label="Repeat Password"
          value={repeatPassword}
          error={helperText !== ""}
          helperText={helperText}
          onChange={onRepeatPasswordChange}
          className={loginStyles.input}
        />

        <Material3Button variant="contained" onClick={handleChangePassword}>
          Change Password
        </Material3Button>
      </CardContent>
    </Card.MuiCard>
  );
}
