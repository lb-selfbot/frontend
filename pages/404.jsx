import React from "react";

import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Link from "next/link";

import { Material3Button } from "../components/Material3Button";
import { NotFoundIcon } from "../components/icons/NotFound";

import pageStyles from "../styles/Page.module.css";
import styles from "../styles/NotFound.module.css";

export default function NotFound(props) {
  return (
    <Box className={pageStyles.pageContainer}>
      <Box className={pageStyles.pageContent}>
        <Typography variant="h2" className={styles.title}>
          404
        </Typography>
        <Typography
          variant="body1"
          alignContent="center"
          className={styles.description}
        >
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>
        <NotFoundIcon />
        <Material3Button variant="contained" LinkComponent={Link} href="/">
          Go To Home
        </Material3Button>
      </Box>
    </Box>
  );
}
