//your JS code here. If required.

const nameForm = document.getElementById("name-form");
const game = document.getElementById("game");
const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restart");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let players = [];
let currentPlayer = 0;
let board = Array(9).fill("");
let gameOver = false;

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

submitBtn.addEventListener("click", function () {
    const player1 = document.getElementById("player-1").value.trim();
    const player2 = document.getElementById("player-2").value.trim();

    if (!player1 || !player2) {
        alert("Please enter both player names.");
        return;
    }

    players = [
        { name: player1, symbol: "x" },
        { name: player2, symbol: "o" }
    ];

    nameForm.style.display = "none";
    game.style.display = "block";

    startGame();
});

function startGame() {
    board = Array(9).fill("");
    currentPlayer = 0;
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });

    updateMessage();
}

function updateMessage() {
    message.textContent =
        `${players[currentPlayer].name}, you're up`;
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
        if (gameOver || board[index] !== "") {
            return;
        }

        const player = players[currentPlayer];

        board[index] = player.symbol;
        cell.textContent = player.symbol;
        cell.classList.add("taken");

        const hasWon = winningCombinations.some(combination =>
            combination.every(position =>
                board[position] === player.symbol
            )
        );

        if (hasWon) {
            message.textContent =
                `${player.name} congratulations you won!`;
            gameOver = true;
            return;
        }

        if (board.every(value => value !== "")) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = 1 - currentPlayer;
        updateMessage();
    });
});

restartBtn.addEventListener("click", startGame);
