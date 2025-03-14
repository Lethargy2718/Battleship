import battleshipSvg from "../assets/Battleships/battleship.svg";
import submarineSvg from "../assets/Battleships/submarine.svg";
import carrierSvg from "../assets/Battleships/battleship.svg";
import cruiserSvg from "../assets/Battleships/cruiser.svg";
import destroyerSvg from "../assets/Battleships/destroyer.svg";

export enum Ship {
    Carrier = "carrier",
    Battleship = "battleship",
    Cruiser = "cruiser",
    Submarine = "submarine",
    Destroyer = "destroyer",
}

export const shipToLength: Record<Ship, number> = {
    [Ship.Battleship]: 5,
    [Ship.Submarine]: 4,
    [Ship.Cruiser]: 3,
    [Ship.Carrier]: 3,
    [Ship.Destroyer]: 2,
};

export const shipToImgSrc: Record<Ship, string> = {
    [Ship.Battleship]: battleshipSvg,
    [Ship.Submarine]: submarineSvg,
    [Ship.Carrier]: carrierSvg,
    [Ship.Cruiser]: cruiserSvg,
    [Ship.Destroyer]: destroyerSvg,
};
