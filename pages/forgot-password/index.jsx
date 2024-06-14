import React from "react";

import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import Box from "@mui/material/Box/Box";
import Link from "next/link";

import { Material3Button } from "../../components/Material3Button";
import PasswordField from "../../components/PasswordField";

import useUser from "../../hooks/useUser";

import Router, { useRouter } from "next/router";

import { RECAPTCHA_SITEKEY } from "../../config/config";
import { api } from "../../lbapi/lbapi";

import pageStyles from "../../styles/Page.module.css";
import loginStyles from "../../styles/Login.module.css";

function getView(query) {
  const username = query["username"];
  const token = query["token"];

  if (username && token) {
    return "resetPassword";
  } else {
    return "inputUsername";
  }
}

export default function ForgotPassword(props) {
  const router = useRouter();

  const [helperText, setHelperText] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [view, setView] = React.useState("");

  const user = useUser();

  React.useEffect(() => {
    setView(getView(router.query));
  }, [router.query]);

  if (user.ready && user.loggedIn) {
    Router.push("/dashboard?message=You are already logged in!");
  }

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
    setHelperText("");
  };

  const onNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setHelperText("");
  };

  const onRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    setHelperText("");
  };

  const handleForgotPassword = async () => {
    const token = await grecaptcha.execute(RECAPTCHA_SITEKEY, {
      action: "forgot_password",
    });

    const apiResponse = await api.ForgotPassword(username, token);

    if (apiResponse.success) {
      setView("emailSent");
      return;
    }

    if (apiResponse.json?.error === "INVALID_USERNAME") {
      setHelperText("No user with this username exists.");
    } else if (apiResponse.json?.error === "NO_EMAIL") {
      setView("noEmail");
    } else {
      setView("unknownError");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== repeatPassword) {
      setHelperText("Passwords do not match.");
      return;
    }

    const usernameQuery = router.query["username"];
    const tokenQuery = router.query["token"];

    const captchaToken = await grecaptcha.execute(RECAPTCHA_SITEKEY, {
      action: "reset_password",
    });

    const apiResponse = await api.ResetPassword(
      usernameQuery,
      newPassword,
      tokenQuery,
      captchaToken
    );

    if (apiResponse.success) {
      setView("resetPasswordSuccess");
      return;
    }

    const error = apiResponse.json?.message ?? "An unknown error has occurred";

    setHelperText(error);
  };

  const inputUsername = (
    <>
      <Typography variant="body2" className={loginStyles.description}>
        Please enter the username associated with your account.
      </Typography>

      <TextField
        variant="filled"
        label="Username"
        value={username}
        error={helperText !== ""}
        helperText={helperText}
        onChange={onUsernameChange}
        className={loginStyles.input}
      />

      <Material3Button variant="contained" onClick={handleForgotPassword}>
        Continue
      </Material3Button>
    </>
  );

  const emailSent = (
    <>
      <Typography variant="body2" className={loginStyles.description}>
        An email has been sent to you with a link to reset your password.
      </Typography>

      <Material3Button variant="contained" LinkComponent={Link} href="/login">
        Go Back
      </Material3Button>
    </>
  );

  const noEmail = (
    <>
      <Typography variant="body2" className={loginStyles.description}>
        Your account does not have an email associated with it. To reset your
        password, please contact us by{" "}
        <Link
          href="mailto:password-reset@lightning-bot.com"
          className={loginStyles.link}
        >
          email
        </Link>{" "}
        or create a ticket in our{" "}
        <Link href="/discord" className={loginStyles.link}>
          Discord server
        </Link>
        .
      </Typography>

      <Material3Button variant="contained" LinkComponent={Link} href="/login">
        Go Back
      </Material3Button>
    </>
  );

  const resetPassword = (
    <>
      <Typography variant="body2" className={loginStyles.description}>
        Please enter your new password.
      </Typography>

      <PasswordField
        variant="filled"
        label="New Password"
        value={newPassword}
        error={helperText !== ""}
        helperText={helperText}
        onChange={onNewPasswordChange}
        className={loginStyles.input}
      />

      <PasswordField
        variant="filled"
        label="Repeat Password"
        value={repeatPassword}
        error={helperText !== ""}
        helperText={helperText}
        onChange={onRepeatPasswordChange}
        className={loginStyles.input}
      />

      <Material3Button variant="contained" onClick={handleResetPassword}>
        Continue
      </Material3Button>
    </>
  );

  const resetPasswordSuccess = (
    <>
      <Typography variant="body2" className={loginStyles.description}>
        Your password has been reset successfully.
      </Typography>

      <Material3Button variant="contained" LinkComponent={Link} href="/login">
        Login
      </Material3Button>
    </>
  );

  const unknownError = (
    <>
      <Typography variant="body2" className={loginStyles.description}>
        An unknown error has occurred, please try again.
      </Typography>

      <Material3Button
        variant="contained"
        LinkComponent={Link}
        href="/forgot-password"
      >
        Go Back
      </Material3Button>
    </>
  );

  return (
    <Box className={pageStyles.pageContainer}>
      <Box className={loginStyles.loginCard}>
        <Typography variant="h3" paragraph className={loginStyles.title}>
          Forgot Password
        </Typography>

        {view === "inputUsername" && inputUsername}
        {view === "emailSent" && emailSent}
        {view === "noEmail" && noEmail}
        {view === "resetPassword" && resetPassword}
        {view === "resetPasswordSuccess" && resetPasswordSuccess}
        {view === "unknownError" && unknownError}
      </Box>
    </Box>
  );
}
