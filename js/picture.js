import { generatePostsArray } from './posts.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

export function renderPictures() {
  const createPicturePost = generatePostsArray(25);
  const picturesFragment = document.createDocumentFragment();

  createPicturePost.forEach((post) => {
    const picturePost = pictureTemplate.cloneNode(true);

    picturePost.querySelector('.picture__img').src = post.url;
    picturePost.querySelector('.picture__img').alt = post.description;
    picturePost.querySelector('.picture__comments').textContent = post.comments.length;
    picturePost.querySelector('.picture__likes').textContent = post.likes;


    picturesFragment.appendChild(picturePost);
  });

  picturesContainer.appendChild(picturesFragment);
}
