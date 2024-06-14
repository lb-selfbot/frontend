import React from "react";

import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";

import Countdown from "../../components/Countdown";
import { ComingSoonIcon } from "../../components/icons/ComingSoon";

import { COMING_SOON, COMING_SOON_DATE } from "../../config/config.js";

import iconStyles from "../../styles/Icon.module.css";
import pageStyles from "../../styles/Page.module.css";
import styles from "../../styles/NotFound.module.css";

export default function ComingSoon(props) {
  if (!COMING_SOON) {
    if (window !== undefined) {
      window.location.href = "/";
    }

    return null;
  }

  return (
    <Box className={pageStyles.pageContainer}>
      <Box className={pageStyles.pageContent}>
        <Typography variant="h2" className={styles.title}>
          Coming Soon
        </Typography>
        <Typography
          variant="body1"
          alignContent="center"
          className={styles.description}
        >
          We are currently working hard on this page. Please check back later!
        </Typography>

        <Box className={iconStyles.iconContainer}>
          <ComingSoonIcon />
        </Box>

        <Countdown date={COMING_SOON_DATE} />
      </Box>
    </Box>
  );
}
