import { openModal, closeModal, setEscClose, setOverlayClose } from './utils.js';

const MAX_RENDER_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLike = bigPicture.querySelector('.likes-count');
const bigPictureShownCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureButtonClose = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const loader = document.querySelector('.comments-loader');

let allComments = [];
let shownCommentsCount = 0;

// Обновляет количество показанных комментариев

const updateShownCommentsCount = () => {
  bigPictureShownCount.textContent = shownCommentsCount;
};

const renderNextComments = () => {
  const nextCount = Math.min(shownCommentsCount + MAX_RENDER_COMMENTS, allComments.length);
  const commentsToShow = allComments.slice(shownCommentsCount, nextCount);

  // Добавляем новые комментарии в контейнер

  commentsToShow.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.className = 'social__picture';
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.className = 'social__text';
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);

    commentsContainer.appendChild(li);
  });

  shownCommentsCount = nextCount;
  updateShownCommentsCount();

  // Обновляем видимость кнопки "Загрузить ещё"

  if (shownCommentsCount >= allComments.length) {
    loader.classList.add('hidden');
  } else {
    loader.classList.remove('hidden');
  }
};

// Функция инициализации загрузки комментариев при открытии окна

const initComments = (comments) => {
  allComments = comments;
  shownCommentsCount = 0;
  commentsContainer.innerHTML = '';
  renderNextComments();
};

const onLoaderClick = () => {
  renderNextComments();
};

// Обработчик кнопки "Загрузить ещё"
loader.addEventListener('click', onLoaderClick);

// Открывает модальное окно с полноразмерным изображением и данными

export const openPicture = (post) => {
  openModal(bigPicture);

  // Заполняем данные

  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  bigPictureLike.textContent = post.likes;
  bigPictureTotalCount.textContent = post.comments.length;
  bigPictureSocialCaption.textContent = post.description;

  // Рендерим комментарии из объекта post

  initComments(post.comments);
};

// Закрывает модальное окно и очищает обработчики

const closePicture = () => {
  closeModal(bigPicture);
};

const onBigPictureButtonCloseClick = () => {
  closePicture();
};

// Обработчик клика по кнопке закрытия
bigPictureButtonClose.addEventListener('click', onBigPictureButtonCloseClick);

const onBigPictureClick = (evt) => {
  if (evt.target === bigPicture) {
    closePicture();
  }
};

// Обработчик клика по оверлею (закрытие при клике вне контента)
bigPicture.addEventListener('click', onBigPictureClick);

setEscClose(bigPicture, closePicture);

setOverlayClose(bigPicture, closePicture);
