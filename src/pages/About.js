import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import CheckmateSnackBar from "../components/CheckmateSnackBar";
import firebase from "react-native-firebase";
import { strings, globalStyles } from "../config";
import { adsHeight } from "../scripts/getSizes";
import NavigationContext from "../components/NavigationContext";

export default class About extends Component<Props> {
  static navigationOptions = {
    title: "About",
    header: null,
    drawerLabel: () => (
      <NavigationContext.Consumer>
        {data => {
          return (
            <Text style={globalStyles.drawerItemLabel}>
              {strings.about.label[data.lang]}
            </Text>
          );
        }}
      </NavigationContext.Consumer>
    )
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
        <NavigationContext.Consumer>
          {data => {
            return (
              <ScrollView style={styles.scrollView}>
                <Text style={{ textAlign: "center" }}>
                  {strings.about.initial[data.lang]}
                </Text>
              </ScrollView>
            );
          }}
        </NavigationContext.Consumer>
        <View
          style={{
            height: adsHeight(Dimensions.get("window").height),
            backgroundColor: "#dfdfdf"
          }}
        >
          <Banner
            size={"SMART_BANNER"}
            request={request.build()}
            unitId={"ca-app-pub-3522556458609123/1635938542"}
            onAdLoaded={() => {}}
          />
        </View>
        <CheckmateSnackBar navigate={this.props.navigation.navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 5,
    paddingTop: 15
  }
});
