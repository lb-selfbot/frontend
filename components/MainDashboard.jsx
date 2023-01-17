import React from "react";

import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

import MenuIcon from "@mui/icons-material/Menu";

import { SelfbotConnectedModal } from "./modals/SelfbotConnected";
import { LeftNavItem } from "./NavItem";
import { Subheader } from "./Subheader";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import useWebSocket from "react-use-websocket";
import { useModal } from "mui-modal-provider";
import { useSnackbar } from "notistack";
import useUser from "../hooks/useUser";

import { getDashboardNavButtons } from "../config/navButtons";
import { wsData } from "../wsData/wsData";
import { WS_URL } from "../config/config";

import styles from "../styles/Dashboard.module.css";

const drawerWidth = 270;

function onWebsocketMessage(rawMessage, enqueueSnackbar, showModal) {
  const message = JSON.parse(rawMessage.data);
  const data = message.data;

  switch (message.op) {
    case "SELFBOT_CONNECT":
      wsData.setSelfbotConnected(true);

      showModal(SelfbotConnectedModal, {
        computerName: data.computer_name,
      });

      if (data.console_text !== "") {
        wsData.setConsole(data.console_text);
      }
      break;
    case "SELFBOT_DISCONNECT":
      wsData.setSelfbotConnected(false);
      wsData.setConsole(
        '<text Color="#C1EFFF">Waiting for connection...</text>'
      );

      enqueueSnackbar("Selfbot disconnected", { variant: "info" });
      break;
    case "CONSOLE_APPEND":
      wsData.appendConsole(data.text);
      break;
    case "CONSOLE_CLEAR":
      wsData.setConsole("");
      break;
    case "CONSOLE_SET":
      wsData.setConsole(data.text);
      break;
    case "CONFIG_UPDATE":
      wsData.setConfig(data.config);
      break;
  }
}

function onWebsocketClose(event, enqueueSnackbar) {
  if (!wsData.selfbotConnected) {
    return;
  }

  console.log(event);

  wsData.setSelfbotConnected(false);
  wsData.setConsole('<text Color="#C1EFFF">Waiting for connection...</text>');

  enqueueSnackbar("Selfbot disconnected", { variant: "info" });
}

function getSubheaderDisplay(user, subHeader) {
  if (subHeader === "General") {
    // Hide the General category on desktop (it's redundant)
    return { xs: "block", md: "none" };
  } else if (subHeader === "Admin") {
    // Hide the Admin category if the user isn't an admin
    return user.isStaff ? "block" : "none";
  } else {
    return "block";
  }
}

function MainDashboard(props) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const { showModal } = useModal();
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const { enqueueSnackbar } = useSnackbar();

  const user = useUser();

  const WS_OPTIONS = React.useMemo(
    () => ({
      onOpen: () => console.log("Connected to websocket"),
      onClose: (e) => onWebsocketClose(e, enqueueSnackbar),
      onMessage: (e) => onWebsocketMessage(e, enqueueSnackbar, showModal),
      retryOnError: true,
      reconnectInterval: 1000,
      share: true,
    }),
    [enqueueSnackbar, showModal]
  );

  useWebSocket(WS_URL, WS_OPTIONS);

  const { children, setLeftNavElement } = props;

  const handleDrawerToggle = React.useCallback(() => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  }, [mobileDrawerOpen]);

  const handleLeftNavItemClick = () => {
    setMobileDrawerOpen(false);
  };

  React.useEffect(() => {
    setLeftNavElement(
      <IconButton
        color="inherit"
        aria-label="open navigation drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
    );

    return () => setLeftNavElement(null);
  }, [handleDrawerToggle, setLeftNavElement]);

  if (user.ready && !user.loggedIn) {
    window.location.assign(
      "/login?message=You+must+be+logged+in+to+access+the+dashboard!"
    );
  }

  const navContainerStyle = {
    width: { md: drawerWidth },
    flexShrink: { md: 0 },
    mt: { md: 90 },
  };

  const mobileDrawerStyle = {
    display: { xs: "block", md: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      marginTop: isScrolled ? "70px" : "90px",
    },
  };

  const desktopDrawerStyle = {
    display: { xs: "none", md: "block" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      marginTop: isScrolled ? "70px" : "90px",
      zIndex: 1,
      transition: "margin-top 0.15s ease-in-out",
    },
  };

  const mainContainerStyle = {
    flexGrow: 1,
    p: 3,
    width: { md: `calc(100% - ${drawerWidth}px)` },
    marginTop: isScrolled ? "70px" : "90px",
    overflow: "hidden",
  };

  const navButtons = getDashboardNavButtons(user);

  const navButtonItems = Object.keys(navButtons).map((subHeader, i) => (
    <Box display={getSubheaderDisplay(user, subHeader)} key={i}>
      <Subheader key={i}>{subHeader}</Subheader>
      {navButtons[subHeader].map(({ text, icon, to }) => (
        <LeftNavItem
          href={to}
          text={text}
          icon={icon}
          onClick={handleLeftNavItemClick}
          key={text}
        />
      ))}
    </Box>
  ));

  const drawer = <List className={styles.drawerList}>{navButtonItems}</List>;

  return (
    <Box display="flex">
      <Box component="nav" sx={navContainerStyle}>
        <Drawer
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={mobileDrawerStyle}
        >
          {drawer}
        </Drawer>

        <Drawer open variant="permanent" sx={desktopDrawerStyle}>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={mainContainerStyle}>
        {children}
      </Box>
    </Box>
  );
}

export { MainDashboard };
