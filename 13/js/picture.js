import { openPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

export function renderPictures(pictureArray) {
  picturesContainer.querySelectorAll('.picture').forEach((el) => el.remove());

  const picturesFragment = document.createDocumentFragment();

  pictureArray.forEach((post) => {
    const picturePost = pictureTemplate.cloneNode(true);

    picturePost.querySelector('.picture__img').src = post.url;
    picturePost.querySelector('.picture__img').alt = post.description;
    picturePost.querySelector('.picture__comments').textContent = post.comments.length;
    picturePost.querySelector('.picture__likes').textContent = post.likes;

    picturePost.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPicture(post);
    });

    picturesFragment.appendChild(picturePost);
  });

  picturesContainer.appendChild(picturesFragment);
}
