import React from "react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { Footer } from "../../components/Footer.jsx";

import homeStyles from "../../styles/Home.module.css";
import faqStyles from "../../styles/FAQ.module.css";
import styles from "../../styles/Terms.module.css";

export default function TermsOfService() {
  return (
    <>
      <Box className={homeStyles.landingOuterContainer}>
        <Box className={faqStyles.faqTitleContainer}>
          <Box className={homeStyles.landingInnerContainer}>
            <Box className={faqStyles.faqTitle}>
              <Typography variant="h2" className={homeStyles.landingTitle}>
                <Box className={homeStyles.landingTitleGradient}>
                  Terms of Service
                </Box>
              </Typography>
            </Box>
          </Box>

          <p>Last updated January 24, 2023</p>
        </Box>

        <Box>
          <svg viewBox="0 0 1920 100.1" display="block">
            <path
              fill="#202020"
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            ></path>
          </svg>
        </Box>
      </Box>

      <Container maxWidth="lg" className={styles.container}>
        <strong>Questions or concerns?</strong> Reading these terms will help
        you understand what you are allowed to do using our Services. If you do
        not agree with our policies and practices, please do not use our
        Services. If you still have any questions or concerns, please contact us
        at support@lightning-bot.com.
        <br />
        <br />
        <strong>
          NOTE: If you infringe on any of the terms stated below, we will take
          action against you.
        </strong>
        <br />
        <br />
        <h4>Responsibility</h4>
        By using our software, you are agreeing to these terms and conditions.
        We take no responsibility for any damages caused by our software. We are
        not responsible for any data loss, account bans, or any other damages
        caused by our software.
        <br />
        <br />
        <h2>Using our Software</h2>
        <br />
        <strong>
          You agree not to (these terms do not apply to Open-Source versions of
          our software):
        </strong>
        <ul>
          <li>exploit our software</li>
          <li>
            make a copy of our software available on a network for use or
            download by multiple users
          </li>
          <li>use our software on multiple computers at the same time</li>
          <li>
            share your account with anyone else, or allow anyone else to use
            your account to access our software
          </li>
          <li>
            reverse engineer, decompile, disassemble, display, perform, prepare
            derivative works based on, or otherwise modify our software
          </li>
        </ul>
        <br />
        LightningBot has been tested to work on Windows 10 and up, macOS
        Monterey and up, and Ubuntu 18.04 and up. We do not support any other
        operating systems. If you are using a different operating system, you
        are doing so at your own risk. We are not responsible for any damages
        caused by using our software on a different operating system.
        <br />
        <br />
        <h2>License keys</h2>
        <br />
        In order to use our software, you must purchase a license key. You can
        purchase a license key via our Dashboard, which is accessible after you
        log in. After a license key is purchased, it is non-refundable and it
        will be bound to your account. You will not be able to transfer your
        license key to another account. If you have any issues with your license
        key, please contact us at support@lightning-bot.com or on our Discord
        server. We may revoke your license key at any time for any reason.
        <br />
        <br />
        <h2>Logging</h2>
        <br />
        We log the following data in order to provide our services:
        <ul>
          <li>your username</li>
          <li>your email (if applicable)</li>
          <li>your password, in a hashed form</li>
          <li>
            how many times you have logged in to LightningBot (excluding website
            logins)
          </li>
          <li>
            the last time you have logged in to LightningBot (excluding website
            logins)
          </li>
          <li>
            for how long you have logged in to LightningBot (excluding website
            logins)
          </li>
          <li>when your account was created</li>
          <li>your license key</li>
          <li>
            for all orders made on our website: the user that made the order,
            the current status of the order, when the order was created, the
            license key that was supplied (if applicable)
          </li>
        </ul>
        <br />
        <br />
        <h2>Communication</h2>
        <br />
        All announcements will be made on our Discord server. If there is a very
        important announcement, we may also make an announcement on our website.
        We will not send any emails to you unless you request us to send an
        email to reset your password.
      </Container>

      <Footer />
    </>
  );
}
