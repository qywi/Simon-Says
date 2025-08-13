import {
  rows,
  resultInput,
  buttonRepeat,
  namberRaund,
  buttonNext,
  buttonNewGame,
} from "./DOM-element.js";
let difficult = "EASY";
let raund = 1;
const numberKeyboard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let allKeyBoard = numberKeyboard;
const rowsKeyboard = rows.flat();
let hiddenWords = [];
const btns = document.querySelectorAll(".key");
let activeKeyboard = false;
let textInputCheck = 0;
let usedRepeat = false;
let gameOver = false;
let invalidCharakter = false;
let activeNewGame = false;
let startGame = false; 

for (let btn of btns) {
  btn.addEventListener("click", function () {
    if (activeKeyboard) {
      playSound("tup");
      resultInput.value += btn.textContent;
      textInputCheck++;
      inputCheck(btn.textContent, hiddenWords[raund - 1], textInputCheck);
      btn.classList.add("highlight");
      setTimeout(() => btn.classList.remove("highlight"), 300);
    }
  });
}

let isKeyPressed = false;

document.addEventListener("keydown", (event) => {
  if (!activeKeyboard || isKeyPressed) return;

  isKeyPressed = true;

  const pressedKeyCode = event.code;
  const virtualKey = Array.from(document.querySelectorAll(".key")).find(
    (key) => {
      const keyChar = key.textContent.trim().toLowerCase();
      return (
        keyChar === pressedKeyCode.replace("Key", "").toLowerCase() ||
        keyChar === pressedKeyCode.replace("Digit", "")
      );
    }
  );

  const isKeyAllowed =
    (difficult === "EASY" &&
      numberKeyboard.some(
        (num) => num.toString() === virtualKey?.textContent
      )) ||
    (difficult === "NORMAL" &&
      rowsKeyboard.includes(virtualKey?.textContent)) ||
    (difficult === "HARD" &&
      (numberKeyboard.some(
        (num) => num.toString() === virtualKey?.textContent
      ) ||
        rowsKeyboard.includes(virtualKey?.textContent)));

  if (!isKeyAllowed || !virtualKey) {
    isKeyPressed = false;
    return;
  }

  playSound("tup");
  virtualKey.classList.add("highlight");
  resultInput.value += virtualKey.textContent;
  textInputCheck++;
  inputCheck(virtualKey.textContent, hiddenWords[raund - 1], textInputCheck);

  setTimeout(() => {
    virtualKey.classList.remove("highlight");
    isKeyPressed = false;
  }, 300);
});

function playSound(type) {
  const sounds = {
    success: "./sound/success-sound.mp3",
    error: "./sound/error-sound.mp3",
    tup: "./sound/tup.mp3",
    great: "./sound/great.mp3",
  };
  const audio = new Audio(sounds[type]);
  audio.play();
}

function inputCheck(symbol, text, cout) {
  const feedbackElement = document.querySelector(".feedback");
  if (!feedbackElement) {
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    document.body.appendChild(feedback);
  }

  const feedback = document.querySelector(".feedback");

  if (resultInput.value === text) {
    if (raund > 4) {
      endGameFeedback();
      return;
    }
    feedback.style.display = "block";
    feedback.textContent = "Great! Good job!";
    feedback.style.color = "green";
    playSound("success");
    activeKeyboard = false;
    buttonRepeat.style.display = "none";
    buttonNext.style.display = "block";

    setTimeout(() => {
      feedback.style.display = "none";
    }, 2000);
  } else if (symbol === text[cout - 1]) {
    feedback.style.display = "none";
    return;
  } else {
    if (!invalidCharakter) {
      feedback.style.display = "block";
      feedback.textContent = "Invalid character! Try again.";
      feedback.style.color = "red";
      textInputCheck--;
      playSound("error");
      setTimeout(() => {
        feedback.style.display = "none";
      }, 1000);
      resultInput.value = resultInput.value.slice(0, -1);
      invalidCharakter = true;
    } else if (usedRepeat) {
      badEndGameFeedback();
    } else {
      repeat();
    }
  }
}

