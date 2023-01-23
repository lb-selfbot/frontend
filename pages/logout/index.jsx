import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import useUser from "../../hooks/useUser";
import { api } from "../../api/api";

import Router from "next/router";

import pageStyles from "../../styles/Page.module.css";
import styles from "../../styles/NotFound.module.css";

export default function Logout(props) {
  const [loggingOut, setLoggingOut] = React.useState(false);
  const user = useUser();

  if (user.ready && !user.loggedIn) {
    Router.push("/?message=You are already logged out!");
  }

  React.useEffect(() => {
    if (loggingOut) return;

    setLoggingOut(true);

    api.Logout().then((apiResponse) => {
      if (apiResponse.success) {
        Router.push("/?message=Successfully logged out!");
      } else {
        const error = apiResponse.json?.message ?? "An unknown error occurred";
        Router.push(`/?message=${error}`);
      }
    });
  }, []);

  return (
    <Box className={pageStyles.pageContainer}>
      <Box className={pageStyles.pageContent}>
        <Typography variant="h2" className={styles.title}>
          Logging out...
        </Typography>
        <Typography
          variant="body1"
          alignContent="center"
          className={styles.description}
        >
          Please wait...
        </Typography>
      </Box>
    </Box>
  );
}
