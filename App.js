/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Game } from 'rsg-chess';

type Props = {};
export default class App extends Component<Props> {
  render() {
    // set up game configuration for some testing
    const game = Game.prototype.initializeGame();

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome! This is RSG Chess Native.
        </Text>
        <Text style={styles.instructions}>
          The future of RSG Chess, built by React Native... {`\n`}
          Let's ensure our API is working with React Native, too. If you see standard FEN string everything is working fine.
          If not - send feedback on `rsg.group.here@gmail.com` {`\n\n`}
          {game.FEN}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 17.5,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
