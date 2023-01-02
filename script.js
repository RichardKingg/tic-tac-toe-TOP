//Module for mapping cell values in gameArray
let gameLogic = (function () {
  let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 4, 2],
  ];
  return {
    winCombinations,
  };
})();

//Factory function for creating a player
function createPlayer() {
  let player1 = document.querySelector(".player1").textContent;
  let player2 = document.querySelector(".player2").textContent;

  if (player1.textContent === "" && player2.textContent === "") {
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
let gameBoard = (function (turn, logic, score) {
  let cells = document.querySelectorAll(".cell");
  let container = document.querySelector(".gameBoard");

  let indexArray = [];

  let valueIndex = cells.forEach((cell) => {
    indexArray.push(parseInt(cell.getAttribute("data-index")));
  });

  let placeMark = cells.forEach(function (cell) {
    cell.addEventListener("mousedown", cellClick);
  });

  function resetBoard() {
    cells.forEach(function (cell) {
      cell.textContent = "";
    });
    turn.player1Turn = true;
    turn.player2Turn = false;
    return;
  }

  function winRound() {}

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

  return {
    valueIndex,
    indexArray,
  };
})(playerTurns, gameLogic, scoreBoard);
