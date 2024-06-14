import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Box from "@mui/material/Box/Box";
import Link from "next/link";

import { Material3Button } from "../../components/Material3Button";
import PasswordField from "../../components/PasswordField";

import Router from "next/router";

import useUser from "../../hooks/useUser";

import { RECAPTCHA_SITEKEY } from "../../config/config";
import { api } from "../../lbapi/lbapi";

import pageStyles from "../../styles/Page.module.css";
import styles from "../../styles/Login.module.css";

export default function Login() {
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loggingIn, setLoggingIn] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const user = useUser();

  if (user.ready && user.loggedIn && !loggingIn) {
    Router.push("/dashboard?message=You are already logged in!");
  }

  const usernameChanged = (event) => {
    setUsername(event.target.value);
    setHelperText("");
  };

  const passwordChanged = (event) => {
    setPassword(event.target.value);
    setHelperText("");
  };

  const rememberMeChanged = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = async () => {
    setLoggingIn(true);

    const token = await grecaptcha.execute(RECAPTCHA_SITEKEY, {
      action: "login",
    });

    const apiResponse = await api.Login(username, password, rememberMe, token);

    if (apiResponse.success) {
      // Reload the user to get the new user data
      await api.GetUser(false);

      Router.push("/dashboard?message=Login successful!");
    } else if (apiResponse.json?.error === "INVALID_CREDENTIALS") {
      setHelperText("Invalid username or password");
    } else {
      setLoggingIn(false);

      const error = apiResponse.json?.message;

      setHelperText(error ?? "An unknown error has occurred");
    }
  };

  return (
    <Box className={pageStyles.pageContainer}>
      <Box className={styles.loginCard}>
        <Typography variant="h3" paragraph className={styles.title}>
          Login
        </Typography>
        <Typography variant="body2" className={styles.description}>
          Dont have an account?{" "}
          <Link href="/signup" className={styles.link}>
            Get started
          </Link>
        </Typography>
        <TextField
          variant="filled"
          label="Username"
          value={username}
          onChange={usernameChanged}
          error={helperText !== ""}
          helperText={helperText}
          className={styles.input}
        />
        <PasswordField
          variant="filled"
          label="Password"
          value={password}
          onChange={passwordChanged}
          error={helperText !== ""}
          helperText={helperText}
          className={styles.input}
        />
        <Box className={styles.actionsContainer}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={rememberMe}
                onChange={rememberMeChanged}
              />
            }
            label="Remember Me"
          />
          <Link href="/forgot-password" className={styles.link}>
            Forgot Password?
          </Link>
        </Box>
        <Material3Button variant="contained" onClick={handleLogin}>
          Login
        </Material3Button>
      </Box>
    </Box>
  );
}
