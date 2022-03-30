export default class Api {
  constructor() {
    this._handleResponse = (res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    this._handleError = (err) => console.log(err);
    this._authenticationToken = "b21895f7-79d1-4177-9817-d22cf233df9c";
    this._rootUrl = "https://around.nomoreparties.co/v1/group-12/";
  }

  getInitialCards() {
    return fetch(`${this._rootUrl}cards`, {
      headers: {
        authorization: this._authenticationToken,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  getUserInfo() {
    return fetch(`${this._rootUrl}users/me`, {
      headers: {
        authorization: this._authenticationToken,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._rootUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authenticationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  updateUserImage(avatar) {
    return fetch(`${this._rootUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authenticationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  submitNewCard({ name, link }) {
    return fetch(`${this._rootUrl}users/me`, {
      method: "POST",
      headers: {
        authorization: this._authenticationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._rootUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authenticationToken,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  increaseLikeCount(cardId) {
    return fetch(`${this._rootUrl}cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authenticationToken,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  reduceLikeCount(cardId) {
    return fetch(`${this._rootUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authenticationToken,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }
}
