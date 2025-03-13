import battleshipSvg from "../assets/Battleships/battleship.svg";
import submarineSvg from "../assets/Battleships/submarine.svg";
import carrierSvg from "../assets/Battleships/battleship.svg";
import cruiserSvg from "../assets/Battleships/cruiser.svg";
import destroyerSvg from "../assets/Battleships/destroyer.svg";

import { Ship, ShipPlacement } from "../types";
import createGamePage from "../pages/game-gen";
import drawGrid from "../utils/create-menu-grid";
import { fillBoard } from "../utils/place-ship";

export function initGame(shipPlacementArr: ShipPlacement[]) {
    const gamePageMainEl = createGamePage();
    document.body.innerHTML = "";
    document.body.appendChild(gamePageMainEl);

    const boardOne = gamePageMainEl.querySelector("#boardOne") as HTMLDivElement;
    const boardTwo = gamePageMainEl.querySelector("#boardTwo") as HTMLDivElement;

    const boardOneGrid = drawGrid(boardOne);
    const boardTwoGrid = drawGrid(boardTwo);

    fillBoard(shipPlacementArr, generateShipToImg(), boardOne);
}

function generateShipToImg() {
    const shipToImg = {} as Record<Ship, HTMLImageElement>;

    shipToImg[Ship.Battleship] = genImgEl(battleshipSvg);
    shipToImg[Ship.Submarine] = genImgEl(submarineSvg);
    shipToImg[Ship.Carrier] = genImgEl(carrierSvg);
    shipToImg[Ship.Cruiser] = genImgEl(cruiserSvg);
    shipToImg[Ship.Destroyer] = genImgEl(destroyerSvg);

    return shipToImg;
}

function genImgEl(src: string): HTMLImageElement {
    const img = document.createElement("img");
    img.src = src;
    return img;
}
