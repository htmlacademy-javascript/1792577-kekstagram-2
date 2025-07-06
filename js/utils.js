// Функция для создания рандомного числа
export function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция создающая уникальное число в указанном диапазоне
export function createNumberGenerator(min, max) {
  let currentId = min - 1;

  return function generateId() {
    if (currentId < max) {
      return ++currentId;
    } else {
      return null;
    }
  };
}

// Функция получающая рандомный элемент из массива
export function getRandomElement(array) {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
}

// Функция генерирующая рандомные числа без диапазона
const usedIds = new Set();

export function generateUniqueRandomId() {
  let id;
  do {
    id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  } while (usedIds.has(id));

  usedIds.add(id);
  return id;
}

// Функция создающая сообщение из 1 или 2 случайных элементов массива
export function getRandomOneOrTwo(array) {
  const count = getRandomInteger(1, 2);
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

// Проверка нажатой клавиши

export function isEscapeKey(event) {
  return event.code === 'Escape';
}
