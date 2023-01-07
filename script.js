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
let playerMark = (function () {
  let player1Mark = "X";
  let player2Mark = "O";

  return {
    player1Mark,
    player2Mark,
  };
})();

//Module for player turn default state
let playerTurns = (function () {
  let player1Turn = true;
  return {
    player1Turn,
  };
})();

//Module for changing cell text content to X or O and managing winning combinations
let gameBoard = (function (turn, logic, mark) {
  let cells = document.querySelectorAll("[data-index]");
  let resetBtn = document.querySelector(".resetBtn");
  let turnMsg = document.querySelector(".turnMessage");
  let winMsg = document.querySelector(".winMessage");
  let player1Score = document.querySelector(".player1Score");
  let player2Score = document.querySelector(".player2Score");
  let hiddenMenu = document.querySelectorAll(".hidden");
  let hiddenWinMsg = document.querySelector(".winMenuMsg");
  let startNewGame = document.querySelector(".startNewGame");

  let player1ScoreMem = 0;
  let player2ScoreMem = 0;
  let playerXMark = mark.player1Mark;
  let playerOMark = mark.player2Mark;
  let combinations = logic.winCombinations;
  let turnX = turn.player1Turn;
  let currentTurn = undefined;

  //Function for resetting the board
  function resetBoard() {
    turn.player1Turn = true;
    turn.player2Turn = false;
    cells.forEach((cell) => {
      cell.classList.remove(playerXMark);
      cell.classList.remove(playerOMark);
      cell.removeEventListener("mousedown", cellClick);
      cell.addEventListener("mousedown", cellClick, { once: true });
      cell.textContent = "";
      turnMsg.textContent = "Player X's turn";
    });
    return;
  }

  //Function for a draw
  function draw() {
    return [...cells].every((cell) => {
      return cell.textContent !== "";
    });
  }

  //Function to change the cell content to X or O
  function cellClick(event) {
    let cell = event.target;
    turnX = turn.player1Turn;
    currentTurn = turnX ? playerXMark : playerOMark;

    if (turn.player1Turn === true && cell.textContent === "") {
      cell.textContent = "X";
      turn.player1Turn = false;
      turn.player2Turn = true;
      turnMsg.textContent = `Player O's turn`;
      return cell.classList.add(currentTurn);
    } else if (turn.player2Turn === true && cell.textContent === "") {
      cell.textContent = "O";
      turn.player1Turn = true;
      turn.player2Turn = false;
      turnMsg.textContent = `Player X's turn`;
      return cell.classList.add(currentTurn);
    } else if (cell.textContent === "X" || cell.textContent === "O") {
      return;
    }

    return currentTurn;
  }

  //Function to check if X or O player wins
  function winRound(currentTurn) {
    return combinations.some((combination) => {
      return combination.every((index) => {
        return cells[index].classList.contains(currentTurn);
      });
    });
  }

  let placeMark = cells.forEach(function (cell) {
    cell.addEventListener("mousedown", cellClick, { once: true });
  });

  //Function to check for a winning combination when clicking a cell
  let checkWin = cells.forEach(function (cell) {
    cell.addEventListener("mouseup", function () {
      winRound(currentTurn);

      if (draw()) {
        resetBoard();
        winMsg.textContent = "It's a draw!";
      }

      if (winRound(currentTurn) && currentTurn === "X") {
        resetBoard();
        player1ScoreMem += 1;
        if (player1ScoreMem >= 3) {
          player1ScoreMem = 0;
          player2ScoreMem = 0;
          hiddenMenu.forEach(function (hiddenItem) {
            hiddenItem.classList.remove("hidden");
            hiddenItem.classList.add("visible");
          });
          hiddenWinMsg.textContent = "Player X wins the game!";
        }
        player1Score.textContent = `${player1ScoreMem}`;
        winMsg.textContent = `Player X wins!`;
      } else if (winRound(currentTurn) && currentTurn === "O") {
        resetBoard();
        player2ScoreMem += 1;
        if (player2ScoreMem >= 3) {
          player1ScoreMem = 0;
          player2ScoreMem = 0;
          hiddenMenu.forEach(function (hiddenItem) {
            hiddenItem.classList.remove("hidden");
            hiddenItem.classList.add("visible");
          });
          hiddenWinMsg.textContent = "Player O wins the game!";
        }
        player2Score.textContent = `${player2ScoreMem}`;
        winMsg.textContent = `Player O wins!`;
      }
    });
  });

  //Function for creating a new game
  let newGame = startNewGame.addEventListener("click", function () {
    hiddenMenu.forEach(function (hiddenItem) {
      hiddenItem.classList.remove("visible");
      hiddenItem.classList.add("hidden");
    });
    player1ScoreMem = 0;
    player2ScoreMem = 0;
    player1Score.textContent = "0";
    player2Score.textContent = "0";
    winMsg.textContent = "Who will be the winner?";
    resetBoard();
  });

  let reset = resetBtn.addEventListener("click", resetBoard);

  return {};
})(playerTurns, gameLogic, playerMark);
