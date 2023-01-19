import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
