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

function ServerChip({ server, servers, set, onDelete, onConfigUpdate }) {
  return (
    <Chip
      label={server}
      sx={{ margin: 1 }}
      onDelete={() => {
        servers = servers.filter((s) => s !== server);
        wsData.setConfig(set(wsData.config, servers));
        onConfigUpdate();
        onDelete(servers);
      }}
    />
  );
}

function ServerSelectionModal({ name, get, set, onConfigUpdate }) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [serverAddText, setServerAddText] = React.useState("");
  const [servers, setServers] = React.useState(get(wsData.config));

  const closeDialog = () => setDialogOpen(false);

  const onServerAddTextChange = (event) => {
    setServerAddText(event.target.value);
  };

  const onServerAdd = (event) => {
    event.preventDefault();

    if (serverAddText === "") return;

    var servers = get(wsData.config);

    if (servers.includes(serverAddText)) return;

    servers.push(serverAddText);

    wsData.setConfig(set(wsData.config, servers));
    onConfigUpdate();

    setServers(servers);
    setServerAddText("");
  };

  const inputAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={onServerAdd}>{<AddIcon />}</IconButton>
    </InputAdornment>
  );

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Typography variant="h6" sx={{ padding: 1 }}>
          Servers (Name/ID)
        </Typography>

        <Box sx={{ flexWrap: "wrap", marginBottom: 1 }}>
          {servers.map((server) => (
            <ServerChip
              server={server}
              servers={servers}
              set={set}
              onDelete={(servers) => setServers(servers)}
              onConfigUpdate={onConfigUpdate}
              key={server}
            />
          ))}
        </Box>

        <TextField
          variant="filled"
          label="Server Name/ID"
          InputProps={{ endAdornment: inputAdornment }}
          value={serverAddText}
          onChange={onServerAddTextChange}
        />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function ServerSelection({
  name,
  info,
  selectedServers,
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

    const _modal = showModal(ServerSelectionModal, {
      name: name,
      get: get,
      set: set,
      onConfigUpdate: onConfigUpdate,
    });
    setModal(_modal);
  };

  const _getLabel = () => {
    const length = (get(config) || []).length;
    return `${length} server${length === 1 ? "" : "s"} selected`;
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

export default ServerSelection;
