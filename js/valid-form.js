const imageFormUser = document.querySelector('.img-upload__form');
const hashtagsInput = imageFormUser.querySelector('.text__hashtags');
const descriptionInput = imageFormUser.querySelector('.text__description');
const fileInput = imageFormUser.querySelector('.img-upload__input');
const scaleInput = imageFormUser.querySelector('.scale__control--value');

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
function validHashtag(value) {
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

// Валидация на лету
hashtagsInput.addEventListener('input', () => {
  pristine.validate(hashtagsInput);
});
descriptionInput.addEventListener('input', () => {
  pristine.validate(descriptionInput);
});

// Сброс формы при закрытии
export function resetFormState() {
  // Сброс масштаба
  if (scaleInput) {
    scaleInput.value = '100%';
  }
  // Сброс эффекта
  const effectNone = imageFormUser.querySelector('#effect-none');
  if (effectNone) {
    effectNone.checked = true;
  }
  // Очистка полей
  hashtagsInput.value = '';
  descriptionInput.value = '';
  // Очистка input file
  if (fileInput) {
    fileInput.value = '';
  }
}

// Закрытие формы (пример, если используете отдельный модуль для открытия/закрытия)
export function closeEditForm() {
  // Здесь ваш код для скрытия модалки, например:
  // closeModal(imgOverlay);
  resetFormState();
}

// Блокировка отправки при ошибках
imageFormUser.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
