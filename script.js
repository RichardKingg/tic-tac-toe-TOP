//Module for creating the cells in the game board
let gameBoard = (function () {
  let container = document.querySelector(".gameBoard");
  let gameArray = [];
  const rows = 3;
  const cols = 3;
  for (let i = 0; i < rows; i++) {
    gameArray[i] = [];
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("boardCell");
      gameArray[i][j] = cell;
      container.appendChild(gameArray[i][j]);
    }
  }
  return {
    container,
    gameArray,
  };
})();

//Factory function for creating a player
function createPlayer() {
  let player1 = document.querySelector(".player1").textContent;
  let player2 = document.querySelector(".player2").textContent;

  if (player1.textContent === "" || player2.textContent === "") {
    return alert("Please fill out the names of the players");
  }
  return {
    player1,
    player2,
  };
}

//Module for score keeping
let scoreBoard = (function () {
  let playerScore1 = document.querySelector(".player1Score").textContent;
  let playerScore2 = document.querySelector(".player2Score").textContent;

  let player1Counter = function () {
    if (playerScore1 === 3) {
      return (playerScore1 = 0);
    }
    return playerScore1++;
  };
  let player2Counter = function () {
    if (playerScore2 === 3) {
      return (playerScore2 = 0);
    }
    return playerScore2++;
  };

  return {
    player1Counter,
    player2Counter,
  };
})();
