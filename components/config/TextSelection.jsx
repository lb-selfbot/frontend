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

function TextChip({ text, texts, set, onDelete, onConfigUpdate }) {
  return (
    <Chip
      label={text}
      sx={{ margin: 1 }}
      onDelete={() => {
        texts = texts.filter((s) => s !== text);
        wsData.setConfig(set(wsData.config, texts));
        onConfigUpdate();
        onDelete(texts);
      }}
    />
  );
}

function TextSelectionModal({ name, get, set, onConfigUpdate }) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [textAddText, setTextAddText] = React.useState("");
  const [texts, setTexts] = React.useState(get(wsData.config));

  const closeDialog = () => setDialogOpen(false);

  const onTextAddTextChange = (event) => {
    setTextAddText(event.target.value);
  };

  const onTextAdd = (event) => {
    event.preventDefault();

    if (textAddText === "") return;

    var texts = get(wsData.config);

    if (texts.includes(textAddText)) return;

    texts.push(textAddText);

    wsData.setConfig(set(wsData.config, texts));
    onConfigUpdate();

    setTexts(texts);
    setTextAddText("");
  };

  const inputAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={onTextAdd}>
        <AddIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Typography variant="h6" sx={{ padding: 1 }}>
          Entries
        </Typography>

        <Box sx={{ flexWrap: "wrap", marginBottom: 1 }}>
          {texts.map((text) => (
            <TextChip
              text={text}
              texts={texts}
              set={set}
              onDelete={(texts) => setTexts(texts)}
              onConfigUpdate={onConfigUpdate}
              key={text}
            />
          ))}
        </Box>

        <TextField
          variant="filled"
          label="Entry"
          InputProps={{ endAdornment: inputAdornment }}
          value={textAddText}
          onChange={onTextAddTextChange}
        />
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function TextSelection({
  name,
  info,
  selectedTexts,
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

    const _modal = showModal(TextSelectionModal, {
      name: name,
      get: get,
      set: set,
      onConfigUpdate: onConfigUpdate,
    });
    setModal(_modal);
  };

  const _getLabel = () => {
    const length = (get(config) || []).length;
    return `${length} entr${length === 1 ? "y" : "ies"} selected`;
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

export default TextSelection;
