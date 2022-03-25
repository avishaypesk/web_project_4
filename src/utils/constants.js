const yosemite = new URL("../images/yosemite.jpg", import.meta.url);
const louise = new URL("../images/louise.jpg", import.meta.url);
const mountain = new URL("../images/mountain.jpg", import.meta.url);
const latemar = new URL("../images/latemar.jpg", import.meta.url);
const vanoise = new URL("../images/vanoise.jpg", import.meta.url);
const lago = new URL("../images/lago.jpg", import.meta.url);

export const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__save-button",
};

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: yosemite,
  },
  {
    name: "Lake Louise",
    link: louise,
  },
  {
    name: "Bald Mountains",
    link: mountain,
  },
  {
    name: "Latemar",
    link: latemar,
  },
  {
    name: "Vanoise National Park",
    link: vanoise,
  },
  {
    name: "Lago di Braies",
    link: lago,
  },
];

initialCards.reverse();

export const newCardButtonElement = document.querySelector(
  ".profile__add-button"
);
export const cardsSection = document.querySelector(".places");
export const editProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
export const editAvatarButtonElement = document.querySelector(
  ".profile__avatar-icon"
);

export const profileForm = document.querySelector(".form__edit-profile");
export const newCardForm = document.querySelector(".form__new-card");
export const userInputName = document.querySelector(".form__input_type_name");
export const userInputTitle = document.querySelector(".form__input_type_title");
export const userInputImageTitle = document.querySelector(
  ".form__input_type_img-title"
);
export const userInputImageLink = document.querySelector(
  ".form__input_type_img-link"
);
