// script.js
const gameBoard = document.getElementById('gameBoard');
const houseCounter = document.getElementById('houseCounter');
const SIZE = 7;
const EMPTY = 0,
    ROAD = 1,
    HOUSE = 2;
let grid = Array(SIZE).fill().map(() => Array(SIZE).fill(EMPTY));

function initGameBoard() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const cellButton = document.createElement('button');
            cellButton.dataset.i = i;
            cellButton.dataset.j = j;
            cellButton.onclick = () => updateCell(i, j);
            gameBoard.appendChild(cellButton);
        }
    }
    updateBoardDisplay();
}

function updateCell(i, j) {
    if (grid[i][j] !== ROAD) {
        grid[i][j] = ROAD;
    } else {
        grid[i][j] = EMPTY;
    }
    updateHouses();
    updateBoardDisplay();
    updateHouseCounter();
}

function updateHouses() {
    // Clear all houses first
    grid = grid.map(row => row.map(cell => cell === HOUSE ? EMPTY : cell));

    // Place houses around roads
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (grid[i][j] === ROAD) {
                placeHousesAroundRoad(i, j);
            }
        }
    }
}

function placeHousesAroundRoad(i, j) {
    const adjacentCells = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1]
    ];
    adjacentCells.forEach(([x, y]) => {
        if (x >= 0 && x < SIZE && y >= 0 && y < SIZE && grid[x][y] === EMPTY) {
            grid[x][y] = HOUSE;
        }
    });
}

function updateBoardDisplay() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const cellButton = gameBoard.children[i * SIZE + j];
            if (grid[i][j] === ROAD) {
                cellButton.style.backgroundColor = 'gray';
            } else if (grid[i][j] === HOUSE) {
                cellButton.style.backgroundColor = 'green';
            } else {
                cellButton.style.backgroundColor = 'white';
            }
        }
    }
}

function updateBoardDisplay() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const cellButton = gameBoard.children[i * SIZE + j];
            switch (grid[i][j]) {
                case ROAD:
                    cellButton.style.backgroundImage = "url('road_icon.jpg')";
                    break;
                case HOUSE:
                    cellButton.style.backgroundImage = "url('real_estate_icon.png')";
                    break;
                default:
                    cellButton.style.backgroundImage = "url('grass_icon.png')";
            }
            cellButton.style.backgroundSize = "cover";
        }
    }
}

function updateHouseCounter() {
    const houseCount = grid.flat().filter(cell => cell === HOUSE).length;
    houseCounter.textContent = `Houses: ${houseCount}`;
}

function restartGame() {
    grid = Array(SIZE).fill().map(() => Array(SIZE).fill(EMPTY));
    updateBoardDisplay();
    updateHouseCounter();
}

function tryAgain() {
    // You can add custom logic for 'Try Again'. Currently, it's same as restart.
    restartGame();
}

document.getElementById('restartButton').addEventListener('click', restartGame);
document.getElementById('tryAgainButton').addEventListener('click', tryAgain);

initGameBoard();