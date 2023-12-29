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

function getLabel(enabled, channels) {
  if (!enabled) return "Disabled";

  if (channels === null) channels = [];

  return channels.length === 1
    ? "Enabled in 1 channel"
    : `Enabled in ${channels.length} channels`;
}

function PokeTwoSniperModal({ get, set, onConfigUpdate }) {
  const [serverAddText, setServerAddText] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const { config } = useConfig();

  const closeDialog = () => setDialogOpen(false);

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>PokéTwo Sniper</DialogTitle>

      <DialogContent sx={{width: "100%"}} className={dashStyles.itemContainer}>
        <ConfigEditor fields={configFields.poketwoSniper} />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function PokeTwoSniper(props) {
  const [modal, setModal] = React.useState(null);
  const { showModal } = useModal();
  const { config } = useConfig();

  const { info, get, set, onConfigUpdate } = props;

  const handleTextFieldFocus = (event) => {
    event.preventDefault();

    if (modal !== null) {
      // If there is already a modal open, close it
      modal.destroy();
      setModal(null);
      event.target.blur();
      return;
    }

    const _modal = showModal(PokeTwoSniperModal, { get, set, onConfigUpdate });
    setModal(_modal);
  };

  const poketwoSniper = get(config);

  return (
    <TextFieldTooltip
      variant="filled"
      fullWidth
      tooltip={info}
      label="PokéTwo Sniper"
      value={getLabel(poketwoSniper?.Enabled, poketwoSniper?.Channels)}
      inputProps={{ onFocus: handleTextFieldFocus }}
    />
  );
}

export default PokeTwoSniper;
