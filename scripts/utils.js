import { renderCard, formValidators } from "./index.js";

const newCardPopup = document.querySelector(".form_type_new-card");
const userInputName = document.querySelector(".form__input_type_name");
const userInputTitle = document.querySelector(".form__input_type_title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profilePopup = document.querySelector(".form_type_profile");
const userInputImageTitle = document.querySelector(
  ".form__input_type_img-title"
);
const userInputImageLink = document.querySelector(".form__input_type_img-link");

function openPopup(popup) {
  popup.classList.add("popup_visible");
  document.addEventListener("keydown", handleKeyDownOnPopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleKeyDownOnPopup);
}

function handleKeyDownOnPopup(event) {
  if (event.key == "Escape") {
    const popup = document.querySelector(".popup_active");
    closePopup(popup);
  }
}

function handleEditButtonClick() {
  userInputName.value = profileName.textContent;
  userInputTitle.value = profileTitle.textContent;
  openPopup(profilePopup);
  formValidators["profileForm"].resetValidation();
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileTitle.textContent = userInputTitle.value;
  closePopup(profilePopup);
}

function handleNewCardButtonClick() {
  openPopup(newCardPopup);
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
  closePopup(newCardPopup);
}

export {
  openPopup,
  closePopup,
  handleEditButtonClick,
  handleEditFormSubmit,
  handleNewCardButtonClick,
  handleNewCardFormSubmit,
};
