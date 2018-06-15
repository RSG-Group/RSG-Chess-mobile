import React, { Component } from "react";
import { Platform, View, Text } from "react-native";
import CheckmateSnackBar from "../components/CheckmateSnackBar";
import firebase from "react-native-firebase";

export default class HomePage extends Component<Props> {
  static navigationOptions = {
    title: "About"
  };

  constructor() {
    super();
    this.Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    this.request = new AdRequest();
  }

  componentDidMount() {
    firebase.analytics().logEvent(`open_about_page`);
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
        <View style={{ flex: 1 }}>
          <Text>About</Text>
        </View>
        <View style={{ height: 52 }}>
          <Banner
            size={"SMART_BANNER"}
            request={request.build()}
            unitId={"ca-app-pub-3522556458609123/4507746605"}
            onAdLoaded={() => {}}
          />
        </View>
        <CheckmateSnackBar navigate={this.props.navigation.navigate} />
      </View>
    );
  }
}
