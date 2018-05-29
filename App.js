import { StackNavigator } from 'react-navigation';
import HomePage from "./src/pages/HomePage"
import Settings from "./src/pages/Settings"

const App = StackNavigator({
  Home: { screen: HomePage },
  Settings: { screen: Settings },
});

export default App;
