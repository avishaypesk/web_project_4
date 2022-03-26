export const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__save-button",
};

export const newCardButtonElement = document.querySelector(".profile__add-button");
export const cardsSection = document.querySelector(".places");
export const editProfileButtonElement = document.querySelector(".profile__edit-button");
export const editAvatarButtonElement = document.querySelector(".profile__avatar-icon");

export const profileForm = document.querySelector(".form__edit-profile");
export const newCardForm = document.querySelector(".form__new-card");
export const userInputName = document.querySelector(".form__input_type_name");
export const userInputTitle = document.querySelector(".form__input_type_title");
export const userInputImageTitle = document.querySelector(".form__input_type_img-title");
export const userInputImageLink = document.querySelector(".form__input_type_img-link");
