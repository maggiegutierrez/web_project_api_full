import { BASE_URL, TOKEN_KEY } from "./constants";

class API {
  constructor({ baseURL }) {
    this._baseURL = baseURL;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    };
  }

  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._getHeaders(),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards/`, {
      headers: this._getHeaders(),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  patchUserData(data) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  patchAvatar(data) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  postCardData(data) {
    return fetch(`${this._baseURL}/cards/`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  deleteCardData(_id) {
    return fetch(`${this._baseURL}/cards/${_id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
}

const api = new API({ baseURL: BASE_URL });

export default api;
