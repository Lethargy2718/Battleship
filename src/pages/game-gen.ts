export default function createGamePage() {
    const main = document.createElement("main");
    main.classList.add("main", "container", "game-main");

    const boardsContainer = document.createElement("div");
    boardsContainer.classList.add("board-container");

    const boardOne = document.createElement("div");
    const boardTwo = document.createElement("div");

    boardOne.classList.add("game-board");
    boardOne.id = "boardOne";

    boardTwo.classList.add("game-board");
    boardTwo.id = "boardTwo";

    boardsContainer.appendChild(boardOne);
    boardsContainer.appendChild(boardTwo);

    main.appendChild(boardsContainer);

    return main;
}
