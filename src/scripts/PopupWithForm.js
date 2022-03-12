import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popupElement.querySelector(".form");
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
    this._handleSubmit(evt);
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
