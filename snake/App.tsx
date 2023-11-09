import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GameScreen from './src/screens/GameScreen';
import MainMenuScreen from './src/screens/MainMenuScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('MainMenu');
  const [difficulty, setDifficulty] = useState<number>(2);
  const [username, setUsername] = useState<string>('');

  const handleMainMenu = () => {
    setCurrentScreen('MainMenu');
  };

  const handleStartGame = (selectedDifficulty: number) => {
    setDifficulty(selectedDifficulty); 
    setCurrentScreen('Game');
  };

  const handleUserName = (name: string) => {
    setUsername(name);
  }


  const saveScore = async (score: number) => {
    try {
      const highScoresRaw = await AsyncStorage.getItem('highScores');
      const highScores = highScoresRaw ? JSON.parse(highScoresRaw) : {};
      // Assuming you want to keep the highest score for each user
      const highestScore = highScores[username] || 0;
      if (score > highestScore) {
        highScores[username] = score;
        await AsyncStorage.setItem('highScores', JSON.stringify(highScores));
        console.log('High score saved');
      }
    } catch (error) {
      console.error('Error saving high score', error);
    }
  };
  

  


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {currentScreen === 'MainMenu' && <MainMenuScreen startGame={handleStartGame} setUserName={handleUserName} saveHighScore={saveScore}/>}
      {currentScreen === 'Game' && <GameScreen handleMainMenu={handleMainMenu} difficulty={difficulty} saveScore={saveScore} />}
    </GestureHandlerRootView>
  );
};

export default App;