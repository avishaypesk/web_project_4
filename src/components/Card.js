export class Card {
  constructor(
    { name, link, isOwner, id, likes, likedByOwner },
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
    this._likes = likes;
    this._likedByOwner = likedByOwner;

    this._cardTemplate = document.querySelector(this._cardTemplateSelector);
    this._cardElement = this._getCardElement();
    this._deleteButtonElement = this._cardElement.querySelector(
      this._deleteButtonSelector
    );
    this._likeCountElement = this._cardElement.querySelector(this._likeCountSelector);
    this._likeButton = this._cardElement.querySelector(this._likeButtonSelector);
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
    this.updateLikes(this._likes);
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _isLiked() {
    return this._likedByOwner(this._likes);
  }

  _getLikesCount() {
    return this._likes.length;
  }

  _renderLikes() {
    const likesCount = this._getLikesCount();
    this._likeCountElement.style.display = likesCount > 0 ? "block" : "none";
    this._likeCountElement.textContent = likesCount;

    if (this._isLiked()) {
      this._likeButton.classList.add(this._likeActiveSelector);
    } else {
      this._likeButton.classList.remove(this._likeActiveSelector);
    }
  }

  _setEventListeners() {
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
    image.addEventListener("click", () => {
      this._handleCardClick(this);
    });
  }

  createCard() {
    this._setEventListeners();
    this._populateCardInfo();
    return this._cardElement;
  }
}
