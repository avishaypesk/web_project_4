import "../pages/index.css";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Api from "../utils/Api";
import ConfirmPopup from "../scripts/ConfirmPopup";
import {
  config,
  editProfileButtonElement,
  newCardButtonElement,
  userInputName,
  userInputTitle,
  userInputImageTitle,
  userInputImageLink,
  editAvatarButtonElement,
} from "../utils/constants.js";

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);
editAvatarButtonElement.addEventListener("click", handleAvatarEditClick);

export const deleteConfirmPopup = new ConfirmPopup(
  ".form_type_delete-confirm",
  handleDeleteConfirm
);

export const profileAvatarPopup = new PopupWithForm(
  ".form_type_profile-avatar",
  handleAvatarSubmit
);
profileAvatarPopup.setEventListeners();

export const profilePopup = new PopupWithForm(".form_type_profile", handleEditFormSubmit);
profilePopup.setEventListeners();

export const newCardPopup = new PopupWithForm(
  ".form_type_new-card",
  handleNewCardFormSubmit
);
newCardPopup.setEventListeners();

export const userProfile = new UserInfo({
  nameSelector: ".profile__name",
  titleSelector: ".profile__title",
  imageSelector: ".profile__avatar",
});

const preview = new PopupWithImage({
  popupSelector: ".preview",
  imageSelector: ".preview__preview-image",
  imageTitleSelector: ".preview__description",
});

const cardsListSection = new Section(
  {
    renderer: (card) => {
      const isOwner = card.owner._id == userProfile.getUserId();
      const cardLikes = card.likes.length;
      const likedByOwner = card.likes.some((user) => user._id == userProfile.getUserId());
      renderCard(card, isOwner, card._id, cardLikes, likedByOwner);
    },
  },
  ".places"
);

function createCard(card, isOwner, id, likeCount, likedByOwner) {
  const newCard = new Card(
    {
      name: card.name,
      link: card.link,
      isOwner,
      id,
      likeCount,
      likedByOwner,
    },
    {
      cardTemplateSelector: "#card-template",
      cardSelector: ".places__card",
      imageTitleSelector: ".places__title",
      imageSelector: ".places__image",
      likeActiveSelector: "places__like-button_active",
      likeButtonSelector: ".places__like-button",
      deleteButtonSelector: ".places__remove-button",
      likeCountSelector: ".places__like-count",
      handleCardClick,
      handleDeleteClick,
      handleLikeClick,
    }
  );
  return newCard.createCard();
}

function handleLikeClick(cardId, liked, card) {
  const updateLikeCounts = (res) => card.updateLikeCount(res.likes.length);
  if (liked) {
    api.increaseLikeCount(cardId).then(updateLikeCounts);
  } else {
    api.reduceLikeCount(cardId).then(updateLikeCounts);
  }
}

function renderCard(card, isOwner, id, likeCount, likedByOwner) {
  cardsListSection.addItem(createCard(card, isOwner, id, likeCount, likedByOwner));
}

function handleDeleteClick(cardId, cardElement) {
  deleteConfirmPopup.open(cardId, cardElement);
}

function handleDeleteConfirm(cardId, cardElement) {
  api.deleteCard(cardId).then(() => cardElement.remove());
}

function handleCardClick(card) {
  preview.open(card._name, card._link);
}
preview.setEventListeners();

function handleAvatarSubmit({ profileImageUrlInput: url }) {
  api.updateUserImage(url).then(() => userProfile.setUserAvatar(url));
}

function handleNewCardButtonClick() {
  newCardPopup.open();
  formValidators["newCardForm"].resetValidation();
}

function handleNewCardFormSubmit(cardValues) {
  const { newCardName: name, newCardLink: link } = cardValues;
  api.submitNewCard({ name, link }).then((card) => renderCard(card, true, card._id));
}

function handleEditButtonClick() {
  const { name, title } = userProfile.getUserInfo();
  userInputName.value = name;
  userInputTitle.value = title;
  profilePopup.open();
  formValidators["profileForm"].resetValidation();
}

function handleEditFormSubmit({ profileName: name, profileTitle: about }) {
  api
    .updateUserInfo({ name, about })
    .then((user) => userProfile.setUserInfo({ name: user.name, title: user.about }));
}

function handleAvatarEditClick() {
  profileAvatarPopup.open();
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

const api = new Api();
const cardsPromise = api.getInitialCards();
const userInfoPromise = api.getUserInfo();
Promise.all([cardsPromise, userInfoPromise])
  .then(([cards, user]) => {
    userProfile.setUserInfo({ name: user.name, title: user.about, id: user._id });
    userProfile.setUserAvatar(user.avatar);

    cardsListSection.setItems(cards);
    cardsListSection.renderItems();
  })
  .catch((err) => console.log(err))
  .finally(() => console.log("done"));

enableValidation(config);
