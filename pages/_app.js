import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ModalProvider from "mui-modal-provider";
import { SnackbarProvider } from "notistack";

import useThemeMode from "../hooks/useThemeMode";

import App from "../components/App";

import Head from "next/head";

import "../styles/globals.css";

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
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PayPalScriptProvider
          options={{
            "client-id":
              "AYGCBr3jhWL6kVWvnlFR8F5NjNI6peg_-XrcBSQbr0iIqcZrVqX4vzTbYRcIXF8MTh5Gri9vmQCuRiRQ",
            currency: "EUR",
          }}
        >
          <SnackbarProvider maxSnack={3}>
            <ModalProvider>{children}</ModalProvider>
          </SnackbarProvider>
        </PayPalScriptProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

function MainApp({ Component, pageProps }) {
  const [browserModeSet, setBrowserModeSet] = React.useState(false);
  const { themeMode, setThemeMode } = useThemeMode();
  const matches = useMediaQuery("(prefers-color-scheme: dark)");

  React.useEffect(() => {
    if (!browserModeSet) {
      if (matches) {
        setThemeMode("dark");
      } else {
        setThemeMode("light");
      }
      setBrowserModeSet(true);
    }
  }, [matches, browserModeSet, setThemeMode]);

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <>
      <Head>
        <title>LightningBot</title>
      </Head>
      <Providers theme={theme}>
        <App Component={Component} pageProps={pageProps} />
      </Providers>
    </>
  );
}

export default MainApp;
