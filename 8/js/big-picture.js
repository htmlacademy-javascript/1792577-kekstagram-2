import { isEscapeKey } from './utils.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLike = bigPicture.querySelector('.likes-count');
const bigPictureShownCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureButtonClose = bigPicture.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const loader = document.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');


// Обновляет количество показанных комментариев

function updateShownCommentsCount() {
  const shownCommentsCount = commentsContainer.querySelectorAll('.social__comment').length;
  bigPictureShownCount.textContent = shownCommentsCount;
}


function renderComments(comments) {
  commentsContainer.innerHTML = '';

  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    li.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    commentsContainer.appendChild(li);
  });

  updateShownCommentsCount();
}

// Открывает модальное окно с полноразмерным изображением и данными

export function openModal(post) {
  // Скрываем блоки счётчика комментариев и загрузки
  commentCount.classList.add('hidden');
  loader.classList.add('hidden');

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
  renderComments(post.comments);

  // Добавляем обработчик клавиши Esc для закрытия модалки
  document.addEventListener('keydown', onDocumentKeydown);
}

//Закрывает модальное окно и очищает обработчики

export function closeModal() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  // Восстанавливаем видимость блоков счётчика и загрузки (если нужно)
  commentCount.classList.remove('hidden');
  loader.classList.remove('hidden');

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
