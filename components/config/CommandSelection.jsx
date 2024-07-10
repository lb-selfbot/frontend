import React from "react";

import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import FormControl from "@mui/material/FormControl/FormControl";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import Dialog from "@mui/material/Dialog/Dialog";
import Chip from "@mui/material/Chip/Chip";
import Box from "@mui/material/Box/Box";

import AddIcon from "@mui/icons-material/Add";

import { Material3Button } from "../Material3Button";
import { TextFieldTooltip } from "../TextFieldTooltip";

import { useConfig } from "../../hooks/useConfig";
import { useModal } from "mui-modal-provider";

import { commandsList } from "../../config/commands";
import { wsData } from "../../wsData/wsData";

import dashStyles from "../../styles/Dashboard.module.css";

function CommandChip(props) {
  let { command, commands, set, onDelete, onConfigUpdate } = props;

  const onChipDelete = () => {
    commands = commands.filter((s) => s !== command);
    onDelete(commands);

    wsData.setConfig(set(wsData.config, commands));
    onConfigUpdate();
  };
  return <Chip label={command} sx={{ margin: 1 }} onDelete={onChipDelete} />;
}

function CommandSelectionModal({ name, get, set, onConfigUpdate }) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [commandAddValue, setCommandAddValue] = React.useState("");
  const [commands, setCommands] = React.useState(get(wsData.config));

  const closeDialog = () => setDialogOpen(false);

  const onCommandAddValueChange = (event) => {
    setCommandAddValue(event.target.value);
  };

  const onCommandAdd = (event) => {
    event.preventDefault();

    if (!commandsList.includes(commandAddValue)) return;

    var commands = get(wsData.config);

    if (commands.includes(commandAddValue)) return;

    commands.push(commandAddValue);

    wsData.setConfig(set(wsData.config, commands));
    onConfigUpdate();

    setCommands(commands);
    setCommandAddValue("");
  };

  const inputAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={onCommandAdd}>{<AddIcon />}</IconButton>
    </InputAdornment>
  );

  const commandChips = commands.map((command) => (
    <CommandChip
      command={command}
      commands={commands}
      set={set}
      onDelete={(commands) => setCommands(commands)}
      onConfigUpdate={onConfigUpdate}
      key={command}
    />
  ));

  const labelId = `${name}-label`;

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Typography variant="h6" p={1}>
          Commands
        </Typography>

        <Box flexWrap="wrap" mb={1}>
          {commandChips}
        </Box>

        <FormControl fullWidth>
          <InputLabel id={labelId}>{name}</InputLabel>
          <Select
            labelId={labelId}
            value={commandAddValue}
            label={name}
            onChange={onCommandAddValueChange}
            endAdornment={inputAdornment}
          >
            {commandsList.map((command) => (
              <MenuItem key={command} value={command}>
                {command}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function CommandSelection(props) {
  const [modal, setModal] = React.useState(null);
  const { showModal } = useModal();
  const { config } = useConfig();

  const { name, info, get, set, onConfigUpdate } = props;

  const handleTextFieldFocus = (event) => {
    event.preventDefault();

    if (modal !== null) {
      // If there is already a modal open, close it
      modal.destroy();
      setModal(null);
      event.target.blur();
      return;
    }

    const _modal = showModal(CommandSelectionModal, {
      name: name,
      get: get,
      set: set,
      onConfigUpdate: onConfigUpdate,
    });

    setModal(_modal);
  };

  const _getLabel = () => {
    const length = (get(config) || []).length;
    return `${length} command${length === 1 ? "" : "s"} selected`;
  };

  return (
    <TextFieldTooltip
      variant="filled"
      fullWidth
      tooltip={info}
      label={name}
      value={_getLabel()}
      inputProps={{ onFocus: handleTextFieldFocus }}
    />
  );
}

export default CommandSelection;
