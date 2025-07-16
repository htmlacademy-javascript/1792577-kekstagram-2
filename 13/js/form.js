import { openModal, closeModal, setEscClose, setOverlayClose } from './utils.js';
import './valid-form.js';
import './select-effect.js';

const imgUpload = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');
const buttonImgCancel = document.querySelector('.img-upload__cancel');

export function initOpenForm() {
  imgUpload.addEventListener('change', () => {
    openModal(imgOverlay);

    const file = imgUpload.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imgPreview.src = imageUrl;

      effectPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${imageUrl})`;
      });
    }
  });
}

export function closeEditForm() {
  closeModal(imgOverlay);
  imgUpload.value = '';
}

// Закрытие формы
buttonImgCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeEditForm();
});

setOverlayClose(imgOverlay, closeEditForm);

setEscClose(imgOverlay, closeEditForm, ['.text__hashtags', '.text__description']);
setOverlayClose(imgOverlay, closeEditForm, ['.text__hashtags', '.text__description']);
