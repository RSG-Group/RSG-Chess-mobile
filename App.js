import { createDrawerNavigator } from "react-navigation";
import HomePage from "./src/pages/HomePage";
import Settings from "./src/pages/Settings";
import About from "./src/pages/About";
import firebase from "react-native-firebase";

// Set up Firebase
firebase.perf().setPerformanceCollectionEnabled(true);
firebase.admob().initialize("ca-app-pub-3940256099942544~3347511713");

const App = createDrawerNavigator({
  Play: {
    screen: HomePage
  },
  Settings: {
    screen: Settings
  },
  About: {
    screen: About
  }
});

export default App;
