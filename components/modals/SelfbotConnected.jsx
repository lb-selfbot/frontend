import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import Link from "next/link";

import { Material3Button } from "../Material3Button";

import dashStyles from "../../styles/Dashboard.module.css";
import styles from "../../styles/Modals.module.css";

function SelfbotConnectedModal({ computerName }) {
  const [dialogOpen, setDialogOpen] = React.useState(true);

  const closeDialog = () => setDialogOpen(false);

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>Connected to selfbot</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <DialogContentText>
          The dashboard is connected to the selfbot running on your computer (
          {computerName}). You can now access the{" "}
          <Link href="/dashboard/selfbot/console" className={styles.link}>
            console
          </Link>{" "}
          and{" "}
          <Link href="/dashboard/selfbot/config" className={styles.link}>
            config
          </Link>{" "}
          on the dashboard. The dashboard will automatically synchronize with
          the selfbot.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

export { SelfbotConnectedModal };
