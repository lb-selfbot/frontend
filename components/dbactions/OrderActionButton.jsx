import React from "react";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import { useModal } from "mui-modal-provider";
import { useSnackbar } from "notistack";

import dashStyles from "../../styles/Dashboard.module.css";
import { Material3Button } from "../Material3Button";

function OrderActionModal(props) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const { orderId, rawJson } = props.row;

  const onCopyRawJSONClick = () => {
    navigator.clipboard.writeText(rawJson);

    enqueueSnackbar("Successfully copied raw JSON to clipboard!", {
      variant: "success",
    });
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>Order Actions ({orderId})</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Material3Button variant="contained" onClick={onCopyRawJSONClick}>
            Copy raw JSON
          </Material3Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

export function OrderActionButton(props) {
  const { showModal } = useModal();

  const row = props.gridCellParams.row;

  const onViewActionsClick = () => showModal(OrderActionModal, { row });

  return (
    <Material3Button variant="contained" onClick={onViewActionsClick}>
      View Actions
    </Material3Button>
  );
}