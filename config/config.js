const DEBUG = false;

const MAINTENANCE = false;

const COMING_SOON = false;
const COMING_SOON_DATE = new Date(2023, 0, 16);

const API_URL = DEBUG
  ? "http://127.0.0.1:8000/api"
  : "https://api.lightningdev.tech/api";

const WS_URL = API_URL.replace("http", "ws") + "/v3/ws/website";

export { API_URL, COMING_SOON, COMING_SOON_DATE, DEBUG, MAINTENANCE, WS_URL };
