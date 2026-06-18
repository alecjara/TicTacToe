const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] !== "" || gameActive === false) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  switchPlayer();
}

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      board[a] === currentPlayer &&
      board[b] === currentPlayer &&
      board[c] === currentPlayer
    ) {
      cells[a].classList.add("winning-cell");
      cells[b].classList.add("winning-cell");
      cells[c].classList.add("winning-cell");

      return true;
    }
  }

  return false;
}

function checkDraw() {
  return board.every(cell => cell !== "");
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Player X's turn";

 cells.forEach(cell => {
  cell.textContent = "";
  cell.classList.remove("winning-cell");
});
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);