import React from "react";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Material3Button } from "../Material3Button";
import { TextFieldTooltip } from "../TextFieldTooltip";
import { ConfigEditor } from "../ConfigEditor";

import { useConfig } from "../../hooks/useConfig";
import { useModal } from "mui-modal-provider";

import { configFields } from "../../config/configFields";

import dashStyles from "../../styles/Dashboard.module.css";

function getLabel(enabled, channels) {
  if (!enabled) return "Disabled";

  if (channels === null) channels = [];

  return channels.length === 1
    ? "Enabled in 1 channel"
    : `Enabled in ${channels.length} channels`;
}

function PokeTwoSniperModal() {
  const [dialogOpen, setDialogOpen] = React.useState(true);

  const closeDialog = () => setDialogOpen(false);

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>PokéTwo Sniper</DialogTitle>

      <DialogContent
        sx={{ width: "100%" }}
        className={dashStyles.itemContainer}
      >
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

  const { info, get } = props;

  const handleTextFieldFocus = (event) => {
    event.preventDefault();

    if (modal !== null) {
      // If there is already a modal open, close it
      modal.destroy();
      setModal(null);
      event.target.blur();
      return;
    }

    const _modal = showModal(PokeTwoSniperModal);
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
