import { openModal, closeModal, setEscClose, setOverlayClose, } from './utils.js';
import { resetFormState } from './valid-form.js';
import { initEffect} from './select-effect.js';
import { setScale } from './scale-control.js';

const imgUpload = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');
const buttonImgCancel = document.querySelector('.img-upload__cancel');

const onImgUploadChange = () => {
  openModal(imgOverlay);
  initEffect();
  setScale(100);
  const file = imgUpload.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    imgPreview.src = imageUrl;

    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });
  }
};

export const initOpenForm = () => {
  imgUpload.addEventListener('change', onImgUploadChange);
};

export const closeEditForm = () => {
  closeModal(imgOverlay);
  imgUpload.value = '';
  resetFormState();
};

const onButtonImgCancelClick = (evt) => {
  evt.preventDefault();
  closeEditForm();
};

// Закрытие формы
buttonImgCancel.addEventListener('click', onButtonImgCancelClick);

setOverlayClose(imgOverlay, closeEditForm);

setEscClose(imgOverlay, () => {
  if (!document.querySelector('.error')) {
    closeEditForm();
  }
}, ['.text__hashtags', '.text__description']);
