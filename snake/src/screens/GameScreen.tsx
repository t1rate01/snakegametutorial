import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Colors } from "../styles/colors";
import Game from '../components/game'; // Assuming Game.tsx is in the same directory

interface GameScreenProps {
    handleMainMenu: () => void;
    difficulty: number;
    saveScore: (score: number) => void;
}

const GameScreen = ({ handleMainMenu, difficulty, saveScore }: GameScreenProps) => {
  return (
    <PanGestureHandler>
      <SafeAreaView style={styles.container}>
        <Game handleMainMenu={handleMainMenu} difficulty={difficulty} saveScore={saveScore} />
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  }
});

export default GameScreen;