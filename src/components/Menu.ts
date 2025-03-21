import { checkShipPlacementArrValidity } from "../utils/check-placement-arr-validity";
import { PlayerSection } from "./PlayerSection";

export class Menu {
    constructor(
        public playerOneSection: PlayerSection,
        public playerTwoSection: PlayerSection,
    ) {}

    public createGame = () => {
        const placementArrOne = this.playerOneSection.playerState.shipPlacementArr;
        const placementArrTwo = this.playerTwoSection.playerState.shipPlacementArr;
        if (!checkShipPlacementArrValidity(placementArrOne) || !checkShipPlacementArrValidity(placementArrTwo)) {
            return false;
        }

        return {
            playerOneSection: this.playerOneSection,
            playerTwoSection: this.playerTwoSection,
        };
    };
}
