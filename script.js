//Module for creating the game board
let gameBoard = (function () {
  let container = document.createElement("div");
  container.classList.add("board");
  let gameArray = [];
  const rows = 3;
  const cols = 3;
  for (let i = 0; i < rows; i++) {
    gameArray[i] = [];
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("boardCell");
      grid[i][j] = cell;
      container.appendChild(grid[i][j]);
    }
  }
  return {
    container,
    gameArray,
  };
})();
