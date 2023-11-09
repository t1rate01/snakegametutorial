import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainMenu from '../components/mainmenu';
import { Colors } from "../styles/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MainMenuScreenProps {
  startGame: (difficulty: number) => void;
    setUserName: (name: string) => void;
    saveHighScore: (score: number, username: string) => void;
}

export default function MainMenuScreen({ startGame, setUserName, saveHighScore }: MainMenuScreenProps): JSX.Element {
  const [difficulty, setDifficulty] = React.useState<number>(2);
  

  const handleDifficulty = (difficulty: number) => {
    setDifficulty(difficulty);
    console.log(difficulty);
  };

 


  return (
    <SafeAreaView style={styles.container}>
        <MainMenu
        startGame={() => startGame(difficulty)}
        difficultyHandle={handleDifficulty}
        difficulty={difficulty}
        setUsername={setUserName}
    />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
