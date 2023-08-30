import { Coordinate } from "../types/types";

interface GameBoundaries {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

const SNAKE_SIZE = 15;

export const checkGameOver = (
    snakeHead: Coordinate, 
    boundaries: any
    ):boolean => {
    return (
            snakeHead.x <  boundaries.xMin
        || snakeHead.x   > boundaries.xMax
        || snakeHead.y < boundaries.yMin
        || snakeHead.y  > boundaries.yMax
    )


}


// KATSO MINNE SNAKE SIZE LISÄTÄÄN