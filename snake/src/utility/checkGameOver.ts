import { Coordinate } from "../types/types";

interface GameBoundaries {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}


// readability, snake sizes and tested multiplier, scale comes from tutorial
const SNAKE_SIZE = 15;
const SNAKE_COLLIDER = SNAKE_SIZE * 1.5;
const SCALING_FACTOR = 10;

export const checkGameOver = (
    snakeHead: Coordinate, 
    boundaries: GameBoundaries
): boolean => {
    const scaledSnakeHeadX = snakeHead.x * SCALING_FACTOR;
    const scaledSnakeHeadY = snakeHead.y * SCALING_FACTOR;
    return (  // CHECKS FOR COLLISION WITH WALLS, ALLOWS HALF OF SNAKES HEAD TO DISAPPEAR
        scaledSnakeHeadX < boundaries.xMin ||
        scaledSnakeHeadX > (boundaries.xMax - SNAKE_COLLIDER) ||
        scaledSnakeHeadY < boundaries.yMin ||
        scaledSnakeHeadY > (boundaries.yMax - SNAKE_COLLIDER)
    );
};



