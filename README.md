# snakegametutorial
 Began by following a tutorial, then polished further.  

 -- Tutorial finished  
 -- Added flexible out of bounds collisionchecks(not tested with different devices)  
 -- Added Mainmenu as startscreen, and a button to go back to it  
 -- Added difficulty choises and functionalities  
 -- Added a check that food cannot spawn on snake and a margin to keep food from too close to the edges  
 -- Prevented snake from making a 180 on itself, and colliding with itself causes gameover  


 Added:  
 -- Locally stored highscores  
 -- Firebase stored highscores (uploaded without configs)  


# Current state and how to use:  
Run npm install in snake directory, run npx expo app and connect to your phone.  
Enter username, press enter on phones keyboard. 
Select difficulty and press play, the game starts paused. Play the game until failure and press menu to go back and see high score saved locally and globally.  
  
Game movement is swipe directions.  
Firebaseconfig is missing from config.tsx to prevent misuse.    
  
# How it works  
App.tsx has functions for setting difficulty which effects the movement speed of the snake in later logic,
handeling conditional function for returning to menu, starting the game, which screen to use and storing username.  
App.tsx returns GestureHandlerRootiew for the 2 screens, and passes needed props for the screens.  

MainMenuScreen takes in difficulty, has a handledifficulty function and returns MainMenu component with props passed from App.tsx.  
MainMenu receives the props and has logic for getting the highscores from local storage and displaying them if found.  
MainMenu renders the menu, which contains TextInput for setting username, a button or a TouchableOpasity, that renders a FontAwesome library icon  
and a Play text, which together will trigger starting the game logic when pressed. Also has 3 options using TouchableOpasity for changing the difficulty, 
which will travel back to App.tsx so the game can be updated when it starts.  

GameScreen has logic to receive the props and pass them down to Game, which it returns.  

Game component receives the props, sets the move interval according to the difficulty, calculates the layout of the play area and  
sets collision (game bounds) perimeters. The "snake" of the game is an array of coordinates, of whichs size and locations are stored in the function.  
Everytime "snake eats food", the array grows a size, and during every movement the last (oldest) location is deleted.  
The direction of the snake is determined by swiping the screen at the direction you want it to go.  
Snake uses utility functions such as checkCollideSelf, that compare the if the snakes head is in any existing coordinate which means it is colliding with itself.  
Same logic is used to check if snake eats food, comparing the coordinates, or if the snake is hitting the game bounds.  
  
There is also a highScoreToFireBase utility, that contains functions for getting highscores from database and posting them to database, which are used by mainmenu and game.  

  
*What is untested is how well the game bounds works on different devices, if the formula and the "cushion" is enough to appear smooth on all devices*  
  
The game is also rendering a Header component, which contains buttons and displays the score, whichs logic is passed through the components in props.  



Tutorial used in original version:  
https://www.youtube.com/watch?v=hXogPCM4FS8  
