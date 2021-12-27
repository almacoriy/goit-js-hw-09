import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

require('flatpickr/dist/themes/dark.css');

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMin: document.querySelector('span[data-minutes]'),
  dataSec: document.querySelector('span[data-seconds]'),
  field: document.querySelectorAll('.field'),
  input: document.querySelector('#datetime-picker'),
  timer: document.querySelector('.timer'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartTimer);

//     Конфиг flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose() {
    onGetCurrentDate();
  },
};

const fp = flatpickr('#datetime-picker', { ...options });

//     Проверяем выбранную дату
function onGetCurrentDate() {
  if (fp.selectedDates[0] < fp.config.defaultDate.getTime()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  refs.startBtn.removeAttribute('disabled');
}

//     Запускаем/останавливаем таймер
function onStartTimer() {
  refs.startBtn.setAttribute('disabled', true);

  const intervalId = setInterval(() => {
    let timeDiff = fp.selectedDates[0] - new Date();
    let time = convertMs(timeDiff);

    refs.dataDays.textContent = addLeadingZero(time.days);
    refs.dataHours.textContent = addLeadingZero(time.hours);
    refs.dataMin.textContent = addLeadingZero(time.minutes);
    refs.dataSec.textContent = addLeadingZero(time.seconds);

    if (timeDiff <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

//     Форматируем выводимые данные
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//     Конвертация времени
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//=======Немного стилей=======
refs.input.style.cssText = 'width: 220px !important; height: 40px; font-size: 22px;';
refs.startBtn.style.cssText = 'width: 80px !important; height: 40px; font-size: 22px;';
refs.timer.style.display = 'flex';
refs.field.forEach(elem => {
  elem.style.cssText =
    'display: flex  !important; flex-direction: column; align-item: center; padding: 10px; font-size: 20px';
});
