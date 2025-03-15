import { Ship } from "./ship";

import battleshipSvg from "../assets/Battleships/battleship.svg";
import submarineSvg from "../assets/Battleships/submarine.svg";
import carrierSvg from "../assets/Battleships/battleship.svg";
import cruiserSvg from "../assets/Battleships/cruiser.svg";
import destroyerSvg from "../assets/Battleships/destroyer.svg";

export const shipToImgSrc: Record<Ship, string> = {
    [Ship.Battleship]: battleshipSvg,
    [Ship.Submarine]: submarineSvg,
    [Ship.Carrier]: carrierSvg,
    [Ship.Cruiser]: cruiserSvg,
    [Ship.Destroyer]: destroyerSvg,
};
