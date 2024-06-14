import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ConstructionIcon } from "../../components/icons/Construction";

import { MAINTENANCE } from "../../config/config.js";

import iconStyles from "../../styles/Icon.module.css";
import pageStyles from "../../styles/Page.module.css";
import styles from "../../styles/NotFound.module.css";

export const runtime = 'experimental-edge';

export default function Maintenance(props) {
  return (
    <Box className={pageStyles.pageContainer}>
      <Box className={pageStyles.pageContent}>
        <Typography variant="h2" className={styles.title}>
          Under Maintenance
        </Typography>
        <Typography
          variant="body1"
          alignContent="center"
          className={styles.description}
        >
          We are currently working hard on this page. Please check back later!
        </Typography>

        <Box className={iconStyles.iconContainer}>
          <ConstructionIcon />
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  if (!MAINTENANCE) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
