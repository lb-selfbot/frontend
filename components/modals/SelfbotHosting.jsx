import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";

import dashStyles from "../../styles/Dashboard.module.css";

import { Material3Button } from "../Material3Button";
import PasswordField from "../PasswordField";

import { useSnackbar } from "notistack";

import { api } from "../../lbapi/lbapi";

import { JSEncrypt } from "jsencrypt";

export default function SelfbotHostingModal({
  open,
  setOpen,
  setHostingEnabled,
}) {
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onTokenChange = (e) => setToken(e.target.value);
  const closeDialog = () => setOpen(false);

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArIHAC8hm3zqFbYS31vOp
  bXztYWngL1A1j0ArL7vl8gPSHOc/qrdDM55HKQudCb1t9Ehvbj0AYBggZqdEscXK
  VeQ6sflblBDNmlkaUe3552vyrlxocuoUOsrhGhRULSeRpEPBUVl1ujO19g4K7mTI
  SGJz706cugi7YA204AHhZjdrHkjcnE0dPeAM8k67KmtStWAdN1eENcYv6P4tJC2a
  VWBGt4/vXvT80SuPoG0nLBHDuhX4uUKyT7j4v+FVhtXPmIctdOU9HlqKIetIXG2x
  3c/F33D05gO/zldOWetkyB4UXdYh7T8bk1EzYQUsiXC3c1RLYWe/hjaOycV92bWF
  9QIDAQAB
  -----END PUBLIC KEY-----`);

  const handleContinue = () => {
    if (!token) {
      setError(true);
      return;
    }

    api.EnableHosting(encrypt.encrypt(token)).then((res) => {
      if (res.success) {
        setHostingEnabled(true);
        setOpen(false);

        enqueueSnackbar(
          "Successfully enabled hosting! The selfbot will start in a few moments.",
          { variant: "success" }
        );
      } else {
        setError(true);
        enqueueSnackbar("Failed to enable hosting.", { variant: "error" });
      }
    });
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth>
      <DialogTitle>Enable Hosting</DialogTitle>
      <DialogContent className={dashStyles.itemContainer}>
        <DialogContentText>
          Please enter your Discord token to enable hosting. Your token will be
          encrypted in the browser and only stored in memory for the duration of
          your session.
        </DialogContentText>

        <PasswordField
          variant="filled"
          margin="normal"
          autoFocus
          label="Token"
          value={token}
          onChange={onTokenChange}
          error={error}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Cancel</Material3Button>

        <Material3Button onClick={handleContinue}>Continue</Material3Button>
      </DialogActions>
    </Dialog>
  );
}
