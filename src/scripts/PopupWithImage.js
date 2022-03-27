import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, imageTitleSelector }) {
    super(popupSelector);
    this._imageSelector = imageSelector;
    this._imageTitleSelector = imageTitleSelector;
    this._imageElement = this._popupElement.querySelector(this._imageSelector);
    this._titleElement = this._popupElement.querySelector(this._imageTitleSelector);
  }

  _populateInfo(name, link) {
    this._titleElement.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = name;
  }

  open(name, link) {
    this.name = name;
    this.link = link;
    this._populateInfo();
    super.open();
  }
}
