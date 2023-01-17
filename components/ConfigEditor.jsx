import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { TextFieldTooltip } from "./TextFieldTooltip";
import InfoButton from "./InfoButton";

import useWebSocket from "react-use-websocket";
import { useConfig } from "../hooks/useConfig";

import { WS_URL } from "../config/config";
import { wsData } from "../wsData/wsData";

import ServerProtections from "./config/ServerProtections";
import ServerSelection from "./config/ServerSelection";
import UserSelection from "./config/UserSelection";
import TextSelection from "./config/TextSelection";
import CommandSelection from "./config/CommandSelection";
import CategorySelection from "./config/CategorySelection";

import dashStyles from "../styles/Dashboard.module.css";
import loginStyles from "../styles/Login.module.css";

function ConfigFieldContainer(props) {
  const { children, ...other } = props;
  return (
    <Grid item xs={12} md={5} maxHeight="70px" width={363}>
      <Box {...other}>{children}</Box>
    </Grid>
  );
}

function ConfigField(props) {
  const [value, setValue] = React.useState(null);

  const { field, fieldValue, onConfigUpdate } = props;

  React.useEffect(() => {
    if (fieldValue !== undefined) {
      setValue(fieldValue);
    }
  }, [fieldValue]);

  const name = field.name;
  const set = field.set;
  const info = field.info;

  let onChange = () => {};

  switch (field.type) {
    case "text":
    case "url":
      onChange = (newValue) => {
        setValue(newValue.target.value);

        wsData.setConfig(set(wsData.config, newValue.target.value));
        onConfigUpdate();
      };

      return (
        <ConfigFieldContainer key={name}>
          <TextFieldTooltip
            variant="filled"
            fullWidth
            label={name}
            tooltip={info}
            value={value ?? ""}
            onChange={onChange}
            className={loginStyles.input}
          />
        </ConfigFieldContainer>
      );

    case "number":
      onChange = (newValue) => {
        wsData.setConfig(set(wsData.config, parseInt(newValue.target.value)));

        setValue(newValue.target.value);
        onConfigUpdate();
      };

      return (
        <ConfigFieldContainer key={name}>
          <TextFieldTooltip
            variant="filled"
            fullWidth
            type="number"
            label={name}
            tooltip={info}
            value={value ?? 0}
            onChange={onChange}
            className={loginStyles.input}
          />
        </ConfigFieldContainer>
      );

    case "switch":
      onChange = (newValue) => {
        wsData.setConfig(set(wsData.config, newValue.target.checked));

        setValue(newValue.target.checked);
        onConfigUpdate();
      };

      const configSwitch = (
        <Switch checked={value ?? false} onChange={onChange} />
      );

      return (
        <ConfigFieldContainer key={name}>
          <FormControl fullWidth className={loginStyles.input}>
            <Box className={dashStyles.configSwitchContainer}>
              <FormControlLabel
                className={dashStyles.configSwitch}
                control={configSwitch}
                label={name}
              />
              <InfoButton info={info} />
            </Box>
          </FormControl>
        </ConfigFieldContainer>
      );

    case "dropdown":
      onChange = (newValue) => {
        wsData.setConfig(set(wsData.config, newValue.target.value));

        setValue(newValue.target.value);
        onConfigUpdate();
      };

      const labelId = `${name}-label`;

      const endAdornment = (
        <InputAdornment position="end" sx={{ marginRight: 1 }}>
          <InfoButton info={info} />
        </InputAdornment>
      );

      const items = field.options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ));

      return (
        <ConfigFieldContainer key={name}>
          <FormControl fullWidth>
            <InputLabel id={labelId}>{name}</InputLabel>
            <Select
              labelId={labelId}
              value={value ?? field.options[0].value}
              label={name}
              onChange={onChange}
              endAdornment={endAdornment}
            >
              {items}
            </Select>
          </FormControl>
        </ConfigFieldContainer>
      );

    case "server_protections_dialog":
      const serverProtections = wsData.config.Protections?.ServerProtections;

      return (
        <ConfigFieldContainer key={name}>
          <ServerProtections
            info={info}
            antiDelete={serverProtections?.AntiDelete}
            antiInvite={serverProtections?.AntiInvite}
            antiSpam={serverProtections?.AntiSpam}
            antiUpper={serverProtections?.AntiUpper}
            protectedServers={serverProtections?.ProtectedServers}
            onConfigUpdate={onConfigUpdate}
          />
        </ConfigFieldContainer>
      );

    case "server_selection_dialog":
      return (
        <ConfigFieldContainer key={name}>
          <ServerSelection
            name={name}
            info={info}
            get={field.get}
            set={field.set}
            selectedServers={value}
            onConfigUpdate={onConfigUpdate}
          />
        </ConfigFieldContainer>
      );

    case "user_selection_dialog":
      return (
        <ConfigFieldContainer key={name}>
          <UserSelection
            name={name}
            info={info}
            get={field.get}
            set={field.set}
            selectedUsers={value}
            onConfigUpdate={onConfigUpdate}
          />
        </ConfigFieldContainer>
      );

    case "text_selection_dialog":
      return (
        <ConfigFieldContainer key={name}>
          <TextSelection
            name={name}
            info={info}
            get={field.get}
            set={field.set}
            selectedTexts={value}
            onConfigUpdate={onConfigUpdate}
          />
        </ConfigFieldContainer>
      );

    case "command_selection_dialog":
      return (
        <ConfigFieldContainer key={name}>
          <CommandSelection
            name={name}
            info={info}
            get={field.get}
            set={field.set}
            selectedCommands={value}
            onConfigUpdate={onConfigUpdate}
          />
        </ConfigFieldContainer>
      );

    case "category_selection_dialog":
      return (
        <ConfigFieldContainer key={name}>
          <CategorySelection
            name={name}
            info={info}
            get={field.get}
            set={field.set}
            selectedCategories={value}
            onConfigUpdate={onConfigUpdate}
          />
        </ConfigFieldContainer>
      );
  }

  return null;
}

function ConfigEditor({ fields }) {
  const { sendJsonMessage } = useWebSocket(WS_URL, { share: true });
  const [fieldValues, setFieldValues] = React.useState({});
  const { config } = useConfig();

  React.useEffect(() => {
    const newFieldValues = {};

    for (const field of fields) {
      newFieldValues[field.name] = field.get(config);
    }

    setFieldValues(newFieldValues);
  }, [fields, config]);

  const onConfigUpdate = () => {
    const data = { config: wsData.config };
    sendJsonMessage({ op: "CONFIG_UPDATE", data: data });
  };

  return (
    <Grid container spacing={4} rowSpacing={1} justifyContent="center">
      {fields.map((field, index) => (
        <ConfigField
          field={field}
          fieldValue={fieldValues[field.name]}
          onConfigUpdate={onConfigUpdate}
          key={index}
        />
      ))}
    </Grid>
  );
}

export { ConfigEditor };
