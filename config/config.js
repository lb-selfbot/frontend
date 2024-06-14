const DEBUG = false;

const MAINTENANCE = false;

const COMING_SOON_DATE = new Date(Date.UTC(2023, 0, 24, 15, 0, 0));

const COMING_SOON = new Date() < COMING_SOON_DATE;

const API_URL = DEBUG
  ? "http://localhost:8000/api"
  : "https://api.lightning-bot.com/api";

const HOSTING_API_URL = "https://hosting-api.lightning-bot.com/api";

const WS_URL = API_URL.replace("http", "ws") + "/v3/ws/website";

// ReCAPTCHA config
const RECAPTCHA_SITEKEY = "6LeD4LkgAAAAAChLtd2kTZX4ujHPfjGPsZ6p3w1D";

// PayPal config
const PAYPAL_CLIENT_ID = DEBUG
  ? "AWahhoCNsL3kXNJgAq9oNZMfcQlv5Rs9yQzs3rHemC_qcQG-5Tl9MgncAVzNMIQmaN6cP6_aSUYJVFP-"
  : "AbhK4g1-Ci0ECTDhaGQrDIrx-Qbve80lLD_0ozeNVIg1pTWlD-6HD0aw75T8zs-C25kCG-RvbiDA5r2j";

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
