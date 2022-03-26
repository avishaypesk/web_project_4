export default class Api {
  constructor() {}

  _handleResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  _handleError = (err) => console.log(err);

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "b21895f7-79d1-4177-9817-d22cf233df9c",
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      headers: {
        authorization: "b21895f7-79d1-4177-9817-d22cf233df9c",
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }
}
