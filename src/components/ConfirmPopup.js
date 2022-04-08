import Popup from "./Popup";

export default class ConfirmPopup extends Popup {
  constructor(popupSelector, { handleSubmit, buttonText, loadingButtonText }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handleSubmit = handleSubmit;
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
    this._submitButton = this._popupElement.querySelector(".form__save-button");
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  _handleConfirmClick = (event) => {
    event.preventDefault();
    this._handleSubmit(this._cardId, this._cardElement);
    this.close();
  };

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", this._handleConfirmClick);
  }

  close() {
    super.close();
    this._submitButton.removeEventListener("click", this._handleConfirmClick);
  }
}
