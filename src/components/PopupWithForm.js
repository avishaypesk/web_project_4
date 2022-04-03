import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit, buttonText, loadingButtonText }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popupElement.querySelector(".form");
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
    this._submitButton = this._formElement.querySelector(".form__save-button");
  }

  _getInputValues() {
    const values = {};
    const inputs = [...this._formElement.querySelectorAll(".form__input")];
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
  };

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
