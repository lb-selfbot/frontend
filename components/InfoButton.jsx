import React from "react";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import InfoIcon from "@mui/icons-material/Info";

function InfoButton({ info }) {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const tooltipTitle = (
    <Typography fontFamily="Inter" fontSize="0.9rem">
      {info}
    </Typography>
  );

  return (
    <Tooltip
      title={tooltipTitle}
      placement="top"
      open={open}
      onOpen={toggleOpen}
      onClose={toggleOpen}
    >
      <IconButton onClick={handleClick}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
}

export default InfoButton;
