import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useTheme } from "@mui/material/styles";

import styles from "../styles/Card.module.css";
import { classes } from "../utils/classes";

function CardContainer(props) {
  let { xs, sm, md, lg, sx, children } = props;

  xs = xs || 12;
  sm = sm || 6;
  lg = lg || 3;

  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      sx={sx}
      className={styles.container}
    >
      {children}
    </Grid>
  );
}

function CardMuiCard(props) {
  const theme = useTheme();

  let { sx, children, ...otherProps } = props;

  sx = {
    backgroundColor: theme.palette.common.card.background,
    ...sx,
  };

  const muiCardClasses = classes([styles.muiCard, props.className]);

  return (
    <MuiCard {...otherProps} sx={sx} className={muiCardClasses}>
      {children}
    </MuiCard>
  );
}

function Card(props) {
  const theme = useTheme();

  const { title, content, icon, xs, sm, lg, sx } = props;

  return (
    <CardContainer xs={xs} sm={sm} lg={lg} sx={sx}>
      <CardMuiCard>
        <Box className={styles.iconContainer}>{icon}</Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="subtitle2"
              color={theme.palette.common.card.title}
              fontWeight={400}
              mb={1}
              sx={{ fontFamily: "Inter" }}
            >
              {title}
            </Typography>
            <Typography
              component="div"
              variant="h6"
              color={theme.palette.common.card.content}
              fontWeight={400}
              sx={{
                wordBreak: "break-word",
                lineHeight: "1",
                fontFamily: "Inter",
              }}
              fontSize="20px"
            >
              {content}

              {props.children}
            </Typography>
          </CardContent>
        </Box>
      </CardMuiCard>
    </CardContainer>
  );
}

Card.Container = CardContainer;
Card.MuiCard = CardMuiCard;

export { Card };
