import './style.css';

const shipMap = {
    battleship: 5,
    submarine: 4,
    destroyer: 3,
    patrol: 2,
}

function drawGrid() {
    const grid = document.querySelector(".game-board");
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("data-x", `${i}`);
            cell.setAttribute("data-y", `${j}`);
            cell.classList.add("cell");

            grid?.appendChild(cell);
        }
    }
}

drawGrid();