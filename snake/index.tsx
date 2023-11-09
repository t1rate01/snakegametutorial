import { AppRegistry } from 'react-native';
import App from './App'; // Adjust this path to where your App component is defined
const { name: appName } = require('./app.json'); // Use require for JSON files

AppRegistry.registerComponent(appName, () => App);
