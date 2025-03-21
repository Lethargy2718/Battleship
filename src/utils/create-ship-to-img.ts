import { Ship } from "../types";
import { genImgEl } from "./create-image-element";

export function createShipToImg() {
    const shipToImg = {} as Record<Ship, HTMLImageElement>;

    Object.values(Ship).forEach((ship) => {
        const imgEl = genImgEl(ship);
        shipToImg[ship] = imgEl;
    });

    return shipToImg;
}
