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
import Divider from "@mui/material/Divider";

import AddIcon from "@mui/icons-material/Add";

import { Material3Button } from "../Material3Button";
import { TextFieldTooltip } from "../TextFieldTooltip";

import { useConfig } from "../../hooks/useConfig";
import { useModal } from "mui-modal-provider";

import { wsData } from "../../wsData/wsData";

import dashStyles from "../../styles/Dashboard.module.css";
import { ConfigEditor } from "../ConfigEditor";

function TriggerListModal({ name, get, set, onConfigUpdate }) {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [triggerList, setTriggerList] = React.useState(get(wsData.config));
  const [triggerType, setTriggerType] = React.useState(
    get(wsData.config)?.Type ?? ""
  );

  console.log(wsData.config, triggerList);

  const closeDialog = () => setDialogOpen(false);

  const userText =
    triggerType === "Whitelist" ? "Allowed Users" : "Ignored Users";
  const serverText =
    triggerType === "Whitelist" ? "Allowed Servers" : "Ignored Servers";

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Box className={dashStyles.itemContainer} sx={{ margin: 1 }}>
          <ConfigEditor
            fields={[
              {
                name: "Trigger List Type",
                type: "dropdown",
                info: "The type of trigger list to use.",
                get: (config) => triggerList?.Type ?? "Global",
                set: (config, value) => {
                  if (triggerList === null) setTriggerList(get(wsData.config));

                  triggerList.Type = value;
                  setTriggerList(triggerList);
                  setTriggerType(value);
                  return set(wsData.config, triggerList);
                },
                options: [
                  {
                    label: "Global",
                    value: "Global",
                  },
                  {
                    label: "Whitelist",
                    value: "Whitelist",
                  },
                  {
                    label: "Blacklist",
                    value: "Blacklist",
                  },
                ],
              },
            ]}
          />
        </Box>

        <Divider sx={{ margin: 2 }} />

        <Box className={dashStyles.itemContainer} sx={{ margin: 1 }}>
          {triggerType === "Global" && (
            <Typography variant="body1">
              Every message or event will trigger in global mode. There are no
              configuration options for this trigger type.
            </Typography>
          )}

          {triggerType !== "Global" && (
            <ConfigEditor
              fields={[
                {
                  name: userText,
                  type: "user_selection_dialog",
                  info: "",
                  get: (config) => triggerList?.Users ?? [],
                  set: (config, value) => {
                    if (triggerList === null)
                      setTriggerList(get(wsData.config));

                    triggerList.Users = value;
                    setTriggerList(triggerList);
                    return set(wsData.config, triggerList);
                  },
                },
                {
                  name: serverText,
                  type: "server_selection_dialog",
                  info: "",
                  get: (config) => triggerList?.Servers ?? [],
                  set: (config, value) => {
                    if (triggerList === null)
                      setTriggerList(get(wsData.config));

                    triggerList.Servers = value;
                    setTriggerList(triggerList);
                    return set(wsData.config, triggerList);
                  },
                },
              ]}
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function TriggerList({ name, info, triggerList, get, set, onConfigUpdate }) {
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

    const _modal = showModal(TriggerListModal, {
      name: name,
      get: get,
      set: set,
      onConfigUpdate: onConfigUpdate,
    });
    setModal(_modal);
  };

  const _getLabel = () => {
    return `Type: ${triggerList?.Type ?? "Unknown"}`;
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

export default TriggerList;
