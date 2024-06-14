import React from "react";

import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import Dialog from "@mui/material/Dialog/Dialog";
import Box from "@mui/material/Box/Box";

import { Material3Button } from "../Material3Button";

import { useModal } from "mui-modal-provider";
import { useSnackbar } from "notistack";

import { handleTableChange } from "../../hooks/useTableData";
import { api } from "../../lbapi/lbapi";

import dashStyles from "../../styles/Dashboard.module.css";

function CreditKeyActionModal(props) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const { id, key } = props.row;

  const onDeleteKeyClick = async () => {
    const apiResponse = await api.CreditKeyAction(id, "delete");

    if (apiResponse.success) {
      enqueueSnackbar("Successfully deleted credit key!", {
        variant: "success",
      });
      handleTableChange("credit-keys");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>Credit Key Actions ({key})</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Material3Button variant="contained" onClick={onDeleteKeyClick}>
            Delete Key
          </Material3Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

export function CreditKeyActionButton(props) {
  const { showModal } = useModal();

  const row = props.gridCellParams.row;

  const onViewActionsClick = () => showModal(CreditKeyActionModal, { row });

  return (
    <Material3Button variant="contained" onClick={onViewActionsClick}>
      View Actions
    </Material3Button>
  );
}
