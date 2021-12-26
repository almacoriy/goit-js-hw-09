// import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onOutResult);

//  Создание промиса
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//  Обработка результата воода
function onOutResult(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = form;
  let resultDelay = Number(delay.value);

  for (pos = 1; pos <= amount.value; pos += 1) {
    createPromise(pos, resultDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    resultDelay += Number(step.value);
  }
}
