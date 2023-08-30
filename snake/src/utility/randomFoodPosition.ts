import { Coordinate } from "../types/types";

const isPositionOccupiedBySnake = (position: Coordinate, snake: Coordinate[]): boolean => {
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
};  // make sure food doesnt spawn on snake


export const randomFoodPosition = (maxX: number, maxY: number, snake: Coordinate[]): Coordinate => {
    let newFood: Coordinate;
    const margin = 0.05;   // for playability, food should not spawn too close to the edges

    do {
        newFood = {
            x: Math.floor(Math.random() * ((maxX - (maxX*margin)) / 10)),
            y: Math.floor(Math.random() * ((maxY - (maxY*margin)) / 10))
        };
    } while (isPositionOccupiedBySnake(newFood, snake))

    return newFood;
};
