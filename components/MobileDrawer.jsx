import React from "react";

import List from "@mui/material/List/List";
import Subheader from "@mui/material/ListSubheader/ListSubheader";

import { LeftNavItem } from "./NavItem";

import useUser from "../hooks/useUser";

import { getNavButtons } from "../config/navButtons";

function MobileDrawer(props) {
  const user = useUser();

  const navButtons = getNavButtons(user);

  const { handleLeftNavItemClick } = props;

  return (
    <List sx={{ pb: 10, height: "100%", backgroundColor: "#121212" }}>
      <Subheader>General</Subheader>
      {navButtons.map(({ text, icon, to }) => (
        <LeftNavItem
          key={text}
          text={text}
          icon={icon}
          href={to}
          onClick={handleLeftNavItemClick}
        />
      ))}
    </List>
  );
}

export { MobileDrawer };
