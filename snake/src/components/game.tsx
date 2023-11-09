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
import MainMenu from './mainmenu';


const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const FOOD_INITIAL_POSITION = {x: 5, y: 20};
//const GAME_BOUNDS = { xMin: 0, xMax: 37, yMin: 0, yMax: 72};
 //const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;
const SNAKE_SIZE = 15;

interface GameProps {
    handleMainMenu: () => void;
    difficulty: number;
    saveScore: (score: number) => void;
}
export default function Game({handleMainMenu, difficulty, saveScore}: GameProps):JSX.Element {
    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(true);
    const [score, setScore] = React.useState<number>(0);
    const [gameBounds, setGameBounds] = React.useState<{ xMin: number, xMax: number, yMin: number, yMax: number } | null>(null);
    const [MOVE_INTERVAL, setMoveInterval] = React.useState<number>(50);


    React.useEffect(() => {
        if(!isGameOver){
            const snakeSpeed = difficulty === 1 ? 75 : difficulty === 2 ? 50 : 25;
            const intervalId = setInterval(() => {
              !isPaused &&  moveSnake();
            }, snakeSpeed);
            return () => clearInterval(intervalId); // for memory leaks
        }
    },[snake, isGameOver, isPaused, difficulty]);


    React.useEffect(() => {
        if(difficulty === 1) {
            setMoveInterval(75);
        } else if (difficulty === 2) {
            setMoveInterval(50);
        } else if (difficulty === 3) {
            setMoveInterval(25);
        }
    }, [difficulty]);

   const snakeSpeed = difficulty === 1 ? 75 : difficulty === 2 ? 50 : 25;

    const handleLayout = (event: any) => {
        const {width, height} = event.nativeEvent.layout;
        console.log("Raw dimensions:", {width, height});
    
        // Debug calculations
        const calculatedXMax = width - SNAKE_SIZE;
        const calculatedYMax = height - SNAKE_SIZE;
        
        console.log("Calculated boundaries:", {calculatedXMax, calculatedYMax});
    
        const newGameBounds = {
            xMin: 0,
            xMax: calculatedXMax,
            yMin: 0,
            yMax: calculatedYMax,
        };
        
        setGameBounds(newGameBounds);
        console.log("Set boundaries:", newGameBounds);
    };
    

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = {...snakeHead};

        if(!gameBounds) return; // wait for getting bounds
        // game over check
        if (checkGameOver(snakeHead, gameBounds)) {
            saveScore(score);
            
            setIsGameOver((prev) => !prev);
            console.log("game over");
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
            setFood(randomFoodPosition(gameBounds.xMax, gameBounds.yMax, snake));
            setSnake([newHead, ...snake]);
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
        saveScore(score);
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
                mainMenu={handleMainMenu} 
            >
                <Text style={styles.score}>{score}</Text>
            </Header>

                <View onLayout={handleLayout} style={styles.boundaries}>
                    <Snake snake={snake}/>
                    <Food x={food.x} y={food.y}/>
                </View> 
            </SafeAreaView>
        </PanGestureHandler>
    );
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