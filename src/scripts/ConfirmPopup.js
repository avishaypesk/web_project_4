import Popup from "./Popup";

export default class ConfirmPopup extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._submitHandler = submitHandler;
    this._submitButton = document
      .querySelector(popupSelector)
      .querySelector(".form__save-button");
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  handleConfirmClick = (event) => {
    event.preventDefault();
    this._submitHandler(this._cardId, this._cardElement);
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", this._handleConfirmClick);
  }

  close() {
    super.close();
    this._submitButton.removeEventListener("click", this._handleConfirmClick);
  }
}
