import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Box from "@mui/material/Box/Box";
import Link from "next/link";

import { Material3Button } from "../../components/Material3Button";
import PasswordField from "../../components/PasswordField";

import useUser from "../../hooks/useUser";

import { RECAPTCHA_SITEKEY } from "../../config/config";
import { api } from "../../api/api";

import Router from "next/router";

import pageStyles from "../../styles/Page.module.css";
import loginStyles from "../../styles/Login.module.css";
import styles from "../../styles/SignUp.module.css";

export default function SignUp(props) {
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const user = useUser();

  if (user.ready && user.loggedIn) {
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

  const agreedToTermsChanged = (event) => {
    setAgreedToTerms(event.target.checked);
  };

  const handleRegister = async () => {
    if (!agreedToTerms) {
      setHelperText("You must agree to the terms and conditions.");
      return;
    }

    const token = await grecaptcha.execute(RECAPTCHA_SITEKEY, {
      action: "register",
    });

    const apiResponse = await api.Register(username, password, token);

    if (apiResponse.success) {
      // Reload the user to get the new user data
      await api.GetUser(false);

      Router.push("/dashboard?message=Registration successful!");
    } else {
      setHelperText(apiResponse.json?.message ?? "An unknown error occurred");
    }
  };

  const termsCheckbox = (
    <Checkbox
      size="small"
      checked={agreedToTerms}
      onChange={agreedToTermsChanged}
    />
  );

  const termsText = (
    <Typography variant="body2">
      I have read and agree to the{" "}
      <Link href="/terms" className={loginStyles.link}>
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className={loginStyles.link}>
        Privacy Policy
      </Link>
    </Typography>
  );

  return (
    <Box className={pageStyles.pageContainer}>
      <Box className={loginStyles.loginCard}>
        <Typography variant="h3" paragraph className={loginStyles.title}>
          Sign Up
        </Typography>

        <Typography variant="body2" className={loginStyles.description}>
          Already have an account?{" "}
          <Link href="/login" className={loginStyles.link}>
            Login
          </Link>
        </Typography>

        <TextField
          variant="filled"
          label="Username"
          value={username}
          onChange={usernameChanged}
          error={helperText !== ""}
          helperText={helperText}
          className={loginStyles.input}
        />

        <PasswordField
          variant="filled"
          label="Password"
          value={password}
          onChange={passwordChanged}
          error={helperText !== ""}
          helperText={helperText}
          className={loginStyles.input}
        />
        <FormControlLabel
          className={styles.termsCheckbox}
          control={termsCheckbox}
          label={termsText}
        />
        <Typography variant="body2" className={styles.reCaptchaBranding}>
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            className={styles.reCaptchaLink}
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            className={styles.reCaptchaLink}
          >
            Terms of Service
          </a>{" "}
          apply.
        </Typography>

        <Material3Button variant="contained" onClick={handleRegister}>
          Register
        </Material3Button>
      </Box>
    </Box>
  );
}
