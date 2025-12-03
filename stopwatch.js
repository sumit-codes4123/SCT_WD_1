let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 0;

const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Displaying in centiseconds

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds).padStart(2, '0')
    };
}

function updateDisplay() {
    const formatted = formatTime(elapsedTime);
    displayHours.textContent = formatted.hours;
    displayMinutes.textContent = formatted.minutes;
    displaySeconds.textContent = formatted.seconds;
    displayMilliseconds.textContent = formatted.milliseconds;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10); // Update every 10 milliseconds for centisecond precision
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true; // Disable lap when paused
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCounter = 0;
    updateDisplay();
    lapList.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    lapCounter++;
    const formatted = formatTime(elapsedTime);
    const lapTime = `${formatted.hours}:${formatted.minutes}:${formatted.seconds}.${formatted.milliseconds}`;
    const listItem = document.createElement('li');
    listItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(listItem);
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Initial state
pauseBtn.disabled = true;
lapBtn.disabled = true;