const DEBUG = false;

const MAINTENANCE = false;

const COMING_SOON = false;
const COMING_SOON_DATE = new Date(2023, 0, 16);

const WS_URL = DEBUG
  ? "ws://127.0.0.1:8000/api/v3/ws/website"
  : "wss://api.lightning-bot.com/api/v3/ws/website";

const API_URL = DEBUG
  ? "http://127.0.0.1:8000/api"
  : "https://api.lightning-bot.com/api";

export { API_URL, COMING_SOON, COMING_SOON_DATE, DEBUG, MAINTENANCE, WS_URL };
