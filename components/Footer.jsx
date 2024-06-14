import React from "react";

import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container/Container";
import Divider from "@mui/material/Divider/Divider";
import Box from "@mui/material/Box/Box";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Footer.module.css";

import logo from "../public/logo.png";

function Footer() {
  return (
    <Box component="footer" py={6} mt={3} bgcolor="background.paper">
      <Container maxWidth="lg">
        <Box component={Link} href="/" className={styles.footerContainer}>
          <Image src={logo} alt="LightningBot Logo" height={55} width={55} />
          <Typography variant="h6" align="center">
            LightningBot
          </Typography>
        </Box>

        <Divider mb={2} />

        <Typography variant="subtitle1" align="center" component="p">
          Copyright © 2020 - {new Date().getFullYear()} lightning-bot.com | All
          Rights Reserved
        </Typography>
      </Container>
    </Box>
  );
}

export { Footer };
