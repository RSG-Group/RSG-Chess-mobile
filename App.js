import React from "react";
import { NativeModules } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import firebase from "react-native-firebase";
import includes from "lodash/includes";

import { strings } from "./src/config";
import HomePage from "./src/pages/HomePage";
import Settings from "./src/pages/Settings";
import About from "./src/pages/About";

// Set up Firebase
firebase.perf().setPerformanceCollectionEnabled(true);
firebase.admob().initialize("ca-app-pub-3940256099942544~3347511713");

let language = NativeModules.I18nManager.localeIdentifier.split(`_`)[0];
const supportedLangs = Object.keys(strings.languages);
if (!includes(supportedLangs, language)) language = "en";

const App = createDrawerNavigator({
  Play: {
    screen: () => <HomePage lang={language} />
  },
  Settings: {
    screen: Settings
  },
  About: {
    screen: About
  }
});

export default App;
