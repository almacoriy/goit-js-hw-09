import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

// const fp = flatpickr('#datetime-picker', {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const currentDate = new Date();
//     const timeDiff = selectedDates[0] - currentDate;

//     if (timeDiff <= 0) {
//       alert('Please choose a date in the future');
//     }
//     refs.startBtn.removeAttribute('disabled');
//     // onStartTimer();
//   },
// });

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onGetCurrentDate(selectedDates);
    console.log(selectedDates);
  },
};

const fp = flatpickr('#datetime-picker', { ...options });
let timeDiff = null;

// console.log(fp.config.defaultDate);

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  field: document.querySelectorAll('.field'),
  dataDays: document.querySelector('value[data-days]'),
  dataHours: document.querySelector('value[data-hours]'),
  dataMin: document.querySelector('value[data-minutes]'),
  dataSec: document.querySelector('value[data-seconds]'),
};

// console.log(fp.selectedDates[0]);

//  Немного стилей
refs.input.style.width = '220px';
refs.input.style.height = '40px';
refs.input.style.fontSize = '22px';
refs.startBtn.style.width = '80px';
refs.startBtn.style.height = '40px';
refs.startBtn.style.fontSize = '22px';
refs.timer.style.display = 'flex';
refs.field.forEach(elem => {
  elem.style.display = 'flex';
  elem.style.flexDirection = 'column';
  elem.style.alignItems = 'center';
  elem.style.padding = '10px';
  elem.style.fontSize = '20px';
});

refs.startBtn.setAttribute('disabled', true);

//  Проверяем разницу выбранной и текукщей даты

function onGetCurrentDate(date) {
  const currentDate = new Date();
  timeDiff = date[0] - currentDate;

  // console.log(currentDate);
  // console.log(selectedDates[0]);
}

//?  Доделать  ===================================================

function onStartTimer() {
  refs.startBtn.addEventListener('click', onClickBtn);
}

function addLeadingZero(value) {}

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
