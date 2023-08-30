import { Coordinate } from "../types/types";

export const checkCollideSelf = (
    head: Coordinate,
    snake: Coordinate[]
): boolean => {
    return snake.some((snakePart) => {
        return snakePart.x === head.x && snakePart.y === head.y;
    });
}