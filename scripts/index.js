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
const userInputImageTitle = document.querySelector(
  ".form__input_type_img-title"
);
const userInputImageLink = document.querySelector(".form__input_type_img-link");

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
  initialCards.forEach((card) => renderCard(card));
}

function openPopup(popup) {
  popup.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscKeydown);
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscKeydown);
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
  const card = {
    name: userInputImageTitle.value,
    link: userInputImageLink.value,
  };
  renderCard(card);
  closePopup(newCardPopup);
  newCardForm.reset();
  toggleButtonState;
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

function handleEscKeydown(evt) {
  if (evt.key == "Escape") {
    const popup = document.querySelector(".popup_visible");
    closePopup(popup);
  }
}

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
profileForm.addEventListener("submit", handleEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardButtonSubmit);
newCardButtonElement.addEventListener("click", handleNewCardButtonClick);
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_visible")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

renderCards();
