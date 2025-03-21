import { ShipPlacement } from "../types/placement";
import { Ship } from "../types/ship";

export function checkShipPlacementArrValidity(shipPlacementArr: ShipPlacement[]): boolean {
    const ships = Object.values(Ship);
    const shipsInArr = shipPlacementArr.map((obj) => obj.ship);

    const isSurjective = ships.every((ship) => shipsInArr.includes(ship));

    const isInjective = new Set(shipsInArr).size === shipsInArr.length;

    return isSurjective && isInjective;
}
