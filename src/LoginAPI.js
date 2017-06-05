import {
  loginApiUrl,
  AUTH_TOKEN,
  apiUrl,
} from "./config";

class LoginAPI {
  constructor(url) {
    this.url = url;
  }

  checkAuthorized() {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token ? this.fetchUserData(token) : Promise.reject();
  }

  fetchUserData(token) {
    const request = this.__createRequestData('GET', '', this.__getAuthRequestHeaders(token));
    return fetch(this.__getUserInfoUrl(), request)
      .then(res => this.__handleResponse(res));
  }

   getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN);
   }

  __getAuthRequestHeaders(token) {
    const headers = new Headers();
    headers.append('Authorization', token);
    return headers;
  }

  login(login, password) {
    const data = { login, password };
    let request = this.__createRequestData('POST', this.__getQueryString(data), this.__getLoginRequestHeaders());
    return fetch(this.__getLoginUrl(), request)
      .then(res => this.__handleResponse(res));
  }

  __getLoginRequestHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  __getQueryString(data) {
    return Object.keys(data).reduce((acc, key) => {
      key = encodeURIComponent(key);
      let value = encodeURIComponent(data[key]);
      return `${acc}&${key}=${value}`;
    }, "").substr(1);
  }

  __createRequestData(method, body = '', headers = new Headers()) {
    if (body) {
      return { method , body , headers };
    } else {
      return { method , headers };
    }
  }

  __handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw res.status;
    }
  }

  __getLoginUrl() {
    return `${this.url}/login`;
  }

  __getUserInfoUrl() {
    return `${this.url}/me`;
  }

  // authors
  __getAuthorsUrl() {
    return `${apiUrl}/authors`;
  }

  fetchAuthors() {
    const token = localStorage.getItem(AUTH_TOKEN);
    const request = this.__createRequestData('GET', '', this.__getAuthRequestHeaders(token));
    return fetch(this.__getAuthorsUrl(), request)
      .then(res => this.__handleResponse(res));
  }
}

const loginApi = new LoginAPI(loginApiUrl);
export { loginApi, LoginAPI };
