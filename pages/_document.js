import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link rel="preconnect" href="https://www.google.com" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600;700&family=Roboto+Mono:wght@300&display=swap"
        />

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
