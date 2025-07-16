const effectLevel = document.querySelector('.effect-level');
const sliderLevel = document.querySelector('.effect-level__slider');
const valueLevel = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects');

const EFFECTS = {
  none: {
    filter: () => '',
    range: [0, 100],
    start: 100,
    step: 1,
    unit: '',
    slider: false
  },
  chrome: {
    filter: (value) => `grayscale(${value})`,
    range: [0, 1],
    start: 1,
    step: 0.1,
    unit: '',
    slider: true
  },
  sepia: {
    filter: (value) => `sepia(${value})`,
    range: [0, 1],
    start: 1,
    step: 0.1,
    unit: '',
    slider: true
  },
  marvin: {
    filter: (value) => `invert(${value}%)`,
    range: [0, 100],
    start: 100,
    step: 1,
    unit: '%',
    slider: true
  },
  phobos: {
    filter: (value) => `blur(${value}px)`,
    range: [0, 3],
    start: 3,
    step: 0.1,
    unit: 'px',
    slider: true
  },
  heat: {
    filter: (value) => `brightness(${value})`,
    range: [1, 3],
    start: 3,
    step: 0.1,
    unit: '',
    slider: true
  }
};

let currentEffect = EFFECTS.none;

function resetEffect() {

  effectLevel.style.display = 'none';
  imgPreview.style.filter = '';
  valueLevel.value = '';
}

// Функция для скрытия слайдера при открытии
function initEffect() {
  currentEffect = EFFECTS.none;
  resetEffect();

  sliderLevel.noUiSlider.updateOptions({
    range: {
      min: currentEffect.range[0],
      max: currentEffect.range[1]
    },
    start: currentEffect.start,
    step: currentEffect.step
  });
}
// Создание слайдера
noUiSlider.create(sliderLevel, {
  range: {
    min: EFFECTS.none.range[0],
    max: EFFECTS.none.range[1]
  },
  start: EFFECTS.none.start,
  step: EFFECTS.none.step,
  connect: 'lower',
});

// Обработчик изменения значения слайдера
sliderLevel.noUiSlider.on('update', (values) => {
  const value = values[0];
  valueLevel.value = value;
  imgPreview.style.filter = currentEffect.filter(value);
});

// Обработчик выбора эффекта
effectsList.addEventListener('change', (evt) => {
  const effectKey = evt.target.value;
  currentEffect = EFFECTS[effectKey];

  if (currentEffect.slider) {
    effectLevel.style.display = '';
    sliderLevel.noUiSlider.updateOptions({
      range: {
        min: currentEffect.range[0],
        max: currentEffect.range[1]
      },
      start: currentEffect.start,
      step: currentEffect.step
    });

  } else {
    resetEffect();

    imgPreview.style.filter = currentEffect.filter(currentEffect.start);
    valueLevel.value = currentEffect.start;
  }
});

initEffect();
