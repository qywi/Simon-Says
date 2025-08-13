import {
  difficult,
  raund,
  hiddenWords,
  simulateTyping,
  activeNewGame,
} from "./script.js";

const h1 = document.createElement("h1");
h1.className = "h1";
h1.textContent = "DIFFICULTY LEVEL";
document.body.appendChild(h1);

const difficultDiv = document.createElement("div");
difficultDiv.className = "difficult";

const levels = [
  {
    className: "easy bacgroung-img selected",
    text: "EASY",
    textClass: "easy-p",
  },
  { className: "normal bacgroung-img", text: "NORMAL", textClass: "normal-p" },
  { className: "hard bacgroung-img", text: "HARD", textClass: "hard-p" },
];

levels.forEach((level) => {
  const levelDiv = document.createElement("div");
  levelDiv.className = level.className;

  const levelText = document.createElement("p");
  levelText.className = `${level.textClass} difficult-text`;
  levelText.textContent = level.text;

  levelDiv.appendChild(levelText);
  difficultDiv.appendChild(levelDiv);
});

document.body.appendChild(difficultDiv);

const resultInput = document.createElement("input");
resultInput.className = "result-input";
resultInput.readOnly = true;
document.body.appendChild(resultInput);

const buttonDiv = document.createElement("div");
buttonDiv.className = "button-div";
document.body.appendChild(buttonDiv);

const startDiv = document.createElement("div");
startDiv.className = "start button";
startDiv.textContent = "START";
document.body.appendChild(startDiv);

const buttonNewGame = document.createElement("p");
buttonNewGame.className = "button-new-game button";
buttonNewGame.textContent = "New game";
buttonDiv.appendChild(buttonNewGame);

const buttonRepeat = document.createElement("p");
buttonRepeat.className = "button-repeat button";
buttonRepeat.textContent = "Repeat the sequence";
buttonRepeat.disabled = true;
buttonDiv.appendChild(buttonRepeat);

const buttonNext = document.createElement("p");
buttonNext.className = "button-Next button";
buttonNext.textContent = "Next";
buttonNext.disabled = true;
buttonDiv.appendChild(buttonNext);

const diffinityIndicate = document.createElement("p");
diffinityIndicate.className = "diffinity-indicate";
document.body.appendChild(diffinityIndicate);

const namberRaund = document.createElement("p");
namberRaund.className = "number-raund";
document.body.appendChild(namberRaund);

startDiv.addEventListener("click", () => {
  h1.style.display = "none";
  difficultDiv.style.display = "none";
  startDiv.style.display = "none";

  namberRaund.textContent = `${raund} / 5`;
  diffinityIndicate.textContent = `Difficulty: ${difficult}`;

  resultInput.style.display = "block";
  buttonNewGame.style.display = "block";
  buttonRepeat.style.display = "block";
  namberRaund.style.display = "block";
  diffinityIndicate.style.display = "block";

  if (difficult === "EASY") {
    simulateTyping(hiddenWords[raund - 1], numberKeyboard);
  } else if (difficult === "NORMAL") {
    simulateTyping(
      hiddenWords[raund - 1],
      document.querySelectorAll(".key-board-qwerty > .key-board")
    );
  } else if (difficult === "HARD") {
    simulateTyping(
      hiddenWords[raund - 1],
      document.querySelectorAll(".key-board")
    );
  }

  console.dir(hiddenWords);
});

buttonNewGame.addEventListener("click", () => {
  if (!activeNewGame) {
    h1.style.display = "block";
    difficultDiv.style.display = "flex";
    startDiv.style.display = "flex";

    resultInput.style.display = "none";
    buttonNewGame.style.display = "none";
    buttonRepeat.style.display = "none";
    namberRaund.style.display = "none";
    diffinityIndicate.style.display = "none";
    buttonNext.style.display = "none";
  }
});

const numberKeyboard = document.createElement("div");
numberKeyboard.className = "key-board-number key-board";

for (let i = 0; i <= 9; i++) {
  const key = document.createElement("div");
  key.className = "key";
  key.textContent = i;
  numberKeyboard.appendChild(key);
}

document.body.appendChild(numberKeyboard);

const qwertyKeyboard = document.createElement("div");
qwertyKeyboard.className = "key-board-qwerty";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

rows.forEach((row, index) => {
  const rowDiv = document.createElement("div");
  rowDiv.className = `key-board-qwerty-${index + 1} key-board`;

  row.forEach((keyChar) => {
    const key = document.createElement("div");
    key.className = "key";
    key.textContent = keyChar;
    rowDiv.appendChild(key);
  });

  qwertyKeyboard.appendChild(rowDiv);
});

document.body.appendChild(qwertyKeyboard);

export {
  rows,
  resultInput,
  buttonRepeat,
  namberRaund,
  buttonNext,
  buttonNewGame,
};
