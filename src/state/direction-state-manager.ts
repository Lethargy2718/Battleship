import { Direction } from "../types";

const horizontalBtn: HTMLButtonElement | null = document.querySelector("#horizontalBtn");
const verticalBtn: HTMLButtonElement | null = document.querySelector("#verticalBtn");

let currentDirection: Direction = "right";

horizontalBtn?.addEventListener("click", () => {
    currentDirection = "right";
    horizontalBtn.classList.add("active");
    verticalBtn?.classList.remove("active");
});

verticalBtn?.addEventListener("click", () => {
    currentDirection = "down";
    verticalBtn.classList.add("active");
    horizontalBtn?.classList.remove("active");
});

export default function getDirection() {
    return currentDirection;
}
