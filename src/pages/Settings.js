import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  ScrollView,
  Dimensions,
  Button
} from "react-native";
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
import NavigationContext from "../components/NavigationContext";
import { possiblePalettes } from "../config";

export default class HomePage extends Component<Props> {
  static navigationOptions = {
    title: "Settings"
  };

  constructor() {
    super();
    this.Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    this.request = new AdRequest();

    this.state = {
      showValidMoves: true
    };
  }

  componentDidMount() {
    firebase.analytics().logEvent(`open_settings`);
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
        <NavigationContext.Consumer>
          {data => {
            const {
              lang,
              updateLang,
              updatePalette,
              handleReplay,
              palette,
              setRotation,
              rotated
            } = data;
            return (
              <React.Fragment>
                <ScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{
                    // flex: 1,
                    width: Dimensions.get("window").width,
                    backgroundColor: "white"
                  }}
                >
                  <View style={{ height: 5 }} />
                  <SettingsCategoryHeader title={"Personalize"} />
                  <SettingsTextLabel title="Set your preferences which will be kept even after you restart the app." />
                  <SettingsDividerShort containerStyle={{ height: 2 }} />

                  <SettingsPicker
                    title="Language"
                    dialogDescription="Choose which language do you prefer.."
                    possibleValues={[
                      { label: "English", value: "en" },
                      { label: "Български", value: "bg" },
                      { label: "Руский", value: "ru" }
                    ]}
                    negativeButtonTitle={"Cancel"}
                    positiveButtonTitle={"Okay"}
                    onSaveValue={value => {
                      updateLang(value);
                    }}
                    value={lang}
                  />

                  <SettingsDividerShort />

                  <SettingsPicker
                    title="Color palettes"
                    dialogDescription="Choose one of our color palettes."
                    possibleValues={possiblePalettes()}
                    negativeButtonTitle={"Cancel"}
                    positiveButtonTitle={"Okay"}
                    onSaveValue={value => {
                      updatePalette(value);
                    }}
                    value={palette}
                  />

                  <SettingsDividerShort />

                  <SettingsSwitch
                    title={"Show valid moves on the board."}
                    onSaveValue={value => {
                      this.setState({
                        showValidMoves: value
                      });
                    }}
                    value={this.state.showValidMoves}
                  />

                  <SettingsDividerLong />

                  <SettingsCategoryHeader title={"Game options"} />
                  <SettingsTextLabel title="These settings are session-only. If you restart the app they won't be saved!" />
                  <SettingsDividerShort containerStyle={{ height: 2 }} />

                  <SettingsSwitch
                    title={"Rotate the black pieces."}
                    onSaveValue={setRotation}
                    value={rotated}
                  />

                  <SettingsTextLabel
                    containerStyle={{ width: "75%", marginTop: -10 }}
                    titleStyle={{ paddingTop: 0, fontSize: 12 }}
                    title="Rotate the pieces for better experience, especially if you're two players on the device"
                  />

                  <SettingsDividerLong />
                  <SettingsCategoryHeader title={"Fast actions"} />

                  <View
                    style={{
                      padding: 16,
                      paddingLeft: 16,
                      paddingTop: 8,
                      paddingBottom: 4
                    }}
                  >
                    <Button
                      onPress={() => {
                        handleReplay();
                        this.props.navigation.navigate("Play");
                      }}
                      title="New Game"
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        padding: 16,
                        paddingLeft: 16,
                        paddingTop: 8,
                        paddingBottom: 4,
                        width: "50%"
                      }}
                    >
                      <Button
                        onPress={() => {
                          this.props.navigation.navigate("About");
                        }}
                        title="About RSG Chess"
                      />
                    </View>
                    <View
                      style={{
                        padding: 16,
                        paddingLeft: 16,
                        paddingTop: 8,
                        paddingBottom: 4,
                        width: "50%"
                      }}
                    >
                      <Button
                        onPress={() => {
                          // firebase
                          //   .analytics()
                          //   .logEvent(`toggle_how-to-play_action`);
                        }}
                        title="How to play?"
                      />
                    </View>
                  </View>
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
              </React.Fragment>
            );
          }}
        </NavigationContext.Consumer>
      </View>
    );
  }
}
