// const bodyStart = document.querySelector('body');
const startBtn = document.querySelector(`button[data-start]`);
const stopBtn = document.querySelector(`button[data-stop]`);
let timerId = null;
// const color = document.body.style.backgroundColor;

startBtn.addEventListener('click', startColor);
stopBtn.addEventListener('click', stopColor);

function startColor() {
  startBtn.disabled = true;
  // stopBtn.disabled = false;

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColor() {
  // startBtn.disabled = true;
  startBtn.disabled = false;

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}



