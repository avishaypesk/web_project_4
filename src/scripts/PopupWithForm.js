import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector(".form");
  }

  _getInputValues() {
    const values = {};
    [...this._formElement.querySelectorAll(".form__input")].forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  _handleFormSubmit = (evt) => {
    this._submitHandler(evt);
    this._close;
  };

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleFormSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._formElement.removeEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
