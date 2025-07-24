// Функция работы с body
export function setModalOpen(isOpen) {
  document.body.classList.toggle('modal-open', isOpen);
}

// Открытие модал
export function openModal(modalElement) {
  modalElement.classList.remove('hidden');
  setModalOpen(true);
}

// Закрытие модал
export function closeModal(modalElement) {
  modalElement.classList.add('hidden');
  setModalOpen(false);
}


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
export function getRandomElement(arrays) {
  const randomIndex = getRandomInteger(0, arrays.length - 1);
  return arrays[randomIndex];
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
export function getRandomOneOrTwo(arrays) {
  const count = getRandomInteger(1, 2);
  const results = [];
  const usedIndices = new Set();
  while (results.length < count && results.length < arrays.length) {
    const randomIndex = Math.floor(Math.random() * arrays.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      results.push(arrays[randomIndex]);
    }
  }
  return results.join(' ');
}

// Закрытие по ESC
export const setEscClose = (modalElement, closeCallback, inputSelectors = []) => {
  function onEsc(evt) {
    const active = document.activeElement;

    // Если фокус в одном из полей ввода — не закрываем
    if (
      evt.key === 'Escape' &&
      !modalElement.classList.contains('hidden') &&
      !inputSelectors.some((sel) => active && active.matches(sel))
    ) {
      evt.preventDefault();
      closeCallback();
    }
  }
  document.addEventListener('keydown', onEsc);
  return () => document.removeEventListener('keydown', onEsc);
};

// Закрытие оверлейн
export const setOverlayClose = (modalElement, closeCallback) => {
  function onOverlayClick(evt) {
    if (evt.target === modalElement) {
      closeCallback();
    }
  }
  modalElement.addEventListener('click', onOverlayClick);

  // Возвращаем функцию для удаления обработчика, если потребуется
  return () => modalElement.removeEventListener('click', onOverlayClick);
};

// Ошибка запроса
export const showDataErrorMessage = () => {
  const template = document.querySelector('#data-error');
  if (template) {
    const errorElement = template.content.cloneNode(true);
    document.body.appendChild(errorElement);

    setTimeout(() => {
      const errorMessage = document.querySelector('.data-error');
      if (errorMessage) {
        errorMessage.remove();
      }
    }, 5000);
  }
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const showSuccessMessage = () => {
  const template = document.querySelector('#success');
  if (template) {
    const successElement = template.content.cloneNode(true);
    document.body.insertBefore(successElement, null);

    const button = document.querySelector('.success__button');
    const section = document.querySelector('.success');

    const removeSuccess = () => {
      if (section) {
        section.remove();
      }
    };
    setEscClose(section, removeSuccess);
    setOverlayClose(section, removeSuccess);

    button.addEventListener('click', removeSuccess);
  }
};

export const showErrorMessage = () => {
  const template = document.querySelector('#error');
  if (template) {
    const errorElement = template.content.cloneNode(true);
    document.body.insertBefore(errorElement, null);

    const button = document.querySelector('.error__button');
    const section = document.querySelector('.error');

    const removeError = () => {
      if (section) {
        section.remove();
      }
    };
    setEscClose(section, removeError);
    setOverlayClose(section, removeError);

    button.addEventListener('click', removeError);
  }
};
