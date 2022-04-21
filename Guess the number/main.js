let randomNumber = Math.trunc(Math.random() * 20) + 1;

document.querySelector(".check").addEventListener("click", function () {
  let guessedNumber = Number(document.querySelector(".guess").value);
  let score = Number(document.querySelector(".score").textContent);
  if (!guessedNumber) {
    displaymessage("❌ Not a number");
  }
  if (score > 0) {
    if (guessedNumber == randomNumber) {
      displaymessage("Congratulations ! you are correct ✅");
      document.querySelector(".number").textContent = randomNumber;
      setBackground("green");
      setHighScore();
    } else if (guessedNumber > randomNumber) {
      displaymessage("Too High ⬆⬆👍");
      decreaseScore();
    } else if (guessedNumber < randomNumber) {
      displaymessage("Too Low 👇👇👇👇");
      decreaseScore();
    }
  } else {
    displaymessage("Sorry you lost the game. Click on again to restart 🌟");
    setBackground("red");
  }
});

document.querySelector(".again").addEventListener("click", function () {
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".score").textContent = 20;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
  setBackground("black");
});

function displaymessage(message) {
  document.querySelector(".message").textContent = message;
}
function decreaseScore() {
  let score = document.querySelector(".score");
  let newScore = Number(score.textContent) - 1;
  console.log(newScore);
  score.textContent = newScore;
}
function setHighScore() {
  let score = document.querySelector(".score");
  let highscore = document.querySelector(".highscore");
  if (Number(score.textContent) > Number(highscore.textContent))
    highscore.textContent = score.textContent;
}
function setBackground(color) {
  document.querySelector("body").style.background = color;
}
