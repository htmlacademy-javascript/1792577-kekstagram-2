import { renderPictures } from './picture.js';
import { showDataErrorMessage } from './utils.js';
import { showFilter, setPhotosForFilter } from './filter.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};


//Загрузка данных с сервера
export const getData = () => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => response.json())
    .then((pictures) => {
      renderPictures(pictures);
      setPhotosForFilter(pictures);
      showFilter();
    })
    .catch(() => {
      showDataErrorMessage();
    });
};

//Отправка данных на сервер
export const sendData = (formData, onSuccess, onError) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        if (onError) {
          onError();
        }
      }
    })
    .catch(() => {
      if (onError) {
        onError();
      }
    });
};
