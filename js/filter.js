import { renderPictures } from './picture.js';
import { debounce } from './utils.js';

const imgFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

const COUNT__PHOTO = 10;

let photos = [];

function getRandomPhotos(array, count) {
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function setActiveFilter(activeButton) {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  activeButton.classList.add('img-filters__button--active');
}

export function showFilter() {
  imgFilters.classList.remove('img-filters--inactive');
}

export function setPhotosForFilter(newPhotos) {
  photos = newPhotos;
}

const debouncedRenderPictures = debounce(renderPictures, 500);

defaultButton.addEventListener('click', () => {
  setActiveFilter(defaultButton);
  debouncedRenderPictures(photos);
});

randomButton.addEventListener('click', () => {
  setActiveFilter(randomButton);
  const randomPhotos = getRandomPhotos(photos, COUNT__PHOTO);
  debouncedRenderPictures(randomPhotos);
});

discussedButton.addEventListener('click', () => {
  setActiveFilter(discussedButton);
  const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  debouncedRenderPictures(discussedPhotos);
});
