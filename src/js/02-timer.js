
// Описаний в документації
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const inputDate = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

flatpickr(inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = Date.now();

    console.log(selectedDates[0].getTime());
    console.log(currentDate);
    if (selectedDates[0].getTime() < currentDate) {
      Notiflix.Notify.failure('Оберіть майбутню дату від поточної');
      startBtn.disabled = true;

      return;
    }
    startBtn.disabled = false;
  },
}); 

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', startTimer);

function startTimer() {
  const selectedDate = inputDate._flatpickr.selectedDates[0].getTime();
  // const currentDate = Date.now();

  // if (selectedDate <= currentDate) {
  //   Notiflix.Notify.failure('Оберіть майбутню дату від поточної');
  //   return;
  // }

  startBtn.disabled = true;

  const coutdownInternal = setInterval(() => {
    const msRemaining = selectedDate - Date.now();

    if (msRemaining <= 0) {
      clearInterval(coutdownInternal);
      updateTimer(0);
      startBtn.disabled = false;
    } else {
      updateTimer(msRemaining);
    }
  }, 500); 
}

function updateTimer(ms) {
  const {
    days: daysValue,
    hours: hoursValue,
    minutes: minutesValue,
    seconds: secondsValue,
  } = convertMs(ms);

  days.textContent = addLeadingZero(daysValue);
  hours.textContent = addLeadingZero(hoursValue);
  minutes.textContent = addLeadingZero(minutesValue);
  seconds.textContent = addLeadingZero(secondsValue);
}

// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//         onClose(selectedDates) {
//         if((selectedDates[0]).getTime() < Date.now()){
//             Notiflix.Report.warning("Please choose a date in the future");
//             makeDisableButton();
//              return;
//         }
//         makeAbleButton();
//         Notiflix.Notify.success("Well done");
//     },
// };

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}