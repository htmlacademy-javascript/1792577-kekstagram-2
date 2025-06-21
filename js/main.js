const minGeneralNumber = 1;
const maxGeneralNumber = 25;
const minLikesNumber = 15;
const maxLikesNumber = 200;
const minCommentNumber = 0;
const maxCommentNumber = 30;
const minavatarPhoto = 1;
const maxavatarPhoto = 6;

const descriptions = [
  'Прекрасный момент',
  'Просто день',
  'На память',
  'Легкий кадр',
  'Обычный день',
  'Просто фото',
  'Мгновение жизни',
  'Время остановилось',
  'Тихий уголок',
  'Без слов',
  'Просто так',
  'Немного света',
  'Мир вокруг',
  'Взгляд в объектив',
  'Пауза на секунду',
  'Теплый день',
  'Просто настроение',
  'Спокойствие и тишина',
  'Время для себя',
  'Маленькое счастье',
  'Свет и тень',
  'Вдохновение рядом',
  'Обычный кадр',
  'Просто здесь и сейчас',
  'Момент тишины',
  'Легкость бытия',
  'Взгляд в небо',
  'Тишина вокруг',
  'Небольшое приключение',
  'Просто жизнь'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Алексей',
  'Марина',
  'Игорь',
  'Екатерина',
  'Дмитрий',
  'Ольга',
  'Сергей',
  'Анна',
  'Владимир',
  'Татьяна'
];

// Функция для создания рандомного числа

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция создающая уникальное число в указанном диапазоне

function createNumberGenerator(min, max) {
  min = 0;
  let currentId = min;

  return function generateId() {
    if (currentId < max) {
      return ++currentId;
    } else {
      return null;
    }
  };
}

// Функция получающая рандомный элемент из массива

function getRandomElement(array) {
  const randomElement = getRandomInteger(0, array.length - 1);
  return array[randomElement];
}

// Функция генерирующая рандомные числа без диапазона

const usedIds = new Set(); // Хранит рандомные id

function generateUniqueRandomId() {
  let idComment;
  do {
    idComment = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  } while (usedIds.has(idComment));

  usedIds.add(idComment);
  return idComment;
}

//Функция создающая сообщение коментария

function getRandomOneOrTwo(array) {
  const count = getRandomInteger(1,2);
  const result = [];
  const usedIndices = new Set();
  while (result.length < count && result.length < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      result.push(array[randomIndex]);
    }
  }

  return result.join(' ');
}

//Функция содающая массив коментариев

const id = createNumberGenerator(minGeneralNumber, maxGeneralNumber);
const idPhoto = createNumberGenerator(minGeneralNumber, maxGeneralNumber);

function generateCommentsArray() {
  const commentsCount = getRandomInteger(minCommentNumber, maxCommentNumber);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    const idComment = generateUniqueRandomId();
    const messageComment = getRandomOneOrTwo(messages);
    const nameComment = getRandomElement(names);
    const avatarPhoto = getRandomInteger(minavatarPhoto, maxavatarPhoto);
    comments.push({
      id: idComment,
      avatar: `img/avatar-${avatarPhoto}.svg`,
      message: messageComment,
      name: nameComment
    });
  }

  return comments;
}

//Функция создающая пост

function createPost() {
  const description = getRandomElement(descriptions);
  const like = getRandomInteger(minLikesNumber, maxLikesNumber);

  return {
    id: id(),
    url: `photos/${idPhoto()}.jpg`,
    description: description,
    likes: like,
    comments: generateCommentsArray()
  };
}

//Функция генерирующая массив объектов

function generatePostsArray(count) {
  const posts = [];
  for (let i = 0; i < count; i++) {
    posts.push(createPost());
  }
  return posts;
}

// generatePostsArray(25);

