let startTime, interval;
let running = false;

let display = document.getElementById("display");
let startPauseBtn = document.getElementById("startPause");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let laps = document.getElementById("laps");

let elapsedTime = 0;

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    let seconds = String(totalSeconds % 60).padStart(2, "0");
    let milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");

    return `${minutes} : ${seconds} . ${milliseconds}`;
}

startPauseBtn.addEventListener("click", () => {
    if (!running) {
        running = true;
        startPauseBtn.textContent = "Pause";
        startPauseBtn.style.background = "#ffc107";
        lapBtn.disabled = false;

        startTime = Date.now() - elapsedTime;

        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
    } else {
        running = false;
        startPauseBtn.textContent = "Resume";
        startPauseBtn.style.background = "#17a2b8";
        clearInterval(interval);
    }
});

resetBtn.addEventListener("click", () => {
    running = false;
    clearInterval(interval);

    elapsedTime = 0;
    display.textContent = "00 : 00 : 00 . 00";
    startPauseBtn.textContent = "Start";
    startPauseBtn.style.background = "#28a745";
    lapBtn.disabled = true;
    laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
    let li = document.createElement("li");
    li.textContent = `Lap: ${formatTime(elapsedTime)}`;
    laps.appendChild(li);
});
