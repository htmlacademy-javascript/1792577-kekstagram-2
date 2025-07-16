import { renderPictures } from './picture.js';
import { showDataErrorMessage } from './utils.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

//Загрузка данных с сервера
export function getData() {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => response.json())
    .then((pictures) => {
      renderPictures(pictures);
    })
    .catch(() => {
      showDataErrorMessage();
    });
}

//Отправка данных на сервер
export function sendData(formData, onSuccess) {
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
        showDataErrorMessage();
      }
    })
    .catch(() => {
      showDataErrorMessage();
    });
}
