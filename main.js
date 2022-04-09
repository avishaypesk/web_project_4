!function(){"use strict";class e{constructor(e){var t,i;i=e=>{"Escape"==e.key&&this.close()},(t="_handleEscClose")in this?Object.defineProperty(this,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):this[t]=i,this._popupElement=document.querySelector(e)}open(){this._popupElement.classList.add("popup_visible"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popupElement.classList.remove("popup_visible"),document.removeEventListener("keydown",this._handleEscClose)}setEventListeners(){this._popupElement.addEventListener("mousedown",(e=>{e.target.classList.contains("popup_visible")&&this.close(),e.target.classList.contains("popup__close-button")&&this.close()}))}}class t extends e{constructor(e,t){let{handleSubmit:i,buttonText:n,loadingButtonText:o}=t;var s,r;super(e),r=e=>{e.preventDefault(),this._handleSubmit(this._getInputValues())},(s="_handleFormSubmit")in this?Object.defineProperty(this,s,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[s]=r,this._handleSubmit=i,this._formElement=this._popupElement.querySelector(".form"),this._buttonText=n,this._loadingButtonText=o,this._submitButton=this._formElement.querySelector(".form__save-button")}_getInputValues(){const e={};return[...this._formElement.querySelectorAll(".form__input")].forEach((t=>{e[t.name]=t.value})),e}showLoading(){this._submitButton.textContent=this._loadingButtonText}hideLoading(){this._submitButton.textContent=this._buttonText}setEventListeners(){super.setEventListeners(),this._formElement.addEventListener("submit",this._handleFormSubmit)}close(){super.close(),this._formElement.reset()}}class i{constructor(e,t){let{name:i,link:n,isOwner:o,id:s,likes:r,likedByOwner:l}=e,{cardTemplateSelector:a,cardSelector:c,imageTitleSelector:h,imageSelector:u,likeButtonSelector:_,likeActiveSelector:d,deleteButtonSelector:m,handleCardClick:p,handleDeleteClick:S,handleLikeClick:k,likeCountSelector:E}=t;this._cardTemplateSelector=a,this._cardSelector=c,this._imageTitleSelector=h,this._imageSelector=u,this._likeButtonSelector=_,this._likeActiveSelector=d,this._deleteButtonSelector=m,this._handleCardClick=p,this._handleDeleteClick=S,this._handleLikeClick=k,this._likeCountSelector=E,this._name=i,this._link=n,this._isOwner=o,this._id=s,this._likes=r,this._likedByOwner=l,this._cardTemplate=document.querySelector(this._cardTemplateSelector),this._cardElement=this._getCardElement(),this._deleteButtonElement=this._cardElement.querySelector(this._deleteButtonSelector),this._likeCountElement=this._cardElement.querySelector(this._likeCountSelector),this._likeButton=this._cardElement.querySelector(this._likeButtonSelector)}_getCardElement(){return this._cardTemplate.content.querySelector(this._cardSelector).cloneNode(!0)}_populateCardInfo(){const e=this._cardElement.querySelector(this._imageTitleSelector),t=this._cardElement.querySelector(this._imageSelector);e.textContent=this._name,t.src=this._link,t.alt=this._name,this._isOwner||this._deleteButtonElement.remove(),this.updateLikes(this._likes)}updateLikes(e){this._likes=e,this._renderLikes()}_isLiked(){return this._likedByOwner(this._likes)}_getLikesCount(){return this._likes.length}_renderLikes(){const e=this._getLikesCount();this._likeCountElement.style.display=e>0?"block":"none",this._likeCountElement.textContent=e,this._isLiked()?this._likeButton.classList.add(this._likeActiveSelector):this._likeButton.classList.remove(this._likeActiveSelector)}_setEventListeners(){this._likeButton.addEventListener("click",(()=>this._handleLikeClick(this._id,this._likeButton.classList.toggle(this._likeActiveSelector),this))),this._isOwner&&this._deleteButtonElement.addEventListener("click",(()=>this._handleDeleteClick(this._id,this._cardElement))),this._cardElement.querySelector(this._imageSelector).addEventListener("click",(()=>{this._handleCardClick(this)}))}createCard(){return this._setEventListeners(),this._populateCardInfo(),this._cardElement}}class n{constructor(e,t){let{formSelector:i,inputSelector:n,errorClass:o,inactiveButtonClass:s,inputErrorClass:r,submitButtonSelector:l,previewPopupSelector:a}=e;this._formSelector=i,this._inputSelector=n,this._errorClass=o,this._inactiveButtonClass=s,this._inputErrorClass=r,this._submitButtonSelector=l,this._form=t,this._previewPopupSelector=a}_showInputError(e){const t=this._form.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_removeInputError(e){const t=this._form.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_checkInputValidity(e){e.validity.valid?this._removeInputError(e):this._showInputError(e)}_toggleButtonState(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled=!0):(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1)}_setFormListeners(){this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._buttonElement=this._form.querySelector(this._submitButtonSelector),this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._removeInputError(e)}))}enableValidation(){this._setFormListeners()}}const o=document.querySelector(".profile__add-button"),s=document.querySelector(".profile__edit-button"),r=document.querySelector(".profile__avatar-icon"),l=document.querySelector(".form__input_type_name"),a=document.querySelector(".form__input_type_title");document.querySelector(".form__input_type_img-title"),document.querySelector(".form__input_type_img-link"),s.addEventListener("click",(function(){const{name:e,title:t}=d.getUserInfo();l.value=e,a.value=t,u.open(),g.profileForm.resetValidation()})),o.addEventListener("click",(function(){_.open(),g.newCardForm.resetValidation()})),r.addEventListener("click",(function(){h.open()}));const c=new class extends e{constructor(e,t){let{handleSubmit:i,buttonText:n,loadingButtonText:o}=t;var s,r;super(e),r=e=>{e.preventDefault(),this._handleSubmit(this._cardId,this._cardElement)},(s="_handleConfirmClick")in this?Object.defineProperty(this,s,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[s]=r,this._popupElement=document.querySelector(e),this._handleSubmit=i,this._buttonText=n,this._loadingButtonText=o,this._submitButton=this._popupElement.querySelector(".form__save-button")}open(e,t){super.open(),this._cardId=e,this._cardElement=t}showLoading(){this._submitButton.textContent=this._loadingButtonText}hideLoading(){this._submitButton.textContent=this._buttonText}setEventListeners(){super.setEventListeners(),this._submitButton.addEventListener("click",this._handleConfirmClick)}}(".form_type_delete-confirm",{handleSubmit:function(e,t){c.showLoading(),b.deleteCard(e).then((()=>{t.remove(),c.close()})).catch(b.handleError).finally((()=>c.hideLoading()))},buttonText:"Save",loadingButtonText:"Saving..."});c.setEventListeners();const h=new t(".form_type_profile-avatar",{handleSubmit:function(e){let{profileImageUrlInput:t}=e;h.showLoading(),b.updateUserImage(t).then((()=>{d.setUserAvatar(t),h.close()})).catch(b.handleError).finally((()=>h.hideLoading()))},buttonText:"Save",loadingButtonText:"Saving..."});h.setEventListeners();const u=new t(".form_type_profile",{handleSubmit:function(e){let{profileName:t,profileTitle:i}=e;u.showLoading(),b.updateUserInfo({name:t,about:i}).then((e=>{d.setUserInfo({name:e.name,title:e.about}),u.close()})).catch(b.handleError).finally((()=>{u.hideLoading()}))},buttonText:"Save",loadingButtonText:"Saving..."});u.setEventListeners();const _=new t(".form_type_new-card",{handleSubmit:function(e){const{newCardName:t,newCardLink:i}=e;_.showLoading(),b.submitNewCard({name:t,link:i}).then((e=>{E(e,!0,e._id,e.likes,S),_.close()})).catch(b.handleError).finally((()=>{_.hideLoading()}))},buttonText:"Create",loadingButtonText:"Saving..."});_.setEventListeners();const d=new class{constructor(e){let{nameSelector:t,titleSelector:i,imageSelector:n}=e;var o,s;s=()=>this._userId,(o="getUserId")in this?Object.defineProperty(this,o,{value:s,enumerable:!0,configurable:!0,writable:!0}):this[o]=s,this._nameElement=document.querySelector(t),this._titleElement=document.querySelector(i),this._imageElement=document.querySelector(n)}getUserInfo(){return{name:this._nameElement.textContent,title:this._titleElement.textContent}}setUserInfo(e){let{name:t,title:i,id:n}=e;this._nameElement.textContent=t,this._titleElement.textContent=i,this._userId=n}setUserAvatar(e){this._imageElement.style.backgroundImage='url("'.concat(e,'")')}}({nameSelector:".profile__name",titleSelector:".profile__title",imageSelector:".profile__avatar"}),m=new class extends e{constructor(e){let{popupSelector:t,imageSelector:i,imageTitleSelector:n}=e;super(t),this._imageElement=this._popupElement.querySelector(i),this._titleElement=this._popupElement.querySelector(n)}_populateInfo(){this._titleElement.textContent=this._name,this._imageElement.src=this._link,this._imageElement.alt=this._name}open(e,t){this._name=e,this._link=t,this._populateInfo(),super.open()}}({popupSelector:".preview",imageSelector:".preview__preview-image",imageTitleSelector:".preview__description"}),p=new class{constructor(e,t){let{renderer:i}=e;this._renderer=i,this._container=document.querySelector(t)}setItems(e){this._items=e}renderItems(){this._items.reverse(),this._items.forEach((e=>this._renderer(e)))}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=e.owner._id==d.getUserId(),i=e.likes;E(e,t,e._id,i,S)}},".places");function S(e){return e.some((e=>e._id==d.getUserId()))}function k(e,t,i){const n=e=>{i.updateLikes(e.likes)};t?b.increaseLikeCount(e).then(n).catch(b.handleError):b.reduceLikeCount(e).then(n).catch(b.handleError)}function E(e,t,n,o,s){p.addItem(function(e,t,n,o,s){return new i({name:e.name,link:e.link,isOwner:t,id:n,likes:o,likedByOwner:s},{cardTemplateSelector:"#card-template",cardSelector:".places__card",imageTitleSelector:".places__title",imageSelector:".places__image",likeActiveSelector:"places__like-button_active",likeButtonSelector:".places__like-button",deleteButtonSelector:".places__remove-button",likeCountSelector:".places__like-count",handleCardClick:v,handleDeleteClick:f,handleLikeClick:k}).createCard()}(e,t,n,o,s))}function f(e,t){c.open(e,t)}function v(e){m.open(e._name,e._link)}m.setEventListeners();const g={},b=new class{constructor(e){let{authenticationToken:t,rootUrl:i}=e;this._handleResponse=e=>e.ok?e.json():Promise.reject("Error: ".concat(e.status)),this.handleError=e=>console.log(e),this._authenticationToken=t,this._rootUrl=i}getInitialCards(){return fetch("".concat(this._rootUrl,"cards"),{headers:{authorization:this._authenticationToken}}).then(this._handleResponse)}getUserInfo(){return fetch("".concat(this._rootUrl,"users/me"),{headers:{authorization:this._authenticationToken}}).then(this._handleResponse)}updateUserInfo(e){let{name:t,about:i}=e;return fetch("".concat(this._rootUrl,"users/me"),{method:"PATCH",headers:{authorization:this._authenticationToken,"Content-Type":"application/json"},body:JSON.stringify({name:t,about:i})}).then(this._handleResponse)}updateUserImage(e){return fetch("".concat(this._rootUrl,"users/me/avatar"),{method:"PATCH",headers:{authorization:this._authenticationToken,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then(this._handleResponse)}submitNewCard(e){let{name:t,link:i}=e;return fetch("".concat(this._rootUrl,"cards"),{method:"POST",headers:{authorization:this._authenticationToken,"Content-Type":"application/json"},body:JSON.stringify({name:t,link:i})}).then(this._handleResponse)}deleteCard(e){return fetch("".concat(this._rootUrl,"cards/").concat(e),{method:"DELETE",headers:{authorization:this._authenticationToken}}).then(this._handleResponse)}increaseLikeCount(e){return fetch("".concat(this._rootUrl,"cards/likes/").concat(e),{method:"PUT",headers:{authorization:this._authenticationToken}}).then(this._handleResponse)}reduceLikeCount(e){return fetch("".concat(this._rootUrl,"cards/likes/").concat(e),{method:"DELETE",headers:{authorization:this._authenticationToken}}).then(this._handleResponse)}}({authenticationToken:"b21895f7-79d1-4177-9817-d22cf233df9c",rootUrl:"https://around.nomoreparties.co/v1/group-12/"}),C=b.getInitialCards().catch(b.handleError),y=b.getUserInfo().catch(b.handleError);var L;Promise.all([C,y]).then((e=>{let[t,i]=e;d.setUserInfo({name:i.name,title:i.about,id:i._id}),d.setUserAvatar(i.avatar),p.setItems(t),p.renderItems()})).catch((e=>console.log(e))).finally((()=>console.log("done"))),L={formSelector:".form",inputSelector:".form__input",errorClass:"form__input-error_active",inactiveButtonClass:"button_disabled",inputErrorClass:"form__input_type_error",submitButtonSelector:".form__save-button"},Array.from(document.querySelectorAll(L.formSelector)).forEach((e=>{const t=new n(L,e),i=e.getAttribute("name");g[i]=t,t.enableValidation()}))}();