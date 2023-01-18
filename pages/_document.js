import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>LightningBot</title>

        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <link
          rel="preconnect"
          crossOrigin=""
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          crossOrigin=""
          href="https://fonts.gstatic.com"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600;700&family=Roboto+Mono:wght@300&display=swap"
        />

        <link rel="manifest" href="/manifest.json" />

        <meta name="description" content="A Discord Selfbot" />
        <meta name="theme-color" content="#f7fa08" />

        <script
          async
          src="https://www.google.com/recaptcha/api.js?render=6LeD4LkgAAAAAChLtd2kTZX4ujHPfjGPsZ6p3w1D"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
