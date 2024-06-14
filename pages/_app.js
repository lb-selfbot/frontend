import React from "react";

import { CssBaseline } from "@mui/material";

import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ModalProvider } from "mui-modal-provider";
import { SnackbarProvider } from "notistack";

import useThemeMode from "../hooks/useThemeMode";

import App from "../components/App";

import Head from "next/head";

import "../styles/globals.css";
import { PAYPAL_CLIENT_ID } from "../config/config";

const augmentColor = createTheme().palette.augmentColor;
const createColor = (color) => augmentColor({ color: { main: color } });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    common: {
      card: {
        title: grey[300],
        content: grey[400],
        background: "#172d47",
      },
    },
    lightBlue: createColor("#1976d2"),
    darkBlue: createColor("#202932"),
    background: createColor("#202932"),
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    common: {
      card: {
        title: grey[300],
        content: grey[400],
        background: "#172d47",
      },
    },
    lightBlue: createColor("#1976d2"),
    darkBlue: createColor("#202932"),
    background: createColor("#202932"),
  },
});

function Providers({ theme, children }) {
  const paypalOptions = {
    "client-id": PAYPAL_CLIENT_ID,
    currency: "EUR",
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PayPalScriptProvider options={paypalOptions}>
          <SnackbarProvider maxSnack={3}>
            <ModalProvider>{children}</ModalProvider>
          </SnackbarProvider>
        </PayPalScriptProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

function MainApp({ Component, pageProps }) {
  const { themeMode, setThemeMode } = useThemeMode();
  // const matches = useMediaQuery("(prefers-color-scheme: dark)");

  // React.useEffect(() => {
  //   if (!browserModeSet) {
  //     if (matches) {
  //       setThemeMode("dark");
  //     } else {
  //       setThemeMode("light");
  //     }
  //     setBrowserModeSet(true);
  //   }
  // }, [matches, browserModeSet, setThemeMode]);

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <>
      <Head>
        <title>LightningBot</title>

        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <link rel="manifest" href="/manifest.json" />

        <meta
          name="description"
          content="Improve your Discord experience with LightningBot"
        />
        <meta name="theme-color" content="#49AAFE" />
        <meta property="og:image" content="/social-card.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Providers theme={theme}>
        <App Component={Component} pageProps={pageProps} />
      </Providers>
    </>
  );
}

export default function MainAppWithSuspense(props) {
  return (
    <React.Suspense fallback="Loading...">
      <MainApp {...props} />
    </React.Suspense>
  );
}
