import { TouchableOpacity, StyleSheet, View, Text,  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { FontAwesome } from '@expo/vector-icons';

interface MainMenuProps {
    startGame: () => void;
    difficultyHandle: (difficulty: number) => void;
    difficulty: number;
    // highScore: () => void;
}

export default function MainMenu({
    startGame,
    difficultyHandle,
    difficulty,
    // highScore,
}: MainMenuProps): JSX.Element {
    return (
        <View style={styles.container}>
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
});