import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Colors } from "../styles/colors";
import { Coordinate, Direction, GestureEventType } from '../types/types';
import Snake from './snake';
import { checkGameOver } from '../utility/checkGameOver';
import { checkCollideSelf } from '../utility/checkCollideSelf';
import Food from './food';
import { checkEatsFood } from '../utility/checkEatsFood';
import { randomFoodPosition } from '../utility/randomFoodPosition';
import Header from './header';

const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const FOOD_INITIAL_POSITION = {x: 5, y: 20};
//const GAME_BOUNDS = { xMin: 0, xMax: 37, yMin: 0, yMax: 72};
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game():JSX.Element {
    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(true);
    const [score, setScore] = React.useState<number>(0);
    const [gameBounds, setGameBounds] = React.useState(null);



    React.useEffect(() => {
        if(!isGameOver){
            const intervalId = setInterval(() => {
              !isPaused &&  moveSnake();
            }, MOVE_INTERVAL);
            return () => clearInterval(intervalId); // for memoryleaks
        }

    },[snake, isGameOver, isPaused]);

    const handleLayout = (event: any) => {
        const {width, height} = event.nativeEvent.layout;
        const newGameBounds = {
            xMin: 0,
            xMax: width / 10 - 1,
            yMin: 0,
            yMax: height / 10 - 1,
        };
        setGameBounds(newGameBounds);
        console.log(newGameBounds);
    };

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = {...snakeHead};

        if(!gameBounds) return; // wait for getting bounds
        // game over check
        if (checkGameOver(snakeHead, gameBounds)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch(direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
        }

        // if eats food
        // grow snake

        if(checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(gameBounds?.xMax ?? 0, gameBounds?.yMax ?? 0));
            setSnake([newHead, ...snake]);
            // new food and score up
            
            setScore(score + SCORE_INCREMENT);
        } 
        // check if colliding with self
        else if (checkCollideSelf(newHead, snake)) {
            setIsGameOver((prev) => !prev);
            return;
        }
        
        
        else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }

       
    }

    const handleGesture = (event: GestureEventType) => {
        const {translationX, translationY} = event.nativeEvent;
        //console.log(translationX, translationY);

        if(Math.abs(translationX) > Math.abs(translationY)) {
            if(translationX > 0 && direction !== Direction.Left) {  // block 180 degree turns
               // console.log("right");
               setDirection(Direction.Right);
            } else if (translationX < 0 && direction !== Direction.Right) {
               // console.log("left");
                setDirection(Direction.Left);
            }
        } else {
            if(translationY > 0 && direction !== Direction.Up) {
               // console.log("down");
                setDirection(Direction.Down);
            } else if (translationY < 0 && direction !== Direction.Down) {
              //  console.log("up");
                setDirection(Direction.Up);
            }
        }

    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setDirection(Direction.Right);
        setScore(0);
        setIsPaused(true);
    };


    const pauseGame = () => {
        setIsPaused(!isPaused);
    };

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <Header 
                isPaused={isPaused} 
                pauseGame={pauseGame} 
                reloadGame={reloadGame}
                >
                    <Text style={styles.score}>{score}</Text>
                </Header>
               <View onLayout={handleLayout} style={styles.boundaries}>
                    <Snake snake={snake}/>
                    <Food x={food.x} y={food.y}/>
                </View> 
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background,
    },
    score: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});