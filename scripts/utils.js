import PopupWithImage from "./PopupWithImage.js";

export function handleCardClick() {
  const popup = new PopupWithImage(
    {
      name: this._name,
      link: this._link,
    },
    {
      popupSelector: this._previewPopupSelector,
      imageSelector: this._previewPopupImageSelector,
      imageTitleSelector: this._previewPopupDescriptionSelector,
    }
  );
  popup.open();
}
