import { Ship, shipToImgSrc } from "../types";

export function genImgEl(ship: Ship): HTMLImageElement {
    const img = document.createElement("img");
    img.src = shipToImgSrc[ship];
    return img;
}
