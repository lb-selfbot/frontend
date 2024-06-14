import React from "react";

import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import Divider from "@mui/material/Divider/Divider";
import Dialog from "@mui/material/Dialog/Dialog";
import Box from "@mui/material/Box/Box";

import { Material3Button } from "../Material3Button";
import { ActionTextField } from "./ActionTextField";
import { ActionSwitch } from "./ActionSwitch";

import { useModal } from "mui-modal-provider";
import { useSnackbar } from "notistack";

import { handleTableChange } from "../../hooks/useTableData";
import { api } from "../../api/api";

import dashStyles from "../../styles/Dashboard.module.css";

function UserActionModal(props) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const { id, username, email, key, flags } = props.row;

  const isActive = flags.includes("Active");
  const isStaff = flags.includes("Staff");
  const isTester = flags.includes("Tester");

  const onUsernameSave = async (value) => {
    const apiResponse = await api.UserAction(id, "set_username", value);

    if (apiResponse.success) {
      enqueueSnackbar("Successfully updated username!", { variant: "success" });
      handleTableChange("users");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onPasswordSave = async (value) => {
    const apiResponse = await api.UserAction(id, "set_password", value);

    if (apiResponse.success) {
      enqueueSnackbar("Successfully updated password!", { variant: "success" });
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onEmailSave = async (value) => {
    const apiResponse = await api.UserAction(id, "set_email", value);

    if (apiResponse.success) {
      enqueueSnackbar("Successfully updated email!", { variant: "success" });
      handleTableChange("users");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onKeySave = async (value) => {
    const apiResponse = await api.UserAction(id, "set_key", value);

    if (apiResponse.success) {
      enqueueSnackbar("Successfully updated key!", { variant: "success" });
      handleTableChange("users");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onIsActiveSave = async (value) => {
    const apiResponse = await api.UserAction(
      id,
      "set_active",
      value.toString()
    );

    if (apiResponse.success) {
      enqueueSnackbar("Successfully updated active state!", {
        variant: "success",
      });
      handleTableChange("users");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onIsStaffSave = async (value) => {
    const apiResponse = await api.UserAction(id, "set_staff", value.toString());

    if (apiResponse.success) {
      enqueueSnackbar("Successfully updated staff state!", {
        variant: "success",
      });
      handleTableChange("users");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onIsTesterSave = async (value) => {
    const apiResponse = await api.UserAction(
      id,
      "set_tester",
      value.toString()
    );

    if (apiResponse.success) {
      enqueueSnackbar("Successfully updated tester state!", {
        variant: "success",
      });
      handleTableChange("users");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onDeleteAccountClick = async () => {
    const apiResponse = await api.UserAction(id, "delete", "");

    if (apiResponse.success) {
      enqueueSnackbar("Successfully deleted user!", { variant: "success" });
      handleTableChange("users");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onResetFreeTrialClick = async () => {
    const apiResponse = await api.UserAction(id, "reset_free_trial", "");

    if (apiResponse.success) {
      enqueueSnackbar("Successfully reset user's free trial!", {
        variant: "success",
      });
      handleTableChange("users");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const onSendPasswordResetEmail = async () => {
    const apiResponse = await api.UserAction(
      id,
      "send_password_reset_email",
      ""
    );

    if (apiResponse.success) {
      enqueueSnackbar("Successfully sent password reset email to user!", {
        variant: "success",
      });
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
      <DialogTitle>User Actions ({username})</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <ActionTextField
          label="Username"
          defaultValue={username}
          onSave={onUsernameSave}
        />

        <ActionTextField label="Password" onSave={onPasswordSave} />

        <ActionTextField
          label="Email"
          defaultValue={email}
          onSave={onEmailSave}
        />

        <ActionTextField label="Key" defaultValue={key} onSave={onKeySave} />

        <ActionSwitch
          label="Active"
          defaultValue={isActive}
          onChange={onIsActiveSave}
        />
        <ActionSwitch
          label="Staff"
          defaultValue={isStaff}
          onChange={onIsStaffSave}
        />
        <ActionSwitch
          label="Tester"
          defaultValue={isTester}
          onChange={onIsTesterSave}
        />

        <Divider sx={{ marginBottom: 2 }} />

        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Material3Button variant="contained" onClick={onDeleteAccountClick}>
            Delete Account
          </Material3Button>

          <Material3Button variant="contained" onClick={onResetFreeTrialClick}>
            Reset Free Trial
          </Material3Button>

          <Material3Button
            variant="contained"
            onClick={onSendPasswordResetEmail}
          >
            Send Password Reset Email
          </Material3Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

export function UserActionButton(props) {
  const { showModal } = useModal();

  const { gridCellParams } = props;
  const row = gridCellParams.row;

  const onViewActionsClick = () => {
    showModal(UserActionModal, { row });
  };

  return (
    <Material3Button variant="contained" onClick={onViewActionsClick}>
      View Actions
    </Material3Button>
  );
}
