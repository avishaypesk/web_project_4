export default class Api {
  constructor({ authenticationToken, rootUrl }) {
    this._handleResponse = (res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    this.handleError = (err) => console.log(err);
    this._authenticationToken = authenticationToken;
    this._rootUrl = rootUrl;
  }

  getInitialCards() {
    return fetch(`${this._rootUrl}cards`, {
      headers: {
        authorization: this._authenticationToken,
      },
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._rootUrl}users/me`, {
      headers: {
        authorization: this._authenticationToken,
      },
    }).then(this._handleResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._rootUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authenticationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  updateUserImage(avatar) {
    return fetch(`${this._rootUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authenticationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    }).then(this._handleResponse);
  }

  submitNewCard({ name, link }) {
    return fetch(`${this._rootUrl}cards`, {
      method: "POST",
      headers: {
        authorization: this._authenticationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
    x;
  }

  deleteCard(cardId) {
    return fetch(`${this._rootUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authenticationToken,
      },
    }).then(this._handleResponse);
  }

  increaseLikeCount(cardId) {
    return fetch(`${this._rootUrl}cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authenticationToken,
      },
    }).then(this._handleResponse);
  }

  reduceLikeCount(cardId) {
    return fetch(`${this._rootUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authenticationToken,
      },
    }).then(this._handleResponse);
  }
}
