import React, { Component } from "react";
import { Platform, View, ScrollView, Text, Button } from "react-native";
import CheckmateSnackBar from "../components/CheckmateSnackBar";
import firebase from "react-native-firebase";
import { strings } from "../config";
import NavigationContext from "../components/NavigationContext";
import renderHowToPlayModal from "../components/HowToPlayModal";

export default class HomePage extends Component<Props> {
  static navigationOptions = {
    title: "About"
  };

  state = {
    howToPlay: false
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
    let howToPlay =
      (this.props.navigation &&
        this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.howToPlay) ||
      this.state.howToPlay;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <NavigationContext.Consumer>
          {data => {
            const { lang } = data;
            {
              /* if (lang === "bg") request.addKeyword("Bulgaria");
            if (lang === "ru") request.addKeyword("Russia"); */
            }
            return (
              <ScrollView style={{ flex: 1, padding: 7 }}>
                <Text style={{ textAlign: "center" }}>
                  {strings.about.initial[lang]}
                </Text>
                {renderHowToPlayModal(howToPlay, lang, () => {
                  this.setState({ howToPlay: false });
                  if (
                    this.props.navigation &&
                    this.props.navigation.state &&
                    this.props.navigation.state.params
                  )
                    this.props.navigation.state.params.howToPlay = false;
                })}
              </ScrollView>
            );
          }}
        </NavigationContext.Consumer>
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
