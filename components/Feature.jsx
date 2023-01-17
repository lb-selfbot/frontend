import React from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";

import styles from "../styles/Feature.module.css";

function FeatureContainer(props) {
  const { children } = props;

  return (
    <Box width="100%">
      <Box className={styles.featuresContainer}>
        <Grid container spacing={2}>
          {children}
        </Grid>
      </Box>
    </Box>
  );
}

function Feature(props) {
  const { icon, title, text } = props;

  return (
    <Grid item xs={12} md={4} className={styles.featuresGridItem}>
      <Box className={styles.featureContainer}>
        <Avatar className={styles.featureIcon}>{icon}</Avatar>
        <Typography
          variant="h6"
          alignContent="center"
          gutterBottom
          className={styles.featureTitle}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          alignContent="center"
          className={styles.featureDescription}
        >
          {text}
        </Typography>
      </Box>
    </Grid>
  );
}

Feature.Container = FeatureContainer;

export { Feature };
