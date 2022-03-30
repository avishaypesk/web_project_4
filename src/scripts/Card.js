export class Card {
  constructor(
    { name, link, isOwner, id, likeCount = 0, likedByOwner = false },
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
      handleLikeClick,
      likeCountSelector,
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
    this._handleLikeClick = handleLikeClick;
    this._likeCountSelector = likeCountSelector;

    this._name = name;
    this._link = link;
    this._isOwner = isOwner;
    this._id = id;
    this._likeCount = likeCount;
    this._likedByOwner = likedByOwner;

    this._cardTemplate = document.querySelector(this._cardTemplateSelector);
    this._cardElement = this._getCardElement();
    this._deleteButtonElement = this._cardElement.querySelector(
      this._deleteButtonSelector
    );
  }

  _getCardElement() {
    return this._cardTemplate.content.querySelector(this._cardSelector).cloneNode(true);
  }

  _populateCardInfo() {
    const cardTitleElement = this._cardElement.querySelector(this._imageTitleSelector);
    const cardImageElement = this._cardElement.querySelector(this._imageSelector);
    cardTitleElement.textContent = this._name;
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
    if (!this._isOwner) this._deleteButtonElement.remove();
    if (this._likedByOwner) this._likeButton.classList.add(this._likeActiveSelector);
    this.updateLikeCount(this._likeCount);
  }

  updateLikeCount(likes) {
    this._likeCount = likes;
    this._toggleLikeCount(this._likeCount > 0);
  }

  _toggleLikeCount(display) {
    this._likeCountElement.style.display = display ? "block" : "none";
    this._likeCountElement.textContent = this._likeCount;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(this._likeButtonSelector);
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(
        this._id,
        this._likeButton.classList.toggle(this._likeActiveSelector),
        this
      )
    );

    if (this._isOwner) {
      this._deleteButtonElement.addEventListener("click", () =>
        this._handleDeleteClick(this._id, this._cardElement)
      );
    }

    const image = this._cardElement.querySelector(this._imageSelector);
    image.addEventListener("click", (event) => {
      this._handleCardClick(event);
    });
  }

  createCard() {
    this._populateCardInfo();
    this._setEventListeners();
    return this._cardElement;
  }
}
