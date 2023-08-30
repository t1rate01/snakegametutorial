import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Game from "./src/components/game"

const App = () => (
    <GestureHandlerRootView style={{flex: 1 }}>  
      <Game />
    </GestureHandlerRootView>
);
// flex 1 is needed for the game to be able to take up the whole screen

export default App;