export class Card {
  constructor(
    { name, link },
    {
      cardTemplateSelector,
      cardSelector,
      imageTitleSelector,
      imageSelector,
      likeButtonSelector,
      likeActiveSelector,
      deleteButtonSelector,
      previewPopupImageSelector,
      previewPopupDescriptionSelector,
      previewPopupSelector,
      handleCardClick,
    }
  ) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardSelector = cardSelector;
    this._imageTitleSelector = imageTitleSelector;
    this._imageSelector = imageSelector;
    this._likeButtonSelector = likeButtonSelector;
    this._likeActiveSelector = likeActiveSelector;
    this._deleteButtonSelector = deleteButtonSelector;
    this._previewPopupImageSelector = previewPopupImageSelector;
    this._previewPopupDescriptionSelector = previewPopupDescriptionSelector;
    this._previewPopupSelector = previewPopupSelector;
    this._handleCardClick = handleCardClick;

    this._name = name;
    this._link = link;

    this._cardTemplate = document.querySelector(this._cardTemplateSelector);
  }

  _getCardElement() {
    return this._cardTemplate.content
      .querySelector(this._cardSelector)
      .cloneNode(true);
  }

  _populateCardInfo() {
    const cardTitleElement = this._cardElement.querySelector(
      this._imageTitleSelector
    );
    const cardImageElement = this._cardElement.querySelector(
      this._imageSelector
    );
    cardTitleElement.textContent = this._name;
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
  }

  _handleLikeButtonClick = () => {
    this._likeButton.classList.toggle(this._likeActiveSelector);
  };

  _handleDeleteButtonClick = () => {
    this._cardElement.remove();
  };

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(
      this._likeButtonSelector
    );
    this._likeButton.addEventListener("click", this._handleLikeButtonClick);

    const deleteButton = this._cardElement.querySelector(
      this._deleteButtonSelector
    );
    deleteButton.addEventListener("click", this._handleDeleteButtonClick);

    const image = this._cardElement.querySelector(this._imageSelector);
    image.addEventListener("click", () => {
      const preview = document.querySelector(this._previewPopupSelector);
      const previewImage = document.querySelector(
        this._previewPopupImageSelector
      );
      const previewDescription = document.querySelector(
        this._previewPopupDescriptionSelector
      );
      previewImage.src = this._link;
      previewImage.alt = this._name;
      previewDescription.textContent = this._name;
      this._handleCardClick(preview);
    });
  }

  createCard() {
    this._cardElement = this._getCardElement();
    this._populateCardInfo();
    this._setEventListeners();
    return this._cardElement;
  }
}