const timeDisplay = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById("reset");
const durationSelect = document.getElementById("duration-select");
const beepSound =document.getElementById("beep");

let isRunning = false;
let runrun = true;
let timerDuration = 25*60;
let remainingTime = timerDuration;
let intervalId;


document.addEventListener("DOMContentLoaded", function () {
    const customAlert = document.getElementById("customAlert");
    const closeAlertBtn = document.getElementById("closeAlertBtn");
  
    setTimeout(function () {
      customAlert.style.display = "block";
    }, 2000); // Display the alert after 2 seconds
  
    closeAlertBtn.addEventListener("click", function () {
      customAlert.style.display = "none";
    });
  });
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get a random number between 1 and 456
const randomNumber = getRandomNumber(1, 456);

// Update the player number in the HTML
const playerNumberElement = document.getElementById("player-number");
playerNumberElement.textContent = randomNumber;


function updateDisplay(){
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2,'0');
    const seconds = (remainingTime % 60).toString().padStart(2,0);
    timeDisplay.textContent = `${minutes}:${seconds}`;
}

function toggleTimer(){
    if(isRunning){
        clearInterval(intervalId);
        isRunning = false;
        startStopButton.textContent = 'Play';
    } else{
        intervalId = setInterval(updateTimer, 1000);
        isRunning = true;
        startStopButton.textContent = 'Pause';

    } 
}

function updateTimer(){
    if(remainingTime>0){
        remainingTime--;
        updateDisplay();
    } else{
        clearInterval(intervalId);
        isRunning = false;
        playSound();
        resetTimer();
    }
}

function resetTimer(){
    clearInterval(intervalId);
    isRunning = false;
    startStopButton.textContent = 'Start';
    timerDuration = parseInt(durationSelect.value)*60;
    remainingTime = timerDuration;
    updateDisplay();    
}

function playSound(){
    beepSound.play();
}

durationSelect.addEventListener('change', resetTimer);
startStopButton.addEventListener('click',toggleTimer);
resetButton.addEventListener('click',resetTimer);
updateDisplay();

