import React, { Component } from "react";
import { Platform, View, Text, ScrollView, Dimensions } from "react-native";
import firebase from "react-native-firebase";
import CheckmateSnackBar from "../components/CheckmateSnackBar";
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker,
  SettingsTextLabel
} from "react-native-settings-components";

export default class HomePage extends Component<Props> {
  static navigationOptions = {
    title: "Settings"
  };

  constructor() {
    super();
    this.Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    this.request = new AdRequest();
    this.request.addKeyword("foobar");

    this.state = {
      palette: "default"
    };
  }

  render() {
    const { Banner, request } = this;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            width: Dimensions.get("window").width - 20
          }}
        >
          <SettingsCategoryHeader title={"Personalize"} />
          <SettingsTextLabel title="Note that these settings are session-only. If you restart the app they won't be saved!" />
          <SettingsDividerShort android={true} />
          <SettingsPicker
            title="Color palettes"
            dialogDescription="Choose one of our color palettes."
            possibleValues={[
              { label: "default", value: "default" },
              { label: "blue", value: "blue" },
              { label: "pink", value: "pink" }
            ]}
            negativeButtonTitle={"Cancel"}
            positiveButtonTitle={"Okay"}
            onSaveValue={value => {
              this.setState({
                palette: value
              });
            }}
            value={this.state.palette}
          />
        </ScrollView>
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
