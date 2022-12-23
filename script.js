//Module for creating the cells in the game board
let gameBoard = (function () {
  let container = document.querySelector(".gameBoard");
  let gameArray = [];
  for (let i = 0; i < 3; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.classList.add("boardCell");
      row.appendChild(cell);
    }
    container.appendChild(row);
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

//Module for player turn default state
let playerTurns = (function () {
  let player1Turn = true;
  let player2Turn = false;
  return {
    player1Turn,
    player2Turn,
  };
})();

//Module for changing cell text content to X or O
let clickCheck = (function (board, turn) {
  let cells = board.gameArray;
  function cellClick(event) {
    let cell = event.target;
    if (turn.player1Turn === true && cell.textContent === "") {
      cell.textContent = "X";
      turn.player1Turn = false;
      turn.player2Turn = true;
      return;
    } else if (turn.player2Turn === true && cell.textContent === "") {
      cell.textContent = "O";
      turn.player1Turn = true;
      turn.player2Turn = false;
      return;
    } else if (cell.textContent === "X" || cell.textContent === "O") {
      return;
    }
  }

  cells.forEach(function (row) {
    row.forEach(function (cell) {
      cell.addEventListener("mousedown", cellClick);
    });
  });
})(gameBoard, playerTurns);
