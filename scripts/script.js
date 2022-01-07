let editProfileButtonElement = document.querySelector(".profile__edit-button");
let profileFormCloseButtonElement = document.querySelector(
  ".form__close-button"
);
let userInputName = document.querySelector(".form__input_type_name");
let userInputTitle = document.querySelector(".form__input_type_title");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");
let popup = document.querySelector(".form");
let profileForm = document.querySelector(".form__edit-profile");

function openForm(form) {
  form.classList.add("form_visible");
}

function closeForm(form) {
  form.classList.remove("form_visible");
}

function handleEditButtonClick() {
  userInputName.value = profileName.textContent;
  userInputTitle.value = profileTitle.textContent;
  openForm(popup);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileTitle.textContent = userInputTitle.value;
  closeForm(popup);
}

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
profileForm.addEventListener("submit", handleEditFormSubmit);
profileFormCloseButtonElement.addEventListener("click", () => closeForm(popup));
