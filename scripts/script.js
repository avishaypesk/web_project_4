const cards = [
  {
    name: "Lago di Braies",
    link: "./images/lago.png",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "./images/mountain.jpg",
  },
  {
    name: "Lake Louise",
    link: "./images/louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "./images/yosemite.jpg",
  },
];

const editProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
const newCardButtonElement = document.querySelector(".profile__add-button");
const profileFormCloseButtonElement = document.querySelector(
  ".form__close-button"
);
const userInputName = document.querySelector(".form__input_type_name");
const userInputTitle = document.querySelector(".form__input_type_title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profilePopup = document.querySelector(".form_type_profile");
const newCardPopup = document.querySelector(".form_type_new-card");
const previewPopup = document.querySelector(".preview");
const previewPopupImage = document.querySelector(".preview__preview-image");
const previewPopupDesc = document.querySelector(".preview__description");
const profileForm = document.querySelector(".form__edit-profile");
const newCardForm = document.querySelector(".form__new-card");
const popups = document.querySelectorAll(".popup");
const cardTemplate = document.querySelector("#card-template").content;
const cardsSection = document.querySelector(".places");
const userInputImgTitle = document.querySelector(".form__input_type_img-title");
const userInputImgLink = document.querySelector(".form__input_type_img-link");

function createCard(card) {
  const cardElement = cardTemplate
    .querySelector(".places__card")
    .cloneNode(true);
  const cardImageElement = cardElement.querySelector(".places__image");
  const cardRemoveButtonElement = cardElement.querySelector(
    ".places__remove-button"
  );
  const cardTitleElement = cardElement.querySelector(".places__title");
  const cardLikeButtonElement = cardElement.querySelector(
    ".places__like-button"
  );

  cardImageElement.addEventListener("click", handleViewPreview);
  cardRemoveButtonElement.addEventListener("click", handleRemoveButtonClick);
  cardLikeButtonElement.addEventListener("click", handleLikeButtonClick);

  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;
  cardTitleElement.textContent = card.name;

  return cardElement;
}

function renderCard(card) {
  cardsSection.prepend(createCard(card));
}

function renderCards() {
  cards.forEach((card) => renderCard(card));
}

function openPopup(popup) {
  popup.classList.add("popup_visible");
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
}

function handleEditButtonClick() {
  userInputName.value = profileName.textContent;
  userInputTitle.value = profileTitle.textContent;
  openPopup(profilePopup);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileTitle.textContent = userInputTitle.value;
  closePopup(profilePopup);
}

function handleNewCardButtonClick() {
  openPopup(newCardPopup);
}

function handleNewCardButtonSubmit(evt) {
  evt.preventDefault();
  const card = { name: userInputImgTitle.value, link: userInputImgLink.value };
  renderCard(card);
  closePopup(newCardPopup);
}

function handleViewPreview(evt) {
  previewPopupImage.src = evt.currentTarget.src;
  previewPopupImage.alt = evt.currentTarget.alt;
  previewPopupDesc.textContent = evt.currentTarget.alt;
  openPopup(previewPopup);
}

function handleRemoveButtonClick(evt) {
  evt.target.closest(".places__card").remove();
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("places__like-button_active");
}

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
profileForm.addEventListener("submit", handleEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardButtonSubmit);
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_visible")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

renderCards();
