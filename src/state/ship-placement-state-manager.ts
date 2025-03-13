import { ShipPlacement, Ship } from "../types";

let shipPlacementArr: ShipPlacement[] = [];

export function updateShipPlacementArr(newPlacementArr: ShipPlacement[] = []): void {
    shipPlacementArr = [...newPlacementArr];
}

export function pushToShipPlacementArr(shipPlacement: ShipPlacement): void {
    shipPlacementArr.push(shipPlacement);
}

export function getShipPlacementArr(): ShipPlacement[] {
    return [...shipPlacementArr];
}

export function checkShipPlacementArrValidity(): boolean {
    const ships = Object.values(Ship);
    const shipsInArr = shipPlacementArr.map((obj) => obj.ship);

    const isSurjective = ships.every((ship) => shipsInArr.includes(ship));

    const isInjective = new Set(shipsInArr).size === shipsInArr.length;

    return isSurjective && isInjective;
}
