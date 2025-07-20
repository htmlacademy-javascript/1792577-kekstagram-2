import { closeEditForm } from './form.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './utils.js';

const imageFormUser = document.querySelector('.img-upload__form');
const hashtagsInput = imageFormUser.querySelector('.text__hashtags');
const descriptionInput = imageFormUser.querySelector('.text__description');
const fileInput = imageFormUser.querySelector('.img-upload__input');
const submitButton = imageFormUser.querySelector('button[type="submit"]');


const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
let errorMessage = '';

const pristine = new Pristine(imageFormUser, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

// Валидация хэштегов
export function validHashtag(value) {
  if (!value.trim()) {
    return true;
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
      return true;
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
}

pristine.addValidator(hashtagsInput, validHashtag, () => errorMessage);

// Валидация комментария
function validateDescription(value) {
  return value.length <= 140;
}

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может быть длиннее 140 символов'
);

function updateSubmitButtonState() {
  submitButton.disabled = !pristine.validate();
}

hashtagsInput.addEventListener('input', updateSubmitButtonState);
descriptionInput.addEventListener('input', updateSubmitButtonState);
fileInput.addEventListener('input', updateSubmitButtonState);

updateSubmitButtonState();

// Сброс формы при закрытии
export function resetFormState() {
  // Сброс эффекта
  const effectNone = imageFormUser.querySelector('#effect-none');
  if (effectNone) {
    effectNone.checked = true;
  }
  // Очистка полей
  hashtagsInput.value = '';
  descriptionInput.value = '';
  if (fileInput) {
    fileInput.value = '';
  }
  pristine.reset();
  updateSubmitButtonState();
}

// Блокировка отправки при ошибках
function setUserFormSubmit() {
  imageFormUser.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      sendData(formData, () => {
        closeEditForm();
        showSuccessMessage();
      }, showErrorMessage);
    }
  });
}
setUserFormSubmit();

