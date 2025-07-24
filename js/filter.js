import { renderPictures } from './picture.js';
import { debounce } from './utils.js';

const COUNT__PHOTO = 10;

const imgFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');
const debouncedRenderPictures = debounce(renderPictures, 500);
let photos = [];

const getRandomPhotos = (arrays, count) => {
  const shuffled = arrays.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const setActiveFilter = (activeButton) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  activeButton.classList.add('img-filters__button--active');
};

export const showFilter = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

export const setPhotosForFilter = (newPhotos) => {
  photos = newPhotos;
};

const onDefaultButtonClick = () => {
  setActiveFilter(defaultButton);
  debouncedRenderPictures(photos);
};

const onRandomButtonClick = () => {
  setActiveFilter(randomButton);
  const randomPhotos = getRandomPhotos(photos, COUNT__PHOTO);
  debouncedRenderPictures(randomPhotos);
};

const onDiscussedButtonClick = () => {
  setActiveFilter(discussedButton);
  const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  debouncedRenderPictures(discussedPhotos);
};

defaultButton.addEventListener('click', onDefaultButtonClick);
randomButton.addEventListener('click', onRandomButtonClick);
discussedButton.addEventListener('click', onDiscussedButtonClick);
