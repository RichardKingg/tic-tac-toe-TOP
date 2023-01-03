//Module for winning combinations
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

//Module for creating a player
let createPlayer = (function () {
  let player1 = document.querySelector(".player1").textContent;
  let player2 = document.querySelector(".player2").textContent;
  let player1Mark = "X";
  let player2Mark = "O";

  if (player1.textContent === "" && player2.textContent === "") {
    return alert("Please fill out the names of the players");
  }

  return {
    player1,
    player2,
    player1Mark,
    player2Mark,
  };
})();

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

//Module for changing cell text content to X or O and managing winning combinations
let gameBoard = (function (turn, logic, score, mark) {
  let cells = document.querySelectorAll(".cell");
  let container = document.querySelector(".gameBoard");
  let resetBtn = document.querySelector(".resetBtn");
  let playerXMark = mark.player1Mark;
  let playerOMark = mark.player2Mark;

  let currentTurn = undefined;

  let placeMark = cells.forEach(function (cell) {
    cell.addEventListener("mousedown", cellClick, { once: true });
  });

  let reset = resetBtn.addEventListener("click", resetBoard);

  function resetBoard() {
    turn.player1Turn = true;
    turn.player2Turn = false;
    cells.forEach((cell) => {
      cell.classList.remove(playerXMark);
      cell.classList.remove(playerOMark);
      cell.removeEventListener("mousedown", cellClick);
      cell.addEventListener("mousedown", cellClick, { once: true });
      cell.textContent = "";
    });
    return;
  }

  function cellClick(event) {
    let cell = event.target;
    let turnX = turn.player1Turn;
    let turnO = turn.player2Turn;

    currentTurn = turnX ? playerXMark : playerOMark;
    console.log(turnX);
    console.log(currentTurn);

    if (turn.player1Turn === true && cell.textContent === "") {
      cell.textContent = "X";
      turn.player1Turn = false;
      turn.player2Turn = true;
      cell.classList.add(currentTurn);
      return;
    } else if (turn.player2Turn === true && cell.textContent === "") {
      cell.textContent = "O";
      turn.player1Turn = true;
      turn.player2Turn = false;
      cell.classList.add(currentTurn);
      return;
    } else if (cell.textContent === "X" || cell.textContent === "O") {
      return;
    }

    function winRound(currentTurn) {
      return logic.winCombinations.some((combination) => {
        return combination.every((index) => {
          return cells[index].classList.contains(currentTurn);
        });
      });
    }

    if (winRound(currentTurn)) {
      return alert("win");
    }
  }

  return {};
})(playerTurns, gameLogic, scoreBoard, createPlayer);
