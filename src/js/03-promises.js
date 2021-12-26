import Notiflix from 'notiflix';

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

  for (let pos = 1; pos <= amount.value; pos += 1) {
    createPromise(pos, resultDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    resultDelay += Number(step.value);
  }
}
