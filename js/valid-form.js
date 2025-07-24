import { closeEditForm } from './form.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './utils.js';
import { setScale } from './scale-control.js';
import { initEffect } from './select-effect.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const imageFormUser = document.querySelector('.img-upload__form');
const hashtagsInput = imageFormUser.querySelector('.text__hashtags');
const descriptionInput = imageFormUser.querySelector('.text__description');
const fileInput = imageFormUser.querySelector('.img-upload__input');
const submitButton = imageFormUser.querySelector('button[type="submit"]');

let errorMessage = '';

const pristine = new Pristine(imageFormUser, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

// Валидация хэштегов
export const validHashtag = (value) => {
  if (!value.trim()) {
    return true; // если поле пустое — валидация проходит
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    errorMessage = 'Не более 5 хэштегов';
    return false;
  }
  for (const tag of hashtags) {
    if (tag[0] !== '#') {
      errorMessage = 'Хэштег должен начинаться с #';
      return false;
    }
    if (tag === '#') {
      errorMessage = 'Хештег не может состоять только из одной решётки';
      return false;
    }
    if (tag.length > 20) {
      errorMessage = 'Хэштег не длинее 20 символов';
      return false;
    }
    if (!HASHTAG_REGEX.test(tag)) {
      errorMessage = 'Не может содержать спецсимволы #, @, $';
      return false;
    }
  }

  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);
  if (uniqueTags.size !== hashtags.length) {
    errorMessage = 'Есть повторяющиеся хэштеги';
    return false;
  }
  return true;
};

pristine.addValidator(hashtagsInput, validHashtag, () => errorMessage);

// Валидация комментария
const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может быть длиннее 140 символов'
);

const updateSubmitButtonState = () => {
  const hashtagsValid = validHashtag(hashtagsInput.value);
  const descriptionValid = descriptionInput.value.length <= 140;
  submitButton.disabled = !(hashtagsValid && descriptionValid);
};

const removeAllPristineErrors = () => {
  const errorElements = imageFormUser.querySelectorAll('.pristine-error');
  errorElements.forEach((el) => el.remove());
};

const onHashtagsInputInput = () => {
  if (!hashtagsInput.value.trim()) {
    pristine.reset();
    removeAllPristineErrors();
  }
  updateSubmitButtonState();
};

const onHashtagsInputChange = () => {
  if (!hashtagsInput.value.trim()) {
    pristine.reset();
    removeAllPristineErrors();
  }
  updateSubmitButtonState();
};

const onDescriptionInputInput = () => {
  if (!descriptionInput.value.trim()) {
    pristine.reset();
    removeAllPristineErrors();
  }
  updateSubmitButtonState();
};

hashtagsInput.addEventListener('input', onHashtagsInputInput);
hashtagsInput.addEventListener('change', onHashtagsInputChange);
descriptionInput.addEventListener('input', onDescriptionInputInput);
fileInput.addEventListener('input', updateSubmitButtonState);


hashtagsInput.value = '';

updateSubmitButtonState();

// Сброс формы при закрытии
export const resetFormState = () => {
  // Сброс эффекта
  const effectNone = imageFormUser.querySelector('#effect-none');
  if (effectNone) {
    effectNone.checked = true;
  }
  initEffect();
  setScale(100);
  // Очистка полей
  hashtagsInput.value = '';
  descriptionInput.value = '';
  if (fileInput) {
    fileInput.value = '';
  }
  pristine.reset();
  removeAllPristineErrors();
  updateSubmitButtonState();
};

const onImageFormUserSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    const formData = new FormData(evt.target);
    sendData(formData, () => {
      closeEditForm();
      showSuccessMessage();
      submitButton.disabled = false;
    }, () => {
      showErrorMessage();
      submitButton.disabled = false;
    });
  }
};

// Блокировка отправки при ошибках
const setUserFormSubmit = () => {
  imageFormUser.addEventListener('submit', onImageFormUserSubmit);
};
setUserFormSubmit();

