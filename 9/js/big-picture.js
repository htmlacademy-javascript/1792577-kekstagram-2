import { isEscapeKey } from './utils.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLike = bigPicture.querySelector('.likes-count');
const bigPictureShownCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureButtonClose = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const loader = document.querySelector('.comments-loader');
const MAX_RENDER_COMMENTS = 5;
let allComments = [];
let shownCommentsCount = 0;

// Обновляет количество показанных комментариев
function updateShownCommentsCount() {
  bigPictureShownCount.textContent = shownCommentsCount;
}

function renderNextComments() {
  const nextCount = Math.min(shownCommentsCount + MAX_RENDER_COMMENTS, allComments.length);
  const commentsToShow = allComments.slice(shownCommentsCount, nextCount);

  // Добавляем новые комментарии в контейнер, не очищая его
  commentsToShow.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    li.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

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
}

// Функция инициализации загрузки комментариев при открытии окна
function initComments(comments) {
  allComments = comments;
  shownCommentsCount = 0;
  commentsContainer.innerHTML = '';
  renderNextComments();
}

// Обработчик кнопки "Загрузить ещё"
loader.addEventListener('click', renderNextComments);

// Открывает модальное окно с полноразмерным изображением и данными
export function openModal(post) {
  // Добавляем класс modal-open к body, чтобы запретить прокрутку страницы
  body.classList.add('modal-open');

  // Показываем модальное окно
  bigPicture.classList.remove('hidden');

  // Заполняем данные
  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  bigPictureLike.textContent = post.likes;
  bigPictureTotalCount.textContent = post.comments.length;
  bigPictureSocialCaption.textContent = post.description;

  // Рендерим комментарии из объекта post
  initComments(post.comments);

  // Добавляем обработчик клавиши Esc для закрытия модалки
  document.addEventListener('keydown', onDocumentKeydown);
}

// Закрывает модальное окно и очищает обработчики
export function closeModal() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  // Удаляем обработчик клавиши Esc
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Обработчик нажатия клавиши
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

// Обработчик клика по кнопке закрытия
bigPictureButtonClose.addEventListener('click', closeModal);

// Обработчик клика по оверлею (закрытие при клике вне контента)
bigPicture.addEventListener('click', (evt) => {
  if (evt.target === bigPicture) {
    closeModal();
  }
});
