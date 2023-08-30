import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Coordinate } from '../types/types';

export default function Food({ x, y }: Coordinate): JSX.Element {
  const [emoji, setEmoji] = useState<string>('');

  useEffect(() => {
    // Generate the random emoji only once when the component mounts and coordinates change
    setEmoji(getRandomFruitEmoji());
  }, [x,y]);

  function getRandomFruitEmoji() {
    const fruitEmojis = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥭', '🥥', '🥝', '🍅', '🍆', '🥑', '🥒', '🌶', '🌽', '🥕', '🍠', '🥔'];
    const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
    return fruitEmojis[randomIndex];
  }

  return (
    <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>
      {emoji}
    </Text>
  );
}

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 7,
    position: 'absolute',
  },
});
