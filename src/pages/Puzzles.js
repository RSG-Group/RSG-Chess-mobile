import React, { Component } from "react";
import { View } from "react-native";
import firebase from "react-native-firebase";
import NavigationContext from "../components/NavigationContext";

export default class Puzzles extends Component<Props> {
  static navigationOptions = {
    title: "Puzzles",
    header: null,
    drawerLabel: () => <View></View>
  };

  componentDidMount() {
    firebase.analytics().logEvent(`puzzles_page`);
  }

  render() {
    return (
      <View>
        <Text>123</Text>
        <NavigationContext.Consumer>
          {data => {}}
        </NavigationContext.Consumer>
      </View>
    );
  }
}
