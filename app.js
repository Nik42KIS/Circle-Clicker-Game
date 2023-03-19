const startBtn = document.querySelector("#start");
const colors = [
  "red",
  "blue",
  "yellow",
  "green",
  "purple",
  "pink",
  "orange",
  "white",
];
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");

let time = 0;
let score = 0;

const board = document.querySelector("#board");
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  createRandomCircle();
  setInterval(decreaseTime, 1000);
  setTime(time);
}
function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class ="primary">${score}</span></h1>`;
}
function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  setColor(circle);
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, height - size);
  const y = getRandomNumber(0, width - size);

  circle.classList.add("circle");
  circle.style.width = `${size}`;
  circle.style.height = `${size}`;
  circle.style.top = `${y}`;
  circle.style.left = `${x}`;

  //  let randomColorOfCircle = circle.classList.add(setColor(circle))

  board.append(circle);
}
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function setColor(element) {
  const color = getRandomColor();
  element.style.backgroundColor = color;
}
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
