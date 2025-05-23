import { Menu } from "../components/Menu";
import { PlayerSection } from "../components/PlayerSection";
import { initGame } from "./game-dom-manager";

// const menuMainEl = createMainMenu();
// document.body.appendChild(menuMainEl);

const startBtn = document.querySelector("#startBtn");

const playerOneSectionEl: HTMLElement = document.querySelector(".player-one-container");
const playerTwoSectionEl: HTMLElement = document.querySelector(".player-two-container");

const playerOneSection = new PlayerSection(playerOneSectionEl);
const playerTwoSection = new PlayerSection(playerTwoSectionEl);
const menu = new Menu(playerOneSection, playerTwoSection);

const visibilityToggleBtns = document.querySelectorAll(".visibility-toggle");

visibilityToggleBtns.forEach((btn) => {
    btn.addEventListener("click", (e: MouseEvent) => {
        const board = btn.closest("section")?.querySelector(".game-board");
        const i = btn.querySelector("i");
        if (!board || !i) return;
        board.classList.add("dark-overlay");
        i.classList.add("fa-eye");
        i.classList.add("fa-eye-slash");
        btn.classList.remove("can-click");
    });
});

startBtn?.addEventListener("click", () => {
    const gameData = menu.createGame();
    if (!gameData) return;
    initGame(gameData);
});
