import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";

import { Material3Button } from "../Material3Button";
import { TextFieldTooltip } from "../TextFieldTooltip";
import { ConfigEditor } from "../ConfigEditor";

import { useConfig } from "../../hooks/useConfig";
import { useModal } from "mui-modal-provider";

import { configFields } from "../../config/configFields";
import { wsData } from "../../wsData/wsData";

import dashStyles from "../../styles/Dashboard.module.css";

function getLabel(
  antiDelete,
  antiInvite,
  antiSpam,
  antiUpper,
  protectedServers
) {
  var enabled = 0;
  if (antiDelete === true) enabled++;
  if (antiInvite === true) enabled++;
  if (antiSpam === true) enabled++;
  if (antiUpper === true) enabled++;
  const servers = (protectedServers || []).length;

  return (
    `${enabled} protection${enabled === 1 ? "" : "s"} enabled` +
    ` in ${servers} server${servers === 1 ? "" : "s"}`
  );
}

function ServerProtectionsModal({ onConfigUpdate }) {
  const [serverAddText, setServerAddText] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const { config } = useConfig();

  const closeDialog = () => setDialogOpen(false);

  const onServerAddTextChange = (e) => setServerAddText(e.target.value);

  const onServerAdd = (e) => {
    if (serverAddText === "") return;

    let protectedServers =
      config.Protections?.ServerProtections?.ProtectedServers;

    if (protectedServers.includes(serverAddText)) return;

    protectedServers.push(serverAddText);

    const tempConfig = { ...config };

    tempConfig.Protections.ServerProtections.ProtectedServers =
      protectedServers;

    wsData.setConfig(tempConfig);
    onConfigUpdate();

    setServerAddText("");
  };

  const inputAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={onServerAdd}>
        <AddIcon />
      </IconButton>
    </InputAdornment>
  );

  const getOnServerDelete = (server) => {
    return () => {
      var protectedServers =
        config.Protections?.ServerProtections?.ProtectedServers;

      protectedServers = protectedServers.filter((s) => s !== server);

      const tempConfig = { ...config };

      tempConfig.Protections.ServerProtections.ProtectedServers =
        protectedServers;

      wsData.setConfig(tempConfig);
      onConfigUpdate();
    };
  };

  const serverChips =
    config.Protections?.ServerProtections?.ProtectedServers.map((server) => (
      <Chip
        label={server}
        sx={{ margin: 1 }}
        onDelete={getOnServerDelete(server)}
        key={server}
      />
    ));

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>Server Protections</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Typography variant="h6" p={1}>
          Servers (Name/ID)
        </Typography>

        <Box flexWrap="wrap" mb={1}>
          {serverChips}
        </Box>

        <TextField
          variant="filled"
          label="Server Name/ID"
          InputProps={{ endAdornment: inputAdornment }}
          value={serverAddText}
          onChange={onServerAddTextChange}
        />

        <Divider sx={{ margin: 2 }} />

        <ConfigEditor fields={configFields.serverProtections} />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function ServerProtections(props) {
  const [modal, setModal] = React.useState(null);
  const { showModal } = useModal();
  const { config } = useConfig();

  const { info, protectedServers, onConfigUpdate } = props;

  const antiDelete = config.Protections?.ServerProtections?.AntiDelete;
  const antiInvite = config.Protections?.ServerProtections?.AntiInvite;
  const antiSpam = config.Protections?.ServerProtections?.AntiSpam;
  const antiUpper = config.Protections?.ServerProtections?.AntiUpper;

  const handleTextFieldFocus = (event) => {
    event.preventDefault();

    if (modal !== null) {
      // If there is already a modal open, close it
      modal.destroy();
      setModal(null);
      event.target.blur();
      return;
    }

    const _modal = showModal(ServerProtectionsModal, { onConfigUpdate });
    setModal(_modal);
  };

  const _getLabel = () => {
    return getLabel(
      antiDelete,
      antiInvite,
      antiSpam,
      antiUpper,
      protectedServers
    );
  };

  return (
    <TextFieldTooltip
      variant="filled"
      fullWidth
      tooltip={info}
      label="Server Protections"
      value={_getLabel()}
      inputProps={{ onFocus: handleTextFieldFocus }}
    />
  );
}

export default ServerProtections;
