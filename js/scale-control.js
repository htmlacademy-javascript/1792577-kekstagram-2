const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

export const setScale = (value) => {
  scaleValue.value = `${value}%`;
  if (imgPreview) {
    imgPreview.style.transform = `scale(${value / 100})`;
  }
};

const onScaleSmallerClick = () => {
  const current = parseInt(scaleValue.value, 10);
  if (current > SCALE_MIN) {
    setScale(current - SCALE_STEP);
  }
};

const onScaleBiggerClick = () => {
  const current = parseInt(scaleValue.value, 10);
  if (current < SCALE_MAX) {
    setScale(current + SCALE_STEP);
  }
};

scaleSmaller.addEventListener('click', onScaleSmallerClick);
scaleBigger.addEventListener('click', onScaleBiggerClick);

setScale(SCALE_DEFAULT);
