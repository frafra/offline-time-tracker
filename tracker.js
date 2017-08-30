let display = document.getElementById('display');

let start;
let interval;
let counter;

function millisecondsToHHMMSS(counter) {
  let seconds = Math.floor(counter/1000);
  let time = [
    Math.floor(seconds/60/60),
    Math.floor(seconds/60%60),
    Math.floor(seconds%60)
  ];
  time.forEach((element, index, array) => {
    if (element<10) array[index] = '0'+element;
  });
  return time.join(':');
}

function updateTimer() {
  counter = +(new Date())-start;
  let timestamp = millisecondsToHHMMSS(counter);
  display.innerText = timestamp;
}

function startCounting() {
  if (interval) return;
  start = +(new Date())-counter;
  interval = setInterval(updateTimer, 1000);
}

function stopCounting() {
  clearInterval(interval);
  interval = false;
}

window.addEventListener('load', _ => {
  if (!navigator.onLine) startCounting();
  window.addEventListener('online', stopCounting);
  window.addEventListener('offline', startCounting);
});

