import React from "react";

import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardActions,
  CardHeader,
  CardContent,
} from "@mui/material";

import Link from "next/link";

import { CheckCircleOutline } from "@mui/icons-material";

import { pricingTiers } from "../config/pricingTiers.js";

import useUser from "../hooks/useUser.js";

import styles from "../styles/Pricing.module.css";

function PricingCard(props) {
  const user = useUser();

  const {
    title,
    price,
    description,
    buttonText,
    buttonVariant,
    recommended,
    link,
  } = props.tier;

  let linkTo = user.ready && user.loggedIn ? "/dashboard" : "/signup";

  if (link !== "") {
    linkTo = link;
  }

  return (
    <Card className={styles.pricingCard}>
      <CardHeader
        title={title}
        titleTypographyProps={{ align: "center" }}
        subheader={recommended ? "Most Popular" : ""}
        subheaderTypographyProps={{ align: "center" }}
      />

      <CardContent>
        <Box className={styles.priceContainer}>
          <Typography variant="h5" color="text.primary">
            €
          </Typography>
          <Typography variant="h3" color="text.primary">
            {price}
          </Typography>
        </Box>

        {description.map((line) => (
          <Box display="flex" margin="2px" gap="10px" key={line}>
            <CheckCircleOutline htmlColor="#1976d2" />
            <Typography variant="subtitle1" fontSize="15px">
              {line}
            </Typography>
          </Box>
        ))}
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant={buttonVariant}
          color="lightBlue"
          LinkComponent={Link}
          target={linkTo.startsWith("http") ? "_blank" : "_self"}
          href={linkTo}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}

function Pricing() {
  return (
    <Container maxWidth="md" sx={{ paddingY: 5 }}>
      <Grid container spacing={5} alignItems="flex-end">
        {pricingTiers.map((tier, i) => (
          <Grid item key={tier.title} xs={12} sm={i === 2 ? 12 : 6} md={4}>
            <PricingCard tier={tier} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export { Pricing };
