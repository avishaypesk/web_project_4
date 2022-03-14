import "../pages/index.css";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import {
  config,
  initialCards,
  editProfileButtonElement,
  newCardButtonElement,
  userInputName,
  userInputTitle,
  userInputImageTitle,
  userInputImageLink,
  cardsSection,
} from "../utils/constants.js";

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);

export const cardsListSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".places"
);

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

export const userProfile = new UserInfo({
  nameSelector: ".profile__name",
  titleSelector: ".profile__title",
});

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
      handleCardClick,
    }
  );
  return newCard.createCard();
}

function renderCard(card) {
  cardsSection.prepend(createCard(card));
}

const formValidators = {};
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function handleCardClick() {
  const popup = new PopupWithImage(
    {
      name: this._name,
      link: this._link,
    },
    {
      popupSelector: this._previewPopupSelector,
      imageSelector: this._previewPopupImageSelector,
      imageTitleSelector: this._previewPopupDescriptionSelector,
    }
  );
  popup.open();
  popup.setEventListeners();
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
  cardsListSection.addItem(createCard(card));
  newCardPopup.close();
}

function handleEditButtonClick() {
  const { name, title } = userProfile.getUserInfo();
  userInputName.value = name;
  userInputTitle.value = title;
  profilePopup.open();
  formValidators["profileForm"].resetValidation();
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  userProfile.setUserInfo({
    name: userInputName.value,
    title: userInputTitle.value,
  });
  profilePopup.close();
}

enableValidation(config);
cardsListSection.renderItems();
