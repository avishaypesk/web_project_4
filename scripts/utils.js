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
    const popup = document.querySelector(".popup_visible");
    closePopup(popup);
  }
}

export { openPopup, closePopup };
