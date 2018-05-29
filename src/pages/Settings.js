import React, { Component } from "react";
import { Platform, View, Text } from "react-native";

export default class HomePage extends Component<Props> {
  static navigationOptions = { title: "RSG Chess Settings" };

  render() {
    return (
      <View>
        <Text>Settings</Text>
      </View>
    );
  }
}
