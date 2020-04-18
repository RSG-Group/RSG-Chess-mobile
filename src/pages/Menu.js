import React from "react";
import NavigationContext from "../components/NavigationContext";
import {
  Text,
  View,
  Button,
  ScrollView,
  StatusBar,
  StyleSheet
} from "react-native";
import firebase from "react-native-firebase";
import { strings, colorPalettes, globalStyles } from "../config";

export default class Menu extends React.Component<Props> {
  static navigationOptions = {
    title: "Menu",
    header: null,
    drawerLabel: () => <View></View>,
    drawerLockMode: 'locked-closed'
  };

  componentDidMount() {
    firebase.analytics().logEvent(`open_menu_page`);
  }

  switchGameMode(mode, selectModeMethod, restartGame) {
    restartGame();

    switch (mode) {
      case 'start_singleplayer':
        selectModeMethod(null);
        firebase.analytics().logEvent('start_singleplayer');
        break;
      case 'start_easy_AI':
        selectModeMethod({ depth: 2 });
        firebase.analytics().logEvent('start_easy_AI');
        break;
      case 'start_medium_AI':
        selectModeMethod({ depth: 3 });
        firebase.analytics().logEvent('start_medium_AI');
        break;
      case 'start_hard_AI':
        selectModeMethod({ depth: 4 });
        firebase.analytics().logEvent('start_hard_AI');
        break;
    }

    this.props.navigation.navigate("Play");
  }

  render() {
    return (
      <NavigationContext.Consumer>
        {data => {
          const {
            lang,
            selectMode,
            restartGame
          } = data;

          return (
            <View>
              <StatusBar hidden={true} />
              <View>
                <ScrollView>
                  <Text style={styles.text}>{strings.selectMode[lang]}</Text>
                  <Text style={{ margin: 4 }}>
                    {strings.singleplayerDescription[lang]}
                  </Text>
                  <View style={{ margin: 4 }}>
                    <Button
                      title={strings.singleplayer[lang]}
                      onPress={() => this.switchGameMode('start_singleplayer', selectMode, restartGame)}
                    />
                  </View>
                  <Text style={{ margin: 4 }}>{strings.playAgainstAI[lang]}</Text>
                  <View style={styles.optionsRow}>
                    <View style={styles.buttonContainer}>
                      <Button
                        title={strings.easy[lang]}
                        onPress={() => this.switchGameMode('start_easy_AI', selectMode, restartGame)}
                      />
                    </View>
                    <View style={styles.buttonContainer}>
                      <Button
                        title={strings.medium[lang]}
                        onPress={() => this.switchGameMode('start_easy_AI', selectMode, restartGame)}
                      />
                    </View>
                  </View>
                  <View style={{ margin: 2 }}>
                    <Button
                      title={strings.hard[lang]}
                      onPress={() => this.switchGameMode('start_easy_AI', selectMode, restartGame)}
                    />
                  </View>
                  <Text style={styles.warningText}>
                    {strings.hardModeWarning[lang]}
                  </Text>
                </ScrollView>
              </View>
            </View>
          );
        }}
      </NavigationContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 6
  },
  optionsRow: {
    flexDirection: "row",
    padding: 1
  },
  buttonContainer: {
    flex: 1,
    margin: 2
  },
  warningText: {
    margin: 4,
    color: "orange",
    fontStyle: "italic"
  }
});