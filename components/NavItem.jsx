import React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Link from "next/link";

import { useRouter } from "next/router";

import { classes } from "../utils/classes";

import styles from "../styles/NavItem.module.css";

function NavItem({ text, href }) {
  const router = useRouter();
  var selected = router.pathname === href;

  if (text === "Dashboard" && router.pathname.startsWith("/dashboard")) {
    selected = true;
  }

  const navLinkClasses = classes([styles.navItem, selected && styles.active]);

  return (
    <Box className={styles.navItemContainer}>
      <Link href={href} className={styles.navLink}>
        <Typography variant="h6" className={navLinkClasses}>
          {text}
        </Typography>
      </Link>
    </Box>
  );
}

function LeftNavItem({ text, icon, href, onClick }) {
  const router = useRouter();
  let selected = router.pathname === href;

  if (text === "Dashboard" && router.pathname.startsWith("/dashboard")) {
    selected = true;
  }

  const buttonClasses = classes([
    styles.leftNavButton,
    selected && styles.active,
  ]);

  return (
    <ListItem disablePadding className={styles.leftNavItem}>
      <ListItemButton
        component={Link}
        href={href}
        onClick={onClick}
        className={buttonClasses}
      >
        <ListItemIcon>
          {icon({ htmlColor: selected ? "#eee" : "#96A6B4" })}
        </ListItemIcon>

        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export { NavItem, LeftNavItem };
