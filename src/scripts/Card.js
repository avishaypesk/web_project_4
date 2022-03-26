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
      handleCardClick,
      handleDeleteClick,
    }
  ) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardSelector = cardSelector;
    this._imageTitleSelector = imageTitleSelector;
    this._imageSelector = imageSelector;
    this._likeButtonSelector = likeButtonSelector;
    this._likeActiveSelector = likeActiveSelector;
    this._deleteButtonSelector = deleteButtonSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;

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

  // _handleDeleteButtonClick = () => {
  //   this._cardElement.remove();
  // };

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(
      this._likeButtonSelector
    );
    this._likeButton.addEventListener("click", this._handleLikeButtonClick);

    const deleteButton = this._cardElement.querySelector(
      this._deleteButtonSelector
    );
    deleteButton.addEventListener("click", (event) =>
      this._handleDeleteClick(event)
    );

    const image = this._cardElement.querySelector(this._imageSelector);
    image.addEventListener("click", () => {
      this._handleCardClick(this);
    });
  }

  createCard() {
    this._cardElement = this._getCardElement();
    this._populateCardInfo();
    this._setEventListeners();
    return this._cardElement;
  }
}
