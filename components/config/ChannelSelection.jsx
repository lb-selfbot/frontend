import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";

import { Material3Button } from "../Material3Button";
import { TextFieldTooltip } from "../TextFieldTooltip";

import { useConfig } from "../../hooks/useConfig";
import { useModal } from "mui-modal-provider";

import { wsData } from "../../wsData/wsData";

import dashStyles from "../../styles/Dashboard.module.css";

function ChannelChip({ server: channels, servers, set, onDelete, onConfigUpdate }) {
  return (
    <Chip
      label={channels}
      sx={{ margin: 1 }}
      onDelete={() => {
        servers = servers.filter((s) => s !== channels);
        wsData.setConfig(set(wsData.config, servers));
        onConfigUpdate();
        onDelete(servers);
      }}
    />
  );
}

function ChannelSelectionModal({ name, get, set, onConfigUpdate }) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [channelAddText, setChannelAddText] = React.useState("");
  const [channels, setChannels] = React.useState(get(wsData.config));

  const closeDialog = () => setDialogOpen(false);

  const onChannelAddTextChange = (event) => {
    setChannelAddText(event.target.value);
  };

  const onChannelAdd = (event) => {
    event.preventDefault();

    if (channelAddText === "") return;

    var channels = get(wsData.config);

    if (channels.includes(channelAddText)) return;

    channels.push(channelAddText);

    wsData.setConfig(set(wsData.config, channels));
    onConfigUpdate();

    setChannels(channels);
    setChannelAddText("");
  };

  const inputAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={onChannelAdd}>
        <AddIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Typography variant="h6" sx={{ padding: 1 }}>
          Channels
        </Typography>

        <Box sx={{ flexWrap: "wrap", marginBottom: 1 }}>
          {channels.map((server) => (
            <ChannelChip
              server={server}
              servers={channels}
              set={set}
              onDelete={(servers) => setChannels(servers)}
              onConfigUpdate={onConfigUpdate}
              key={server}
            />
          ))}
        </Box>

        <TextField
          variant="filled"
          label="Channel ID"
          InputProps={{ endAdornment: inputAdornment }}
          value={channelAddText}
          onChange={onChannelAddTextChange}
        />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function ChannelSelection({
  name,
  info,
  selectedChannels,
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

    const _modal = showModal(ChannelSelectionModal, {
      name: name,
      get: get,
      set: set,
      onConfigUpdate: onConfigUpdate,
    });
    setModal(_modal);
  };

  const _getLabel = () => {
    const length = (get(config) || []).length;
    return `${length} channel${length === 1 ? "" : "s"} selected`;
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

export default ChannelSelection;
