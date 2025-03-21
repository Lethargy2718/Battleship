import { Human, ProbMapAI, RandomAI } from "../entities/Player";

export enum PlayerType {
    Human = "Human",
    RandomAI = "RandomAI",
    ProbMapAI = "ProbMapAI",
}

export const playerTypeToPlayer: Record<PlayerType, typeof Human> = {
    [PlayerType.Human]: Human,
    [PlayerType.RandomAI]: RandomAI,
    [PlayerType.ProbMapAI]: ProbMapAI,
};
