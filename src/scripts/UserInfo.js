export default class UserInfo {
  constructor({ nameSelector, titleSelector, imageSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._titleElement = document.querySelector(titleSelector);
    this._imageElement = document.querySelector(imageSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      title: this._titleElement.textContent,
    };
  }

  setUserInfo({ name, title }) {
    this._nameElement.textContent = name;
    this._titleElement.textContent = title;
  }

  setUserAvatar(url) {
    this._imageElement.style.backgroundImage = `url("${url})`;
  }
}
