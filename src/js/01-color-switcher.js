const refs = {
  body: document.querySelector('body'),
  button: document.querySelector('button'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.stopBtn.removeAttribute('disabled');
    refs.startBtn.setAttribute('disabled', true);
  }, 1000);
}

function onStop() {
  clearInterval(intervalId);

  refs.stopBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
