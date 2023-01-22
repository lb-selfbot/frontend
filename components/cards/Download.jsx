import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

import { Material3Button } from "../Material3Button";
import InfoButton from "../InfoButton";
import { Card } from "../Card";

import useUser from "../../hooks/useUser";

import {
  osOptions,
  osInfo,
  archOptions,
  archInfo,
  typeOptions,
  typeInfo,
} from "../../config/downloadOptions";
import { classes } from "../../utils/classes";

import dashStyles from "../../styles/Dashboard.module.css";
import homeStyles from "../../styles/Home.module.css";
import faqStyles from "../../styles/FAQ.module.css";

function DownloadDropdown(props) {
  const { label, labelId, value, onValueChange, options, info } = props;

  const infoButton = (
    <InputAdornment position="end" sx={{ marginRight: 1 }}>
      <InfoButton info={info} />
    </InputAdornment>
  );

  return (
    <Grid item xs={12} sm={6} md={4}>
      <FormControl fullWidth sx={{ textAlign: "left" }}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          value={value ?? options[0].value}
          label={label}
          onChange={onValueChange}
          endAdornment={infoButton}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

function OSDropdown(props) {
  const { value, onChange } = props;

  return (
    <DownloadDropdown
      label="Operating System"
      labelId="operating-system-label"
      value={value}
      onValueChange={onChange}
      options={osOptions}
      info={osInfo}
    />
  );
}

function ArchDropdown(props) {
  let { value, osValue, onChange } = props;

  osValue = osValue ?? "windows";

  return (
    <DownloadDropdown
      label="Architecture"
      labelId="architecture-label"
      value={value}
      onValueChange={onChange}
      options={archOptions[osValue]}
      info={archInfo[osValue]}
    />
  );
}

function TypeDropdown(props) {
  let { value, osValue, onChange } = props;

  osValue = osValue ?? "windows";

  return (
    <DownloadDropdown
      label="Type"
      labelId="type-label"
      value={value}
      onValueChange={onChange}
      options={typeOptions[osValue]}
      info={typeInfo}
    />
  );
}

export function Download() {
  const [osValue, setOSValue] = React.useState("windows");
  const [archValue, setArchValue] = React.useState("amd64");
  const [typeValue, setTypeValue] = React.useState("ui");
  const user = useUser();

  const onOSChange = (event) => {
    const value = event.target.value;
    setOSValue(value);
    setArchValue(archOptions[value][0].value);
    setTypeValue(typeOptions[value][0].value);
  };

  const onArchChange = (event) => {
    setArchValue(event.target.value);
  };

  const onTypeChange = (event) => {
    setTypeValue(event.target.value);
  };

  // Build and open the download URL
  const onDownloadClick = (_event) => {
    let url = `https://api.lightning-bot.com/static/executables/${osValue}`;

    if (osValue === "windows") {
      url += `/${archValue}/${typeValue}.exe`;
    } else if (osValue === "macos") {
      url += `/${typeValue}${typeValue === "ui" ? ".dmg" : ""}`;
    } else if (osValue === "linux") {
      url += `/${archValue}/${typeValue}${typeValue === "ui" ? ".deb" : ""}`;
    }

    window.open(url, "_blank");
  };

  const premiumOnly = {
    display: user.key !== "None" ? "block" : "none",
  };

  const titleClasses = classes([
    homeStyles.landingTitleGradient,
    faqStyles.faqTitle,
  ]);

  return (
    <>
      <Grid item xs={12} mt={1} sx={premiumOnly}>
        <Typography variant="h4" className={titleClasses}>
          Download
        </Typography>
      </Grid>

      <Card.Container xs={12} sm={12} md={12} lg={12} sx={premiumOnly}>
        <Card.MuiCard>
          <CardContent className={dashStyles.itemContainer}>
            <Typography variant="h4" className={dashStyles.itemTitle}>
              Download
            </Typography>

            <Typography variant="body1" mb={2}>
              Select your system configuration to download the correct file.
            </Typography>

            <Grid container spacing={4}>
              <OSDropdown value={osValue} onChange={onOSChange} />

              <ArchDropdown
                value={archValue}
                osValue={osValue}
                onChange={onArchChange}
              />

              <TypeDropdown
                value={typeValue}
                osValue={osValue}
                onChange={onTypeChange}
              />
            </Grid>

            <Material3Button
              variant="contained"
              sx={{ marginTop: 6 }}
              onClick={onDownloadClick}
            >
              Start Download
            </Material3Button>
          </CardContent>
        </Card.MuiCard>
      </Card.Container>
    </>
  );
}
