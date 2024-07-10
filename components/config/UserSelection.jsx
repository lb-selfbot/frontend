import React from "react";

import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import Dialog from "@mui/material/Dialog/Dialog";
import Chip from "@mui/material/Chip/Chip";
import Box from "@mui/material/Box/Box";

import AddIcon from "@mui/icons-material/Add";

import { Material3Button } from "../Material3Button";
import { TextFieldTooltip } from "../TextFieldTooltip";

import { useConfig } from "../../hooks/useConfig";
import { useModal } from "mui-modal-provider";

import { wsData } from "../../wsData/wsData";

import dashStyles from "../../styles/Dashboard.module.css";

function UserChip({ user, users, set, onDelete, onConfigUpdate }) {
  return (
    <Chip
      label={user}
      sx={{ margin: 1 }}
      onDelete={() => {
        users = users.filter((s) => s !== user);
        wsData.setConfig(set(wsData.config, users));
        onConfigUpdate();
        onDelete(users);
      }}
    />
  );
}

function UserSelectionModal({ name, get, set, onConfigUpdate }) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [userAddText, setUserAddText] = React.useState("");
  const [users, setUsers] = React.useState(get(wsData.config));

  const closeDialog = () => setDialogOpen(false);

  const onUserAddTextChange = (event) => {
    setUserAddText(event.target.value);
  };

  const onUserAdd = (event) => {
    event.preventDefault();

    if (userAddText === "") return;

    var users = get(wsData.config);

    if (users.includes(userAddText)) return;

    users.push(userAddText);

    wsData.setConfig(set(wsData.config, users));
    onConfigUpdate();

    setUsers(users);
    setUserAddText("");
  };

  const inputAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={onUserAdd}>{<AddIcon />}</IconButton>
    </InputAdornment>
  );

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Typography variant="h6" sx={{ padding: 1 }}>
          Users (Name/ID)
        </Typography>

        <Box sx={{ flexWrap: "wrap", marginBottom: 1 }}>
          {users.map((user) => (
            <UserChip
              user={user}
              users={users}
              set={set}
              onDelete={(users) => setUsers(users)}
              onConfigUpdate={onConfigUpdate}
              key={user}
            />
          ))}
        </Box>

        <TextField
          variant="filled"
          label="User Name/ID"
          InputProps={{ endAdornment: inputAdornment }}
          value={userAddText}
          onChange={onUserAddTextChange}
        />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function UserSelection({
  name,
  info,
  selectedUsers,
  get,
  set,
  onConfigUpdate,
}) {
  const [modal, setModal] = React.useState(null);
  const { showModal } = useModal();
  const { config } = useConfig();

  const handleTextFieldFocus = (event) => {
    event.preventDefault();

    if (modal !== null) {
      // If there is already a modal open, close it
      modal.destroy();
      setModal(null);
      event.target.blur();
      return;
    }

    const _modal = showModal(UserSelectionModal, {
      name: name,
      get: get,
      set: set,
      onConfigUpdate: onConfigUpdate,
    });
    setModal(_modal);
  };

  const _getLabel = () => {
    const length = (get(config) || []).length;
    return `${length} user${length === 1 ? "" : "s"} selected`;
  };

  return (
    <TextFieldTooltip
      variant="filled"
      fullWidth
      tooltip={info}
      label={name}
      value={_getLabel()}
      inputProps={{
        onFocus: handleTextFieldFocus,
      }}
    />
  );
}

export default UserSelection;
