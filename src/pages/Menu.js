import React from "react";
import NavigationContext from "../components/NavigationContext";
import {
  Text,
  View,
  Button as ReactButton,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/analytics';
import { strings } from "../config";
import URL from "../components/Link";

const blankFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const Button = (props) => (
  <TouchableOpacity style={{ height: 50 }} {...props}>
    <View style={{
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: "#f2f2f2",
      paddingLeft: 15,
      borderTopColor: "grey",
      borderTopWidth: 1,
      borderBottomColor: "grey",
      borderBottomWidth: 1,
      flexDirection: 'row',
    }}>
      <View style={{ flex: 1, paddingTop: 5 }}>
        <Text style={{ fontSize: 18 }}>{props.title}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{
          textAlign: "right",
          fontSize: 26,
          paddingRight: 20
        }}>></Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default class Menu extends React.Component<Props> {
  static navigationOptions = {
    title: "Menu",
    header: null,
    drawerLabel: () => <View></View>,
    drawerLockMode: 'locked-closed',
    headerLeft: null,

  };

  componentDidMount() {
    firebase.analytics().logEvent(`open_menu_page`);
  }

  switchGameMode(mode, selectModeMethod, restartGame) {
    if (mode !== 'resume' && mode !== 'puzzles') restartGame();

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
      case 'puzzles':
        this.props.navigation.navigate("Puzzles");
        break;
      case 'resume':
        firebase.analytics().logEvent('menu_resume');
        break;
      default:
        selectModeMethod(null);
        firebase.analytics().logEvent('start_singleplayer');
        break;
    }

    if (mode !== 'puzzles') this.props.navigation.navigate("Play");
  }

  render() {
    return (
      <NavigationContext.Consumer>
        {data => {
          const {
            lang,
            selectMode,
            restartGame,
            game,
            self: appCtx
          } = data;

          return (
            <View>
              <StatusBar hidden={true} />
              <View>
                <ScrollView>
                  <Text style={styles.text}>RSG Chess</Text>
                  <Text style={styles.desc}>
                    {strings.singleplayerDescription[lang]}
                  </Text>
                  {
                    ((game.FEN != blankFEN || !!appCtx.state.playAgainstAI) && !appCtx.state.checkmate) &&
                    <View style={styles.buttonContainer}>
                      <Button
                        title={strings.resume[lang]}
                        onPress={() => this.switchGameMode('resume', selectMode, restartGame)}
                      />
                    </View>
                  }
                  <View style={styles.buttonContainer}>
                    <Button
                      title={strings.singleplayer[lang]}
                      onPress={() => this.switchGameMode('start_singleplayer', selectMode, restartGame)}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      title={strings.puzzles[lang]}
                      // onPress={() => this.switchGameMode('puzzles', selectMode, restartGame)}
                    />
                  </View>
                  <Text style={styles.desc}>{strings.playAgainstAI[lang]}</Text>
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
                  <View style={styles.buttonContainer}>
                    <Button
                      title={strings.hard[lang]}
                      onPress={() => this.switchGameMode('start_easy_AI', selectMode, restartGame)}
                    />
                  </View>
                  <Text style={styles.desc}>{strings.settings[lang]}</Text>
                  <View style={styles.buttonContainer}>
                    <Button
                      title={strings.settings[lang]}
                      onPress={() => this.props.navigation.navigate("Settings")}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      title={strings.privacy[lang]}
                      onPress={() => this.props.navigation.navigate("Privacy")}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', margin: 8, marginTop: 4 }}>
                    <Text>
                      Project by Radostin Cholakov.{' '}
                    </Text>
                    <URL title='Donate' url='https://paypal.me/RSGChess' />
                  </View>
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
  desc: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 2,
    marginTop: 2
  },
  mainContainer: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  text: {
    fontSize: 26,
    color: "black",
    marginLeft: 8,
    marginTop: 12,
    marginBottom: 10
  },
  buttonContainer: {
    marginLeft: 8,
    marginRight: 8
  }
});