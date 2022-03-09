import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import { handleCardClick } from "./utils.js";
import {
  config,
  initialCards,
  newCardButtonElement,
  cardsSection,
  editProfileButtonElement,
  profileForm,
  newCardForm,
  userInputName,
  userInputTitle,
  profileName,
  profileTitle,
  userInputImageTitle,
  userInputImageLink,
} from "./constants.js";
import Section from "./Section.js";

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

const cardsListSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardsSection
);

cardsListSection.renderItems();

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
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);
profileForm.addEventListener("submit", handleEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

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
