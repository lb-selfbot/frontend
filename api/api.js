import { API_URL } from "../config/config";

class User {
  constructor(ready, loggedIn, json) {
    this.ready = ready;
    this.loggedIn = loggedIn;
    if (ready) {
      this.id = json.id;
      this.username = json.username;
      this.email = json.email;
      this.isStaff = json.is_staff;
      this.isTester = json.is_tester;
      this.accountType = json.account_type;
      const lifetime = this.accountType === "Lifetime";
      if (lifetime && this.isTester) {
        this.accountType = "Tester";
      }
      if (lifetime && this.isStaff) {
        this.accountType = "Staff";
      }
      this.logins = json.logins;
      this.dateJoined = new Date(json.date_joined);
      this.loginTime = json.login_time;
      this.key = json.key;
      this.isHosting = json.is_hosting;
      this.hostingCredit = json.hosting_credit;
    }
  }
}

class Stats {
  constructor(json) {
    Object.assign(this, json);
  }
}

class ApiResponse {
  constructor(response, json) {
    this.raw = response;
    this.json = json;
    this.success = response.status >= 200 && response.status < 300;
  }
}

class HTTP {
  async Post(path, data, requestConfig) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: !!data ? { "Content-Type": "application/json" } : {},
      body: !!data ? JSON.stringify(data) : null,
      credentials: "include",
      mode: "cors",
      ...requestConfig,
    });

    const json = await res.json();
    return new ApiResponse(res, json);
  }

  async Get(path, requestConfig) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      ...requestConfig,
    });
    const json = await res.json();
    return new ApiResponse(res, json);
  }
}

class Api {
  constructor() {
    this.http = new HTTP();
    this.user = new User(false, null, {});
    this.getUserTime = null;
    this.gettingUser = false;
    this.onUserChange = [];
    this.stats = new Stats({});
    this.getStatsTime = null;
    this.gettingStats = false;
    this.onStatsChange = [];
  }

  async Login(username, password, rememberMe, captcha_token) {
    this.getUserTime = null;
    return await this.http.Post("/v3/auth/login", {
      username: username,
      password: password,
      session: true,
      rememberme: rememberMe,
      captcha_token: captcha_token,
    });
  }

  async Register(username, password, captcha_token) {
    this.getUserTime = null;
    return await this.http.Post("/v3/auth/register", {
      username: username,
      password: password,
      captcha_token: captcha_token,
    });
  }

  async ForgotPassword(username, captcha_token) {
    return await this.http.Post("/v3/auth/forgot-password", {
      username: username,
      captcha_token: captcha_token,
    });
  }

  async ResetPassword(username, new_password, token, captcha_token) {
    return await this.http.Post("/v3/auth/reset-password", {
      username: username,
      new_password: new_password,
      token: token,
      captcha_token: captcha_token,
    });
  }

  async GetUser(cache, maxAge = 60) {
    if (this.gettingUser) {
      return this.user;
    }
    this.gettingUser = true;
    if (
      cache &&
      this.getUserTime !== null &&
      Date.now() - this.getUserTime < maxAge * 1000
    ) {
      this.gettingUser = false;
      return this.user;
    }
    const apiResponse = await this.http.Get("/v3/auth/get-user");
    this.getUserTime = Date.now();
    if (apiResponse.success) {
      this.user = new User(true, true, apiResponse.json.user);
    } else {
      this.user = new User(true, false, {});
    }
    this.gettingUser = false;
    this.onUserChange.forEach((f) => f(this.user));
    return this.user;
  }

  async Logout() {
    this.user = new User(true, false, {});
    this.getUserTime = null;
    this.onUserChange.forEach((f) => f(this.user));

    return await this.http.Post("/v3/auth/logout");
  }

  async GetStats(cache, maxAge = 60) {
    if (this.gettingStats) {
      return this.stats;
    }
    if (
      cache &&
      this.getStatsTime !== null &&
      Date.now() - this.getStatsTime < maxAge * 1000
    ) {
      this.gettingStats = false;
      return this.stats;
    }
    const apiResponse = await this.http.Get("/v3/stats/all");
    this.getStatsTime = Date.now();
    if (apiResponse.success) {
      this.stats = new Stats(apiResponse.json.stats);
      this.onStatsChange.forEach((f) => f(this.stats));
    }
    this.gettingStats = false;
    return this.stats;
  }

  async ChangePassword(current_password, new_password) {
    return await this.http.Post("/v3/auth/change-password", {
      current_password: current_password,
      new_password: new_password,
    });
  }

  async RedeemKey(key, captcha_token) {
    return await this.http.Post("/v3/selfbot/redeem-key", {
      key: key,
      captcha_token: captcha_token,
    });
  }

  async RedeemCreditKey(key, captcha_token) {
    return await this.http.Post("/v3/selfbot/redeem-credit-key", {
      key: key,
      captcha_token: captcha_token,
    });
  }

  async SetEmail(email, password) {
    return await this.http.Post("/v3/auth/set-email", {
      email: email,
      password: password,
    });
  }

  async CreatePayPalOrder(captcha_token) {
    return await this.http.Post("/v3/paypal/create-order", {
      captcha_token: captcha_token,
    });
  }

  async CapturePayPalOrder(order_id) {
    return await this.http.Post("/v3/paypal/capture-order", {
      order_id: order_id,
    });
  }

  async CreateKey() {
    return await this.http.Post("/v3/admin/create-key");
  }

  async CreateCreditKey(creditAmount) {
    return await this.http.Post("/v3/admin/create-credit-key", {
      credit_amount: creditAmount,
    });
  }

  async GetTableData(tableName) {
    return await this.http.Get(`/v3/admin/table-data/${tableName}`);
  }

  async CreateRelease(branch, version, changelog) {
    return await this.http.Post("/v3/admin/create-release", {
      branch: branch,
      version: version,
      changelog: changelog,
    });
  }

  async DeleteRelease(release_id) {
    return await this.http.Post("/v3/admin/delete-release", {
      release_id: release_id,
    });
  }

  async UserAction(user_id, action, data) {
    return await this.http.Post("/v3/admin/action/user", {
      user_id: user_id,
      action: action,
      data: data,
    });
  }

  async KeyAction(key_id, action) {
    return await this.http.Post("/v3/admin/action/key", {
      key_id: key_id,
      action: action,
    });
  }

  async EnableHosting(token) {
    return await this.http.Post("/v3/selfbot/enable-hosting", {
      token: token,
    });
  }

  async DisableHosting() {
    return await this.http.Post("/v3/selfbot/disable-hosting", {});
  }

  async ListHostingFiles() {
    return await this.http.Get("/v3/selfbot/hosting/list-files");
  }

  async DeleteFile(path) {
    return await this.http.Post("/v3/selfbot/hosting/delete-file", {
      file_path: path,
    });
  }

  async DeleteFolder(path) {
    return await this.http.Post("/v3/selfbot/hosting/delete-folder", {
      folder_path: path,
    });
  }
}

const api = new Api();

export { api, User };
