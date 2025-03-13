export default function drawGrid(board: HTMLDivElement) {
    const gridMatrix: HTMLDivElement[][] = [];
    for (let i = 0; i < 10; i++) {
        gridMatrix.push([]);
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("data-x", `${i}`);
            cell.setAttribute("data-y", `${j}`);
            cell.classList.add("cell");
            gridMatrix[i].push(cell);

            board?.appendChild(cell);
        }
    }

    return gridMatrix;
}
