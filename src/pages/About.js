import React, { Component } from "react";
import { Platform, View, Text } from "react-native";

export default class HomePage extends Component<Props> {
  static navigationOptions = {
    title: "About"
  };

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
      </View>
    );
  }
}
