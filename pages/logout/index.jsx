import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import useUser from "../../hooks/useUser";
import { api } from "../../api/api";

import pageStyles from "../../styles/Page.module.css";
import styles from "../../styles/NotFound.module.css";

export default function Logout(props) {
  const user = useUser();

  if (user.ready && !user.loggedIn) {
    window.location.replace("/?message=You are already logged out!");
  }

  React.useEffect(() => {
    api.Logout().then((apiResponse) => {
      if (apiResponse.success) {
        window.location.assign("/?message=Successfully logged out!");
      } else {
        const error = apiResponse.json?.message ?? "An unknown error occurred";
        window.location.assign(`/?message=${error}`);
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
