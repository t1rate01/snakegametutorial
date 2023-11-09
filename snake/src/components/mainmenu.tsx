import { TouchableOpacity, StyleSheet, View, Text, TextInput  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHighScoresFromFirebase } from '../utility/highScoreToFireBase';

interface MainMenuProps {
    startGame: () => void;
    difficultyHandle: (difficulty: number) => void;
    difficulty: number;
    setUsername: (name: string) => void;
    // highScore: () => void;
}

export default function MainMenu({
    startGame,
    difficultyHandle,
    difficulty,
    setUsername,
    // highScore,
}: MainMenuProps): JSX.Element {
    const [highScores, setHighScores] = React.useState<Record<string, number>>({});
    const [fireBaseHighScores, setFireBaseHighScores] = React.useState<Record<string, number>>({});

    React.useEffect(() => {   // parses the string to make an object
        const getHighScores = async () => {
          try {
            const highScoresRaw = await AsyncStorage.getItem('highScores');
            const highScores = highScoresRaw ? JSON.parse(highScoresRaw) : {};
            setHighScores(highScores);
          } catch (error) {
            console.log('Error retrieving high scores', error);
          }
        };
    
        getHighScores();
      }, []);

      React.useEffect(() => {  // fetches array of objects, uses reduce to make an object
        const fetchFireBaseHighScores = async () => {
            try {
                const fetchedHighScoresArray = await getHighScoresFromFirebase();
                const fetchedHighScores = fetchedHighScoresArray.reduce<Record<string, number>>((acc, { username, score }) => {
                    acc[username] = score;
                    return acc;
                }, {});
                
                setFireBaseHighScores(fetchedHighScores);
            } catch (error) {
                console.log('Error retrieving high scores from Firebase', error);
            }
        };
    
        fetchFireBaseHighScores();
    }, []);
    
 
    
   
    return (
        <View style={styles.container}>
            <TextInput
            
            onChangeText={setUsername}
            placeholder={'Enter your name'}
            style={styles.input}
    ></TextInput>
            <TouchableOpacity onPress={startGame}>
                <FontAwesome
                    name={'play-circle'}
                    size={35}
                    color={Colors.primary}
                />
                <Text>PLAY</Text>
            </TouchableOpacity>
            <View style={styles.difficulties}>
                <TouchableOpacity onPress={() => difficultyHandle(1)}>
                    <Text style={difficulty === 1 ? styles.boldText : null}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => difficultyHandle(2)}>
                    <Text style={difficulty === 2 ? styles.boldText : null}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => difficultyHandle(3)}>
                    <Text style={difficulty === 3 ? styles.boldText : null}>Hard</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.highscore}>
                <Text>Local high scores</Text>
      {Object.entries(highScores).map(([username, score], index) => (
        <Text key={index}>{`${username}: ${score}`}</Text>
        
      ))}
    </View>
    <View style={styles.highscore}>
                <Text>Global high scores</Text>
        {Object.entries(fireBaseHighScores).map(([username, score], index) => (
        <Text key={index}>{`${username}: ${score}`}</Text>
        ))}
        </View>
        </View>
    );};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: Colors.primary,
        borderWidth: 12,
        borderRadius: 30,
        borderBottomWidth: 0,
        backgroundColor: Colors.background,
        padding: 15,
        marginTop: 35,
        marginBottom: 10,
        justifyContent: 'center',
    },
    difficulties: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 20,

    },
    boldText: {
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      highscore: {
        marginTop: 20,
      },
});