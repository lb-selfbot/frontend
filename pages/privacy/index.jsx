import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Footer } from "../../components/Footer.jsx";

import styles from "../../styles/Home.module.css";
import faqStyles from "../../styles/FAQ.module.css";

export default function PrivacyPolicy(props) {
  return (
    <>
      <Box className={styles.landingOuterContainer}>
        <Box className={faqStyles.faqTitleContainer}>
          <Box className={styles.landingInnerContainer}>
            <Box className={faqStyles.faqTitle}>
              <Typography variant="h2" className={styles.landingTitle}>
                <Box className={styles.landingTitleGradient}>
                  Privacy Policy
                </Box>
              </Typography>
            </Box>
          </Box>
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

      <Footer />
    </>
  );
}
