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

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      this._submitHandler(evt);
      this._close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
