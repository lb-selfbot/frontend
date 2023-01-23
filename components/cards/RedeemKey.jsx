import React from "react";

import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import { PayPalButtons } from "@paypal/react-paypal-js";

import { Material3Button } from "../Material3Button";
import { Card } from "../Card";

import useUser from "../../hooks/useUser";
import { useSnackbar } from "notistack";

import { RECAPTCHA_SITEKEY } from "../../config/config";
import { resellers } from "../../config/resellers";
import { api } from "../../api/api";

import dashStyles from "../../styles/Dashboard.module.css";
import loginStyles from "../../styles/Login.module.css";

function RedeemKey(props) {
  const user = useUser();

  const { openRedeemKeyDialog, openBuyKeyDialog } = props;

  const freeOnly = {
    display: user.key !== "None" ? "none" : "block",
  };

  return (
    <Card.MuiCard>
      <CardContent className={dashStyles.itemContainer}>
        <Typography variant="h4" className={dashStyles.itemTitle}>
          Key
        </Typography>

        <TextField
          variant="filled"
          disabled
          label="Your Key"
          value={user.key ?? "Loading"}
          className={loginStyles.input}
        />

        <Box display="flex" flexDirection="column" gap={1}>
          <Material3Button
            variant="contained"
            sx={freeOnly}
            onClick={openRedeemKeyDialog}
            fullWidth
          >
            Redeem a Key
          </Material3Button>

          <Material3Button
            variant="contained"
            sx={freeOnly}
            onClick={openBuyKeyDialog}
            fullWidth
          >
            Buy a Key
          </Material3Button>
        </Box>
      </CardContent>
    </Card.MuiCard>
  );
}

function RedeemKeyDialog(props) {
  const [keyError, setKeyError] = React.useState(false);
  const [key, setKey] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  const onKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleRedeemKey = async () => {
    const token = await grecaptcha.execute(RECAPTCHA_SITEKEY, {
      action: "redeem_key",
    });

    const apiResponse = await api.RedeemKey(key, token);

    if (apiResponse.success) {
      // Reload the user data
      api.GetUser(false);
      setKeyError(false);
      enqueueSnackbar("Key redeemed successfully.", { variant: "success" });
      onClose();
      return;
    }

    const error = apiResponse.json?.message ?? "An unknown error has occurred";
    setKeyError(true);
    enqueueSnackbar(error, { variant: "error" });
  };

  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Redeem A Key</DialogTitle>
      <DialogContent className={dashStyles.itemContainer}>
        <DialogContentText>
          Please enter your key here to redeem it.
        </DialogContentText>

        <TextField
          variant="filled"
          margin="normal"
          autoFocus
          label="Key"
          value={key}
          onChange={onKeyChange}
          error={keyError}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={onClose}>Cancel</Material3Button>

        <Material3Button onClick={handleRedeemKey}>Redeem</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function Resellers() {
  return (
    <>
      <Divider sx={{ backgroundColor: "#bbb", my: 1 }} />

      <DialogContentText
        my={1}
        color="text.primary"
        sx={{ fontFamily: "Inter" }}
      >
        Resellers
      </DialogContentText>

      {resellers.map((reseller) => (
        <Material3Button
          variant="contained"
          onClick={() => window.location.assign(reseller.url)}
          sx={{ my: 1 }}
          key={reseller.name}
        >
          {reseller.name}
        </Material3Button>
      ))}
    </>
  );
}

function BuyKeyDialog(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { open, onClose } = props;

  const createOrder = async (_, _) => {
    const token = await grecaptcha.execute(RECAPTCHA_SITEKEY, {
      action: "create_paypal_order",
    });

    const apiResponse = await api.CreatePayPalOrder(token);

    if (apiResponse.success) {
      return apiResponse.json?.order_id;
    }
    const error = apiResponse.json?.message ?? "An unknown error has occurred";

    enqueueSnackbar(error, { variant: "error" });

    return "";
  };

  const onPaymentApprove = (data, _) => {
    onClose();

    api.CapturePayPalOrder(data.orderID).then((apiResponse) => {
      if (apiResponse.success) {
        // Reload the user data
        api.GetUser(false);
        enqueueSnackbar(
          `Successfully purchased key: ${apiResponse.json?.data?.key}`,
          { variant: "success" }
        );
        return;
      }

      const error =
        apiResponse.json?.message ?? "An unknown error has occurred";
      enqueueSnackbar(error, { variant: "error" });
    });
  };

  const onPaymentCancel = () => {
    onClose();
    enqueueSnackbar("Payment cancelled.", { variant: "info" });
  };

  const onPaymentError = (error) => {
    onClose();
    enqueueSnackbar(error.toString(), { variant: "error" });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Buy A Key</DialogTitle>
      <DialogContent className={dashStyles.itemContainer}>
        <DialogContentText mb={2}>
          Choose any of the options below to buy LightningBot.
        </DialogContentText>

        <PayPalButtons
          createOrder={createOrder}
          onApprove={onPaymentApprove}
          onCancel={onPaymentCancel}
          onError={onPaymentError}
        />

        <Divider sx={{ backgroundColor: "#bbb", my: 1 }} />

        <Material3Button
          data-sellix-product="63cc61ba7c722"
          variant="contained"
        >
          Buy using Cryptocurrency
        </Material3Button>

        {resellers.length > 0 && <Resellers />}
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={onClose}>Cancel</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

RedeemKey.RedeemKeyDialog = RedeemKeyDialog;
RedeemKey.BuyKeyDialog = BuyKeyDialog;

export { RedeemKey };
