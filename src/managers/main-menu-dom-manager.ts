import { Menu } from "../components/Menu";
import { PlayerSection } from "../components/PlayerSection";
import { GameInitData } from "../types";
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
        const section = btn.closest(".player-container");
        const i = btn.querySelector("i");
        if (!section || !i) return;
        section.classList.toggle("dark-overlay");
        i.classList.toggle("fa-eye");
        i.classList.toggle("fa-eye-slash");
    });
});

startBtn?.addEventListener("click", () => {
    const gameData = menu.createGame();
    if (!gameData) return;
    initGame(gameData as GameInitData);
});