buttonNext.addEventListener("click", () => {
  if (raund > 5) return;

  raund++;
  textInputCheck = 0;
  namberRaund.textContent = `${raund} / 5`;
  invalidCharakter = false;

  if (raund > 5) {
    endGameFeedback();
    return;
  }

  usedRepeat = false;
  buttonRepeat.disabled = false;
  buttonRepeat.textContent = "Repeat the sequence";

  if (difficult === "EASY") {
    const numberKeys = document.querySelectorAll(".key-board-number");
    simulateTyping(hiddenWords[raund - 1], numberKeys);
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

  buttonRepeat.style.display = "block";
  buttonNext.style.display = "none";
  buttonRepeat.classList.remove("inactive");
});

buttonRepeat.addEventListener("click", () => {
  setTimeout(() => {
    repeat();
  }, 1000) 
});

function repeat() {
  if (usedRepeat) return;
  if (!startGame) return;

  usedRepeat = true;

  const feedback = document.querySelector(".feedback");
  if (feedback) feedback.style.display = "none";

  if (difficult === "EASY") {
    const numberKeys = document.querySelectorAll(".key-board-number");
    simulateTyping(hiddenWords[raund - 1], numberKeys);
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

  buttonRepeat.classList.add("inactive");
}
``;

function endGameFeedback() {
  activeKeyboard = false;
  gameOver = true;
  buttonRepeat.classList.add("inactive");
  const feedbackElement = document.querySelector(".feedback");
  if (!feedbackElement) {
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    document.body.appendChild(feedback);
  }

  const feedback = document.querySelector(".feedback");
  feedback.style.display = "block";
  feedback.textContent = `Game Over! You've completed all 5 rounds.`;
  feedback.style.color = "blue";
  playSound("great");

  setTimeout(() => {
    feedback.style.display = "none";
  }, 4000);
}

function badEndGameFeedback() {
  activeKeyboard = false;
  gameOver = true;
  buttonRepeat.classList.add("inactive");
  const feedbackElement = document.querySelector(".feedback");
  if (!feedbackElement) {
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    document.body.appendChild(feedback);
  }

  const feedback = document.querySelector(".feedback");
  feedback.style.display = "block";
  feedback.textContent = `Game Over! Try again!`;
  feedback.style.color = "red";
  playSound("error");

  setTimeout(() => {
    feedback.style.display = "none";
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".bacgroung-img");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      images.forEach((img) => img.classList.remove("selected"));

      image.classList.add("selected");
      difficult = image.querySelector(".difficult-text").textContent;

      const keyBoardNumber = document.querySelector(".key-board-number");
      const keyBoardQwerty = document.querySelector(".key-board-qwerty");

      if (difficult === "EASY") {
        keyBoardNumber.style.display = "flex";
        keyBoardQwerty.style.display = "none";
        allKeyBoard = [];
        allKeyBoard = numberKeyboard;
        hiddenWords = randomText(allKeyBoard);
      } else if (difficult === "NORMAL") {
        keyBoardNumber.style.display = "none";
        keyBoardQwerty.style.display = "flex";
        allKeyBoard = [];
        allKeyBoard = rowsKeyboard;
        hiddenWords = randomText(allKeyBoard);
      } else if (difficult === "HARD") {
        keyBoardNumber.style.display = "flex";
        keyBoardQwerty.style.display = "flex";
        allKeyBoard = [];
        allKeyBoard = numberKeyboard.concat(rowsKeyboard);
        hiddenWords = randomText(allKeyBoard);
      }
    });
  });
});

function randomText(array, length = 5) {
  return Array.from({ length }, (_, i) =>
    Array.from(
      { length: 2 * (i + 1) },
      () => array[Math.floor(Math.random() * array.length)]
    ).join("")
  );
}

function disableAllButtons(disable) {
  const buttons = document.querySelectorAll(".key, .button");
  buttons.forEach((button) => (button.disabled = disable));
}

export function simulateTyping(sequence, keyboard) {
  textInputCheck = 0;
  gameOver = false;
  activeNewGame = false;
  startGame = false;
  disableAllButtons(true);
  resultInput.value = "";
  resultInput.disabled = true;
  activeKeyboard = false;
  let keys = [];
  if (keyboard instanceof HTMLCollection || keyboard instanceof NodeList) {
    keys = Array.from(keyboard).flatMap((kb) => Array.from(kb.children));
  } else if (keyboard instanceof Element) {
    keys = Array.from(keyboard.children);
  } else {
    console.error("Invalid keyboard structure");
    return;
  }
  let index = 0;

  const interval = setInterval(() => {
    if (index < sequence.length) {
      const char = sequence[index];
      const key = keys.find(
        (k) => k.textContent.trim().toLowerCase() === char.toLowerCase()
      );

      if (key) {
        playSound("tup");
        key.classList.add("highlight");
        resultInput.value += char;
        setTimeout(() => key.classList.remove("highlight"), 300);
      } else {
        console.warn(`Key not found for character: "${char}"`);
      }
      index++;
    } else {
      clearInterval(interval);
      disableAllButtons(false);
      resultInput.disabled = false;
      activeNewGame = false;
      startGame = true;
      setTimeout(() => {
        resultInput.value = "";
        activeKeyboard = true;
      }, 1000);
    }
  }, 400);
}

buttonNewGame.addEventListener("click", () => {
  if (!activeNewGame) {
    raund = 1;
    activeKeyboard = false;
    textInputCheck = 0;
    usedRepeat = false;
    invalidCharakter = false;
    buttonRepeat.classList.remove("inactive");
    hiddenWords = randomText(allKeyBoard);
  }
});

hiddenWords = randomText(allKeyBoard);

export { difficult, raund, hiddenWords, activeNewGame };
