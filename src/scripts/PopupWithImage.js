import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(
    { name, link },
    { popupSelector, imageSelector, imageTitleSelector }
  ) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._imageSelector = imageSelector;
    this._imageTitleSelector = imageTitleSelector;
    this._imageElement = this._popupElement.querySelector(this._imageSelector);
    this._titleElement = this._popupElement.querySelector(
      this._imageTitleSelector
    );
  }

  _populateInfo() {
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
  }

  setInfo() {}

  open() {
    this._populateInfo();
    super.open();
  }
}
