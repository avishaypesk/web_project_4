import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../utils/Api";
import ConfirmPopup from "../components/ConfirmPopup";
import {
  config,
  editProfileButtonElement,
  newCardButtonElement,
  userInputName,
  userInputTitle,
  editAvatarButtonElement,
} from "../utils/constants.js";

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);
editAvatarButtonElement.addEventListener("click", handleAvatarEditClick);

export const deleteConfirmPopup = new ConfirmPopup(".form_type_delete-confirm", {
  handleSubmit: handleDeleteConfirm,
  buttonText: "Delete",
  loadingButtonText: "Deleting...",
});
deleteConfirmPopup.setEventListeners();

export const profileAvatarPopup = new PopupWithForm(".form_type_profile-avatar", {
  handleSubmit: handleAvatarSubmit,
  buttonText: "Save",
  loadingButtonText: "Saving...",
});
profileAvatarPopup.setEventListeners();

export const profilePopup = new PopupWithForm(".form_type_profile", {
  handleSubmit: handleEditFormSubmit,
  buttonText: "Save",
  loadingButtonText: "Saving...",
});
profilePopup.setEventListeners();

export const newCardPopup = new PopupWithForm(".form_type_new-card", {
  handleSubmit: handleNewCardFormSubmit,
  buttonText: "Create",
  loadingButtonText: "Saving...",
});
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
      const cardLikes = card.likes;
      renderCard(card, isOwner, card._id, cardLikes, islikedByOwner);
    },
  },
  ".places"
);

function createCard(card, isOwner, id, likes, likedByOwner) {
  const newCard = new Card(
    {
      name: card.name,
      link: card.link,
      isOwner,
      id,
      likes,
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

function islikedByOwner(likes) {
  return likes.some((user) => user._id == userProfile.getUserId());
}

function handleLikeClick(cardId, liked, card) {
  const updateLikes = (res) => {
    card.updateLikes(res.likes);
  };
  if (liked) {
    api.increaseLikeCount(cardId).then(updateLikes).catch(api.handleError);
  } else {
    api.reduceLikeCount(cardId).then(updateLikes).catch(api.handleError);
  }
}

function renderCard(card, isOwner, id, likes, likedByOwner) {
  cardsListSection.addItem(createCard(card, isOwner, id, likes, likedByOwner));
}

function handleDeleteClick(cardId, cardElement) {
  deleteConfirmPopup.open(cardId, cardElement);
}

function handleDeleteConfirm(cardId, cardElement) {
  deleteConfirmPopup.showLoading();
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      deleteConfirmPopup.close();
    })
    .catch(api.handleError)
    .finally(() => deleteConfirmPopup.hideLoading());
}

function handleCardClick(card) {
  preview.open(card._name, card._link);
}
preview.setEventListeners();

function handleAvatarSubmit({ profileImageUrlInput: url }) {
  profileAvatarPopup.showLoading();
  api
    .updateUserImage(url)
    .then(() => {
      userProfile.setUserAvatar(url);
      profileAvatarPopup.close();
    })
    .catch(api.handleError)
    .finally(() => profileAvatarPopup.hideLoading());
}

function handleNewCardButtonClick() {
  newCardPopup.open();
  formValidators["newCardForm"].resetValidation();
}

function handleNewCardFormSubmit(cardValues) {
  const { newCardName: name, newCardLink: link } = cardValues;
  newCardPopup.showLoading();
  api
    .submitNewCard({ name, link })
    .then((card) => {
      renderCard(card, true, card._id, card.likes, islikedByOwner);
      newCardPopup.close();
    })
    .catch(api.handleError)
    .finally(() => {
      newCardPopup.hideLoading();
    });
}

function handleEditButtonClick() {
  const { name, title } = userProfile.getUserInfo();
  userInputName.value = name;
  userInputTitle.value = title;
  profilePopup.open();
  formValidators["profileForm"].resetValidation();
}

function handleEditFormSubmit({ profileName: name, profileTitle: about }) {
  profilePopup.showLoading();
  api
    .updateUserInfo({ name, about })
    .then((user) => {
      userProfile.setUserInfo({ name: user.name, title: user.about });
      profilePopup.close();
    })
    .catch(api.handleError)
    .finally(() => {
      profilePopup.hideLoading();
    });
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

const api = new Api({
  authenticationToken: "b21895f7-79d1-4177-9817-d22cf233df9c",
  rootUrl: "https://around.nomoreparties.co/v1/group-12/",
});
const cardsPromise = api.getInitialCards().catch(api.handleError);
const userInfoPromise = api.getUserInfo().catch(api.handleError);

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
