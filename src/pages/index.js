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
  editAvatarButtonElement,
} from "../utils/constants.js";

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);
editAvatarButtonElement.addEventListener("click", handleAvatarEditClick);

export const cardsListSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".places"
);

export const deleteConfirmPopup = new PopupWithForm(
  ".form_type_delete-confirm",
  () => {
    console.log("deleted");
  }
);

export const profileAvatarPopup = new PopupWithForm(
  ".form_type_profile-avatar",
  () => {
    console.log("submitted");
  }
);
profileAvatarPopup.setEventListeners();

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

const preview = new PopupWithImage({
  popupSelector: ".preview",
  imageSelector: ".preview__preview-image",
  imageTitleSelector: ".preview__description",
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
      handleCardClick,
      handleDeleteClick,
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

function handleDeleteClick(event) {
  deleteConfirmPopup.open();
}

function handleCardClick(card) {
  preview.open(card._name, card._link);
}
preview.setEventListeners();

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

function handleAvatarEditClick() {
  profileAvatarPopup.open();
}

enableValidation(config);
cardsListSection.renderItems();
