const DEBUG = false;

const MAINTENANCE = false;

const COMING_SOON_DATE = new Date(Date.UTC(2023, 0, 24, 15, 0, 0));

const COMING_SOON = new Date() < COMING_SOON_DATE;

const API_URL = DEBUG
  ? "http://127.0.0.1:8000/api"
  : "https://api.lightning-bot.com/api";

const WS_URL = API_URL.replace("http", "ws") + "/v3/ws/website";

// ReCAPTCHA config
const RECAPTCHA_SITEKEY = "6LeD4LkgAAAAAChLtd2kTZX4ujHPfjGPsZ6p3w1D";

// PayPal config
const PAYPAL_CLIENT_ID = DEBUG
  ? "AYGCBr3jhWL6kVWvnlFR8F5NjNI6peg_-XrcBSQbr0iIqcZrVqX4vzTbYRcIXF8MTh5Gri9vmQCuRiRQ"
  : "Aa0ZGMuXasC7YSmE5CbfNvGzDqP9bisjK_i4iBwc9a-p7qSVWZCWkNM39G7tzGhTzjuv5sr1PAnBFGf-";

export {
  API_URL,
  COMING_SOON,
  COMING_SOON_DATE,
  DEBUG,
  MAINTENANCE,
  WS_URL,
  RECAPTCHA_SITEKEY,
  PAYPAL_CLIENT_ID,
};
