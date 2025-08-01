let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let startingPlayer = "X"; // Keeps track of who starts each game
let gameEnded = false; // To prevent moves after the game ends
let gameStatus = document.getElementById("status");

function makeMove(index) {
    if (gameEnded || board[index] !== "") return; // Prevent invalid moves
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;

    if (checkWinner()) {
        gameStatus.innerText = `Player ${currentPlayer} wins!`;
        alert(`Player ${currentPlayer} is the winner!`);
        gameEnded = true;
        return;
    }

    if (board.every(cell => cell !== "")) { // Check if all cells are filled (no empty spaces)
        gameStatus.innerText = "Draw!";
        alert("It's a draw!");
        gameEnded = true;
        return;
    }

    // Change turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6]  // diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false; // No winner
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameEnded = false;

    // Toggle the starting player
    startingPlayer = startingPlayer === "X" ? "O" : "X";
    currentPlayer = startingPlayer;

    gameStatus.innerText = `Player ${currentPlayer}'s turn`;
    const cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerText = "";
    }
}
