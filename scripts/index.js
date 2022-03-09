import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import {
  handleEditButtonClick,
  handleEditFormSubmit,
  handleNewCardButtonClick,
  handleNewCardFormSubmit,
  renderCard,
  enableValidation,
} from "./utils";
import {
  config,
  initialCards,
  editProfileButtonElement,
  newCardButtonElement,
} from "./constants";

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);

export const cardsListSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardsSection
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

enableValidation(config);
cardsListSection.renderItems();
