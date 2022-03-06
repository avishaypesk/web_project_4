export default class UserInfo {
  constructor({ nameSelector, titleSelector }) {
    this._nameSelector = nameSelector;
    this._titleSelector = titleSelector;
    this._nameElement = document.querySelector(nameSelector);
    this._titleElement = document.querySelector(titleSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  getUserInfo({ name, title }) {
    this._nameElement.textContent = name;
    this._titleElement.textContent = title;
  }
}
