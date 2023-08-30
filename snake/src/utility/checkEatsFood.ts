import { Coordinate } from "../types/types";

export const checkEatsFood = (
    head: Coordinate,
    food: Coordinate,
    area: number  // compare to area instead of 1
): boolean => {
    const distanceBetweenFoodAndSnakeX = Math.abs(head.x - food.x);
    const distanceBetweenFoodAndSnakeY = Math.abs(head.y - food.y);
    return (
        distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
    );
};