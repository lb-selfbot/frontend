import React from "react";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";

import { useScrollTrigger } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { MobileDrawer } from "./MobileDrawer";
import { NavItem } from "./NavItem";

import useUser from "../hooks/useUser";

import { getNavButtons } from "../config/navButtons";
import { classes } from "../utils/classes";

import logo from "../public/logo.png";

import styles from "../styles/App.module.css";

const drawerWidth = 270;

function App(props) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [leftNavElement, setLeftNavElement] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const user = useUser();

  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const { Component, pageProps } = props;

  React.useEffect(() => {
    const message = router.query["message"];
    if (!message) return;

    setTimeout(() => {
      enqueueSnackbar(message, { variant: "success" });
    }, 500);
  }, [router.query, enqueueSnackbar]);

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const mobileDrawerStyle = {
    display: { xs: "block", md: "none" },
    "& .MuiDrawer-paper": {
      //boxSizing: "border-box",
      width: drawerWidth,
      marginTop: isScrolled ? "70px" : "90px",
    },
  };

  const topBarContainerClasses = classes([
    styles.topBarContainer,
    isScrolled && styles.scrolled,
  ]);

  const iconContainerClasses = classes([
    styles.iconContainer,
    isScrolled && styles.scrolled,
  ]);

  const navButtons = getNavButtons(user);

  // If navButtons is empty, we probably don't want to link to the homepage
  // COMING_SOON or MAINTENANCE is probably set
  const logoHref = navButtons.length > 0 ? "/" : "";

  return (
    <Box className={styles.mainContainer}>
      {/* Top Bar */}
      <Box className={topBarContainerClasses}>
        <Box className={styles.topBarContent}>
          {leftNavElement ?? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link href={logoHref} className={styles.logoLink}>
            <Box className={iconContainerClasses}>
              <Image
                src={logo}
                alt="LightningBot logo"
                height={65}
                width={65}
              />
            </Box>

            <Box className={styles.productNameContainer}>
              <Typography variant="h2" className={styles.productName}>
                LightningBot
              </Typography>
            </Box>
          </Link>

          <Box className={styles.spacer} />

          {/* Navigation */}
          <Box className={styles.navContainer}>
            {navButtons.map(({ text, to }) => (
              <NavItem key={text} text={text} href={to} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Mobile Navigation */}
      <Box display="flex">
        <nav style={{ width: drawerWidth, flexShrink: 0 }}>
          <Drawer
            variant="temporary"
            open={mobileDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={mobileDrawerStyle}
          >
            <MobileDrawer handleLeftNavItemClick={handleDrawerToggle} />
          </Drawer>
        </nav>
      </Box>

      {/* Content */}
      <main>
        <Component setLeftNavElement={setLeftNavElement} {...pageProps} />
      </main>
    </Box>
  );
}

export default App;
