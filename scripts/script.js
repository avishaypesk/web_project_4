let editProfileButtonElement = document.querySelector(".profile__edit-button");
let profileFormCloseButtonElement = document.querySelector(
  ".form__close-button"
);
let userInputName = document.querySelector(".form__input_type_name");
let userInputTitle = document.querySelector(".form__input_type_title");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");
let profileForm = document.querySelector(".form");

function openForm(form) {
  form.classList.add("form_visible");
}

function closeForm(form) {
  form.classList.remove("form_visible");
}

function handleEditButtonClick() {
  userInputName.value = profileName.textContent;
  userInputTitle.value = profileTitle.textContent;
  openForm(profileForm);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileTitle.textContent = userInputTitle.value;
  closeForm(profileForm);
}

editProfileButtonElement.addEventListener("click", handleEditButtonClick);
profileForm.addEventListener("submit", handleEditFormSubmit);
profileFormCloseButtonElement.addEventListener("click", () =>
  closeForm(profileForm)
);
