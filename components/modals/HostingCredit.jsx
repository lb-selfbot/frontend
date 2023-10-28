import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  TextField
} from "@mui/material";

import { RECAPTCHA_SITEKEY } from "../../config/config";

import dashStyles from "../../styles/Dashboard.module.css";

import { Material3Button } from "../Material3Button";
import PasswordField from "../PasswordField";

import { useSnackbar } from "notistack";

import { api } from "../../api/api";

export default function SelfbotHostingModal({ open, setOpen }) {
  const [key, setKey] = React.useState("");
  const [error, setError] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onTokenChange = (e) => setKey(e.target.value);
  const closeDialog = () => setOpen(false);

  const handleRedeem = async () => {
    const token = await grecaptcha.execute(RECAPTCHA_SITEKEY, {
      action: "redeem_credit_key",
    });

    const apiResponse = await api.RedeemCreditKey(key, token);

    if (apiResponse.success) {
      // Reload the user data
      api.GetUser(false);
      setError(false);
      setKey("");
      enqueueSnackbar("Key redeemed successfully.", { variant: "success" });
      closeDialog();
      return;
    }

    setError(true);
    const error = apiResponse.json?.message ?? "An unknown error has occurred";
    enqueueSnackbar(error, { variant: "error" });
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth>
      <DialogTitle>Hosting Credit</DialogTitle>
      <DialogContent className={dashStyles.itemContainer}>
        <DialogContentText mb={2}>
          Choose one of the following options to buy a hosting key.
        </DialogContentText>

        <Material3Button
          data-sellix-product="6527be362edd4"
          variant="contained"
          sx={{ margin: "auto", width: "80%" }}
        >
          1 Month - €2.00
        </Material3Button>

        <Divider
          sx={{ backgroundColor: "#bbb", margin: "8px auto", width: "70%" }}
        />

        <Material3Button
          data-sellix-product="6527be362edd4"
          variant="contained"
          sx={{ margin: "auto", width: "80%" }}
        >
          3 Months - €5.00
        </Material3Button>

        <Divider
          sx={{ backgroundColor: "#bbb", margin: "8px auto", width: "70%" }}
        />

        <Material3Button
          data-sellix-product="6527be362edd4"
          variant="contained"
          sx={{ margin: "auto", width: "80%" }}
        >
          6 Months - €8.00
        </Material3Button>

        <Divider sx={{ backgroundColor: "#bbb", my: 4 }} />

        <DialogContentText>
          Please enter your hosting key here to redeem it.
        </DialogContentText>

        <TextField
          variant="filled"
          margin="normal"
          autoFocus
          label="Key"
          value={key}
          onChange={onTokenChange}
          error={error}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Cancel</Material3Button>

        <Material3Button onClick={handleRedeem}>Redeem</Material3Button>
      </DialogActions>
    </Dialog>
  );
}
