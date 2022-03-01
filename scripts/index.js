import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import * as utils from "./utils.js";

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
      handleCardClick: utils.openPopup,
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

editProfileButtonElement.addEventListener("click", utils.handleEditButtonClick);
profileForm.addEventListener("submit", utils.handleEditFormSubmit);
newCardForm.addEventListener("submit", utils.handleNewCardFormSubmit);
newCardButtonElement.addEventListener("click", utils.handleNewCardButtonClick);
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_visible")) {
      utils.closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      utils.closePopup(popup);
    }
  });
});

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
