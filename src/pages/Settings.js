import React, { Component } from "react";
import { Platform, View, Text } from "react-native";
import firebase from "react-native-firebase";

export default class HomePage extends Component<Props> {
  static navigationOptions = { title: "RSG Chess Settings" };

  constructor() {
    super();
    this.Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    this.request = new AdRequest();
    this.request.addKeyword("foobar");
  }

  render() {
    const { Banner, request } = this;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View>
          <Text>Settings</Text>
        </View>
        <View style={{ height: 100 }}>
          <Banner
            size={"SMART_BANNER"}
            request={request.build()}
            unitId={"ca-app-pub-3522556458609123/4507746605"}
            onAdLoaded={() => {}}
          />
        </View>
      </View>
    );
  }
}
