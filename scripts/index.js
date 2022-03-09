import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import { openPopup, closePopup, handleCardClick } from "./utils.js";

export const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__save-button",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

initialCards.reverse();

const editProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
const newCardButtonElement = document.querySelector(".profile__add-button");
const profileForm = document.querySelector(".form__edit-profile");
const newCardForm = document.querySelector(".form__new-card");
const popups = document.querySelectorAll(".popup");
const cardsSection = document.querySelector(".places");
const userInputName = document.querySelector(".form__input_type_name");
const userInputTitle = document.querySelector(".form__input_type_title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const userInputImageTitle = document.querySelector(
  ".form__input_type_img-title"
);
const userInputImageLink = document.querySelector(".form__input_type_img-link");

function createCard(card) {
  const newCard = new Card(
    {
      name: card.name,
      link: card.link,
    },
    {
      cardTemplateSelector: "#card-template",
      cardSelector: ".places__card",
      imageTitleSelector: ".places__title",
      imageSelector: ".places__image",
      likeActiveSelector: "places__like-button_active",
      likeButtonSelector: ".places__like-button",
      deleteButtonSelector: ".places__remove-button",
      previewPopupSelector: ".preview",
      previewPopupImageSelector: ".preview__preview-image",
      previewPopupDescriptionSelector: ".preview__description",
      handleCardClick: openPopup,
    }
  );
  return newCard.createCard();
}

export function renderCard(card) {
  cardsSection.prepend(createCard(card));
}

function renderCards() {
  initialCards.forEach((card) => renderCard(card));
}

function handleEditButtonClick() {
  userInputName.value = profileName.textContent;
  userInputTitle.value = profileTitle.textContent;
  profilePopup.open();
  formValidators["profileForm"].resetValidation();
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileTitle.textContent = userInputTitle.value;
}

function handleNewCardButtonClick() {
  newCardPopup.open();
  formValidators["newCardForm"].resetValidation();
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  const card = {
    name: userInputImageTitle.value,
    link: userInputImageLink.value,
  };
  userInputImageTitle.value = "";
  userInputImageLink.value = "";
  renderCard(card);
}

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
profileForm.addEventListener("submit", handleEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);

renderCards();

export const formValidators = {};
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(config);

export const profilePopup = new PopupWithForm(
  ".form_type_profile",
  handleEditFormSubmit
);
profilePopup.setEventListeners();
export const newCardPopup = new PopupWithForm(
  ".form_type_new-card",
  handleNewCardFormSubmit
);
newCardPopup.setEventListeners();
