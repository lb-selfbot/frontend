import React from "react";

import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Link from "next/link";

import Settings from "@mui/icons-material/Settings";
import DesktopWindows from "@mui/icons-material/DesktopWindows";
import Celebration from "@mui/icons-material/Celebration";
import MusicNote from "@mui/icons-material/MusicNote";
import Code from "@mui/icons-material/Code";
import AccessTime from "@mui/icons-material/AccessTime";

import { Material3Button } from "../components/Material3Button.jsx";
import { Feature } from "../components/Feature.jsx";
import { Pricing } from "../components/Pricing.jsx";
import { Footer } from "../components/Footer.jsx";

import { Hover3D } from "../components/Hover3D.jsx";
import uiImage from "../public/ui.png";

import useUser from "../hooks/useUser.js";

import styles from "../styles/Home.module.css";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Box className={styles.landingOuterContainer}>
        <Box className={styles.landingContainer}>
          <Box className={styles.landingInnerContainer}>
            <Box className={styles.landingContentContainer}>
              <Typography variant="h2" className={styles.landingTitle}>
                Improve your Discord experience with{" "}
                <Box className={styles.landingTitleGradient}>LightningBot</Box>
              </Typography>
              <Typography variant="h6" className={styles.landingSubtitle}>
                LightningBot is a Discord selfbot featuring a beautiful UI, over
                1000 commands, multi-platform support, and a lot of features.
              </Typography>
              <Material3Button
                variant="contained"
                LinkComponent={Link}
                href={user.loggedIn ? "/dashboard" : "/signup"}
                className={styles.landingButton}
              >
                Get Started
              </Material3Button>
            </Box>
            <Box className={styles.landingContentContainer}>
              <Hover3D image={uiImage.src} />
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

      <Feature.Container>
        <Feature
          title="Customizable"
          text="LightningBot was made with customizability in mind. You can modify a lot of settings via the UI or directly in Discord using the config commands."
          icon={<Settings />}
        />
        <Feature
          title="Snipers"
          text="LightningBot can automatically join giveaways and try to redeem Discord Nitro codes on multiple accounts at once."
          icon={<Celebration />}
        />
        <Feature
          title="Multi-Platform"
          text="LightningBot is one of the only multi-platform selfbots. It's available on Windows, MacOS and Linux."
          icon={<DesktopWindows />}
        />

        <Feature
          title="Spotify Integration"
          text="LightningBot was the first selfbot to introduce Spotify integration. With LightningBot, you can control your Spotify music easily within Discord."
          icon={<MusicNote />}
        />
        <Feature
          title="Modern Technologies"
          text="LightningBot uses the most modern technologies available. We use Golang, Flutter, Django and Next.js to give you the best experience possible."
          icon={<Code />}
        />
        <Feature
          title="7-day Free Trial"
          text="You can use LightningBot for free for 7 days to test out its features before buying it."
          icon={<AccessTime />}
        />
      </Feature.Container>

      <Pricing />

      <Footer />
    </>
  );
}
