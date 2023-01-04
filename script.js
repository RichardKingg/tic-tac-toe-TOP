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
  let player1Score = parseInt(
    document.querySelector(".player1Score").textContent
  );
  let player2Score = parseInt(
    document.querySelector(".player2Score").textContent
  );
  let playerXMark = mark.player1Mark;
  let playerOMark = mark.player2Mark;
  let combinations = logic.winCombinations;
  let turnX = turn.player1Turn;
  let currentTurn = undefined;

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
    turnX = turn.player1Turn;
    currentTurn = turnX ? playerXMark : playerOMark;
    console.log(turnX);
    console.log(currentTurn);

    if (turn.player1Turn === true && cell.textContent === "") {
      cell.textContent = "X";
      turn.player1Turn = false;
      turn.player2Turn = true;
      turnMsg.textContent = `player O's turn`;
      return cell.classList.add(currentTurn);
    } else if (turn.player2Turn === true && cell.textContent === "") {
      cell.textContent = "O";
      turn.player1Turn = true;
      turn.player2Turn = false;
      turnMsg.textContent = `player X's turn`;
      return cell.classList.add(currentTurn);
    } else if (cell.textContent === "X" || cell.textContent === "O") {
      return;
    }

    return currentTurn;
  }

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

  let checkWin = cells.forEach(function (cell) {
    cell.addEventListener("mouseup", function () {
      winRound(currentTurn);
      if (winRound(currentTurn) && currentTurn === "X") {
        resetBoard();
        player1Score++;
        player1Score.textContent = `${player1Score}`;
        winMsg.textContent = `player X wins!`;
      } else if (winRound(currentTurn) && currentTurn === "O") {
        resetBoard();
        player2Score++;
        player2Score.textContent = `${player2Score}`;
        winMsg.textContent = `player O wins!`;
      }
    });
  });

  let reset = resetBtn.addEventListener("click", resetBoard);

  return {};
})(playerTurns, gameLogic, playerMark);
