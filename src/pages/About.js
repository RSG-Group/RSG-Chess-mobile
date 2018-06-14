import React, { Component } from "react";
import { Platform, View, Text } from "react-native";
import CheckmateSnackBar from "../components/CheckmateSnackBar";
import firebase from "react-native-firebase";

export default class HomePage extends Component<Props> {
  static navigationOptions = {
    title: "About"
  };

  componentDidMount () {
    firebase.analytics().logEvent(`open_about_page`);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>About</Text>
        <CheckmateSnackBar navigate={this.props.navigation.navigate} />
      </View>
    );
  }
}
