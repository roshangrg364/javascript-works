const dice = document.querySelector(".dice");
const player1Elm = document.querySelector(".player--0");
const player2Elm = document.querySelector(".player--1");
const player1CurrentScore = document.querySelector("#current--0");
const player2CurrentScore = document.querySelector("#current--1");
const player2TotalScore = document.querySelector("#score--1");
const player1TotalScore = document.querySelector("#score--0");
const main = document.querySelector("main");
const winnerMsg = document.querySelector(".winner-msg");
const overlay = document.querySelector(".overlay-div");
let CurrentScore;
let activePlayer;
let isplaying;
const initialaization = () => {
  CurrentScore = 0;
  isplaying = true;
  activePlayer = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
  dice.classList.add("hidden");
  document.getElementById(`score--${activePlayer}`);
  winnerMsg.classList.remove("winner");
  winnerMsg.classList.add("hidden");
  overlay.classList.remove("overlay");
  overlay.classList.add("hidden");
  player1Elm.classList.add("player--active");
  player2Elm.classList.remove("player--active");
};

initialaization();
document.querySelector(".btn--roll").addEventListener("click", function () {
  if (isplaying) {
    let diceNumber = Math.trunc(Math.random() * 5) + 1;
    dice.classList.remove("hidden");
    showDice(diceNumber);
    if (diceNumber == 1) {
      CurrentScore = 0;
      SetCurrentScore(CurrentScore, activePlayer);
      SetTotalScore(0, activePlayer);
      switchPlayer();
      togglePlayer();
    } else {
      CurrentScore += diceNumber;
      SetCurrentScore(CurrentScore, activePlayer);
    }
  }
});

document.querySelector(".btn--hold").addEventListener("click", function () {
  let currentPlayerTotalScoreElm = document.getElementById(
    `score--${activePlayer}`
  );
  let currentPlayerTotalScore =
    Number(currentPlayerTotalScoreElm.textContent) + CurrentScore;
  SetTotalScore(currentPlayerTotalScore, activePlayer);
  if (currentPlayerTotalScore >= 50) {
    CurrentScore = 0;
    toggleDice();
    SetCurrentScore(CurrentScore, activePlayer);
    setupWinner();
    isplaying = false;

    return false;
  }
  CurrentScore = 0;
  SetCurrentScore(CurrentScore, activePlayer);
  switchPlayer();
  togglePlayer();
});

document.querySelector(".btn--new").addEventListener("click", initialaization);
function setupWinner() {
  let player = document.getElementById(`name--${activePlayer}`);
  let playerName = player.textContent;

  main.style.background = "rgba(72, 241, 57, 0.35)";
  winnerMsg.innerHTML = `${playerName} Won. Congratulation 🏆🍹🍹🍹🏆`;
  winnerMsg.classList.add("winner");
  winnerMsg.classList.remove("hidden");
  overlay.classList.add("overlay");
  overlay.classList.remove("hidden");
}

function showDice(number) {
  dice.src = `dice-${number}.png`;
}
function SetCurrentScore(score, activePlayer) {
  document.getElementById("current--" + activePlayer).textContent = score;
}

function SetTotalScore(score, activePlayer) {
  document.getElementById("score--" + activePlayer).textContent = score;
}
function switchPlayer() {
  activePlayer = activePlayer == 0 ? 1 : 0;
}
function toggleDice() {
  dice.classList.toggle("hidden");
}
const togglePlayer = () => {
  player1Elm.classList.toggle("player--active");
  player2Elm.classList.toggle("player--active");
};
