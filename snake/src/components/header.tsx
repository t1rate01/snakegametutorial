import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { FontAwesome } from '@expo/vector-icons';

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    mainMenu: () => void;
    children: JSX.Element;
    isPaused: boolean;
}

export default function Header({
    children,
    reloadGame,
    pauseGame,
    mainMenu,
    isPaused,
}: HeaderProps): JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="reload-circle" size={35} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome
                name={isPaused ? 'play-circle' : 'pause-circle'}
                size={35}
                color={Colors.primary}
                />
            </TouchableOpacity>
            {children}
            <TouchableOpacity onPress={mainMenu}>
                <Ionicons name="menu" size={35} color={Colors.primary} />
            </TouchableOpacity>
        </View>
    )};

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        backgroundColor: Colors.background,
        padding: 15,
        marginTop: 35,
    },
});
