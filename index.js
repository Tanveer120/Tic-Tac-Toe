let winnerName = document.querySelector("#winnerName");

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let xWin = 0;
let oWin = 0;

let currentPlayer = "X";
let gameOver = false;

let grids = document.querySelectorAll(".gameGrids");
let gridrow = document.querySelectorAll(".gridRow");

let xPoint = document.querySelector("#xWin");
let oPoint = document.querySelector("#oWin");
let gameWinner = document.querySelector("#gameWinner");
let winnerCrown = document.querySelector("#winnerCrown");

function checkWinner() {
    for (let i = 0; i < 3; i++){
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    for (let j = 0; j < 3; j++){
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }

    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }

    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    let isTie = true;
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++){
            if (board[i][j] === '') {
                isTie = false;
                break;
            }                
        }
    }
    if (isTie) {
        return "Tied";
    }
    return null;
}


function playerMove(row, col) {
    if (!gameOver && board[row][col] === '') {
        board[row][col] = currentPlayer;
        let winner = checkWinner();

        if (winner !== null) {
            gameOver = true;
            if (winner !== "Tied") {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                winnerName.innerHTML = `${winner} Won the Round`;
                if (winner == "X") {
                    xWin++;
                    xPoint.innerHTML = `X-${xWin}`;
                    if (xWin == 3) {
                        winnerCrown.style.display = "block";
                        resetButton.style.display = "none";
                        gameWinner.innerHTML = "Player 1 Won";
                    }
                }
                else {
                    oWin++;
                    oPoint.innerHTML = `O-${oWin}`;
                    if (oWin == 3) {
                        winnerCrown.style.display = "block";
                        resetButton.style.display = "none";
                        gameWinner.innerHTML = "Player 2 Won";
                    }
                }
                return true;
            }
            else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                winnerName.innerHTML = `Game Tied`;
                return true;
            }
        }
        else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            return true;
        }
    }
    else {
        return false;
    }
}

for(let grid of grids) {
    grid.addEventListener("click", () => {
        let m = grid.parentElement.id;
        let n = grid.id;
        
        if (playerMove(m, n)) {
            grid.innerHTML = currentPlayer==="X"?"O":"X";
        }
        else {
            return;
        }
    })
}


let resetButton = document.querySelector("#resetButton");
let resetGameButton = document.querySelector("#resetGameButton");

resetButton.addEventListener("click", () => {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    currentPlayer = "X";
    gameOver = false;

    for (let grid of grids) {
        grid.innerHTML = "";
    }

    winnerName.innerHTML = "";
})

resetGameButton.addEventListener("click", () => {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    currentPlayer = "X";
    gameOver = false;

    for (let grid of grids) {
        grid.innerHTML = "";
    }

    winnerName.innerHTML = "";

    winnerCrown.style.display = "none";

    resetButton.style.display = "block";
    
    xWin = 0;
    xPoint.innerHTML = `X-0`;
    oWin = 0;
    oPoint.innerHTML = `O-0`;

    gameWinner.innerHTML = "";
})