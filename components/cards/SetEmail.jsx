import React from "react";

import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";

import { Material3Button } from "../Material3Button";
import { TextFieldTooltip } from "../TextFieldTooltip";
import PasswordField from "../PasswordField";
import { Card } from "../Card";

import { useSnackbar } from "notistack";

import { api } from "../../api/api";

import dashStyles from "../../styles/Dashboard.module.css";
import loginStyles from "../../styles/Login.module.css";

function SetEmail(props) {
  const { openVerifyPasswordDialog, email, setEmail } = props;

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const tooltip =
    "Your email is only used to recover your account if you forget your password." +
    " We will never send you any emails other than those required to recover your account." +
    " It is not required to set your email.";

  return (
    <Card.MuiCard sx={{ mt: 2 }}>
      <CardContent className={dashStyles.itemContainer}>
        <Typography variant="h4" className={dashStyles.itemTitle}>
          Email
        </Typography>

        <TextFieldTooltip
          variant="filled"
          label="Your Email"
          value={email}
          onChange={onEmailChange}
          tooltip={tooltip}
          autoComplete="email"
          type="email"
          className={loginStyles.input}
        />

        <Material3Button
          variant="contained"
          onClick={openVerifyPasswordDialog}
          fullWidth
        >
          Set Email
        </Material3Button>
      </CardContent>
    </Card.MuiCard>
  );
}

function SetEmailDialog(props) {
  const [verificationPassword, setVerificationPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { open, onClose, email } = props;

  const onVerificationPasswordChange = (event) => {
    setVerificationPassword(event.target.value);
  };

  const handleSetEmail = () => {
    api.SetEmail(email, verificationPassword).then((apiResponse) => {
      if (apiResponse.success) {
        // Reload the user data
        api.GetUser(false);

        enqueueSnackbar("Email set successfully.", { variant: "success" });
        setVerificationPassword("");
        onClose();
        setError(false);
        return;
      }

      const error =
        apiResponse.json?.message ?? "An unknown error has occurred";
      enqueueSnackbar(error, { variant: "error" });
      setError(true);
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Set Email</DialogTitle>
      <DialogContent className={dashStyles.itemContainer}>
        <DialogContentText>
          Please enter your password to set your email.
        </DialogContentText>

        <PasswordField
          variant="filled"
          margin="normal"
          autoFocus
          label="Password"
          value={verificationPassword}
          onChange={onVerificationPasswordChange}
          error={error}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={onClose}>Cancel</Material3Button>

        <Material3Button onClick={handleSetEmail}>Set Email</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

SetEmail.Dialog = SetEmailDialog;

export { SetEmail };
