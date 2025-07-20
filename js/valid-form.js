import { closeEditForm } from './form.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './utils.js';
import { setScale } from './scale-control.js';


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
  const hashtagsValid = validHashtag(hashtagsInput.value);
  const descriptionValid = descriptionInput.value.length <= 140;
  submitButton.disabled = !(hashtagsValid && descriptionValid);
}


function removeAllPristineErrors() {
  const errorElements = imageFormUser.querySelectorAll('.pristine-error');
  errorElements.forEach((el) => el.remove());
}

hashtagsInput.addEventListener('input', () => {
  if (!hashtagsInput.value.trim()) {
    pristine.reset();
    removeAllPristineErrors();
  }
  updateSubmitButtonState();
});
hashtagsInput.addEventListener('change', () => {
  if (!hashtagsInput.value.trim()) {
    pristine.reset();
    removeAllPristineErrors();
  }
  updateSubmitButtonState();

});
descriptionInput.addEventListener('input', () => {
  if (!descriptionInput.value.trim()) {
    pristine.reset();
    removeAllPristineErrors();
  }
  updateSubmitButtonState();

});
fileInput.addEventListener('input', updateSubmitButtonState);


hashtagsInput.value = '';
updateSubmitButtonState();

updateSubmitButtonState();

// Сброс формы при закрытии
export function resetFormState() {
  // Сброс эффекта
  const effectNone = imageFormUser.querySelector('#effect-none');
  if (effectNone) {
    effectNone.checked = true;
  }
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

}

// Блокировка отправки при ошибках
function setUserFormSubmit() {
  imageFormUser.addEventListener('submit', (evt) => {
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
  });
}
setUserFormSubmit();

