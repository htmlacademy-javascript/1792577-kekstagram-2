import { openPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

export const renderPictures = (pictureArrays) => {
  picturesContainer.querySelectorAll('.picture').forEach((el) => el.remove());

  const picturesFragment = document.createDocumentFragment();

  pictureArrays.forEach((post) => {
    const picturePost = pictureTemplate.cloneNode(true);

    picturePost.querySelector('.picture__img').src = post.url;
    picturePost.querySelector('.picture__img').alt = post.description;
    picturePost.querySelector('.picture__comments').textContent = post.comments.length;
    picturePost.querySelector('.picture__likes').textContent = post.likes;

    const onPicturePostClick = (evt) => {
      evt.preventDefault();
      openPicture(post);
    };

    picturePost.addEventListener('click', onPicturePostClick);

    picturesFragment.appendChild(picturePost);
  });

  picturesContainer.appendChild(picturesFragment);
};
