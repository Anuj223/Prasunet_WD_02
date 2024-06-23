let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(updateTime, 10); // Start the interval to update time every 10 milliseconds
    }
}

function pauseStopwatch() {
    isRunning = false;
    clearInterval(interval); // Stop the interval
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(interval); 
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay(); // Reset the display to 00:00:00:00
    lapsList.innerHTML = ''; // Clear the lap list
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }
    updateDisplay();
}

function updateDisplay() {
    hoursDisplay.textContent = formatTime(hours) + ':';
    minutesDisplay.textContent = formatTime(minutes) + ':';
    secondsDisplay.textContent = formatTime(seconds) + ':';
    millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
}

function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}

function formatMilliseconds(unit) {
    return unit < 100 ? '0' + (unit < 10 ? '0' + unit : unit) : unit;
}

function recordLap() {
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}
