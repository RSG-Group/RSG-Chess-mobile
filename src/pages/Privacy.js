import React, { Component } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import CheckmateSnackBar from "../components/CheckmateSnackBar";
import firebase from "react-native-firebase";
import { strings, globalStyles } from "../config";
import NavigationContext from "../components/NavigationContext";
import URL from "../components/Link";

export default class Privacy extends Component<Props> {
  static navigationOptions = {
    title: "Privacy Policy",
    header: null,
    drawerLabel: () => (
      <NavigationContext.Consumer>
        {data => {
          return (
            <Text style={globalStyles.drawerItemLabel}>
              {strings.privacy[data.lang]}
            </Text>
          );
        }}
      </NavigationContext.Consumer>
    )
  };

  componentDidMount() {
    firebase.analytics().logEvent(`open_policy`);
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("Play");
  };

  render() {
    const url = "https://rsg-chess.now.sh/privacy_policy.html";
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
                <View style={styles.policyContainer}>
                  <View style={styles.titleRow}>
                    <View style={styles.backButton}>
                      <Button onPress={this.backButtonHandler} title="Back" />
                    </View>
                    <Text style={styles.title}>Privacy Policy</Text>
                  </View>

                  <Text>This sprivacy policy is also published on:</Text>
                  <URL title={url} url={url} />
                  <Text>
                    {`\n`}
                    If any updates or changes to the policy occur, we will
                    update the website version and roll out new app release
                    within 5-7 days.
                    {`\n\n`}
                    The RSG Chess app is built as an Open Source app. This
                    SERVICE is provided by at no cost and is intended for use as
                    is. This page is used to inform visitors regarding my
                    policies with the collection, use, and disclosure of
                    Personal Information if anyone decided to use my Service.{" "}
                    {`\n\n`}
                    If you choose to use my Service, then you agree to the
                    collection and use of information in relation to this
                    policy. The Personal Information that I collect is used for
                    providing and improving the Service. I will not use or share
                    your information with anyone except as described in this
                    Privacy Policy. {`\n\n`}
                    The terms used in this Privacy Policy have the same meanings
                    as in our Terms and Conditions, which is accessible at RSG
                    Chess unless otherwise defined in this Privacy Policy.
                    {`\n\n`}
                  </Text>

                  <Text style={styles.subtitle}>
                    Information Collection and Use {`\n`}
                  </Text>

                  <Text>
                    For a better experience, while using our Service, I may
                    require you to provide us with certain personally
                    identifiable information, including but not limited to:
                    Firebase Analytics information, performance monitoring,
                    crash analysis via Crashlytics by Fabric and advertising
                    activity via AdMob by Google Ads . The information that I
                    request will be retained on your device and is not collected
                    by me in any way. {`\n\n`}
                    The app does use third party services that may collect
                    information used to identify you. Links to privacy policy of
                    third party service providers used by the app:
                    {`\n`}
                    {`\n`}
                  </Text>
                  <View style={{ marginLeft: 10 }}>
                    <URL
                      title={"Google Play Services"}
                      url={"https://policies.google.com/privacy"}
                    />
                    <URL
                      title={"AdMob"}
                      url={
                        "https://support.google.com/admob/answer/6128543?hl=en"
                      }
                    />
                    <URL
                      title={"Firebase Analytics"}
                      url={"https://firebase.google.com/policies/analytics/"}
                    />
                    <URL title={"Fabric"} url={"https://fabric.io/privacy"} />
                    <URL
                      title={"Crashlytics"}
                      url={
                        "http://try.crashlytics.com/terms/privacy-policy.pdf"
                      }
                    />
                  </View>
                </View>

                <Text style={styles.subtitle}>
                  {`\n`}
                  Log Data
                  {`\n`}
                </Text>

                <Text>
                  I want to inform you that whenever you use my Service, in a
                  case of an error in the app I collect data and information
                  (through third party products) on your phone called Log Data.{" "}
                  {`\n`}
                  This Log Data may include information such as your device
                  Internet Protocol (“IP”) address, device name, operating
                  system version, the configuration of the app when utilizing my
                  Service, the time and date of your use of the Service, and
                  other statistics. {`\n\n`}
                </Text>

                <Text style={styles.subtitle}>Cookies {`\n`}</Text>

                <Text>
                  Cookies are files with a small amount of data that are
                  commonly used as anonymous unique identifiers. These are sent
                  to your browser from the websites that you visit and are
                  stored on your device's internal memory. {`\n\n`}
                  This Service does not use these “cookies” explicitly. However,
                  the app may use third party code and libraries that use
                  “cookies” to collect information and improve their services.{" "}
                  {`\n`} You have the option to either accept or refuse these
                  cookies and know when a cookie is being sent to your device.
                  If you choose to refuse our cookies, you may not be able to
                  use some portions of this Service. {`\n\n`}
                </Text>

                <Text style={styles.subtitle}>Service Providers {`\n`}</Text>

                <Text>
                  I may employ third-party companies and individuals due to the
                  following reasons: provide the Service on our behalf, to
                  perform Service-related services; or to assist us in analyzing
                  how our Service is used. I want to inform users of this
                  Service that these third parties have access to your Personal
                  Information. The reason is to perform the tasks assigned to
                  them on our behalf. However, they are obligated not to
                  disclose or use the information for any other purpose.{" "}
                  {`\n\n`}I value your trust in providing us your Personal
                  Information, thus we are striving to use commercially
                  acceptable means of protecting it. But remember that no method
                  of transmission over the internet, or method of electronic
                  storage is 100% secure and reliable, and I cannot guarantee
                  its absolute security.
                  {`\n\n`}
                  This Service may contain links to other sites. If you click on
                  a third-party link, you will be directed to that site. Note
                  that these external sites are not operated by me. Therefore, I
                  strongly advise you to review the Privacy Policy of these
                  websites. I have no control over and assume no responsibility
                  for the content, privacy policies, or practices of any
                  third-party sites or services. {`\n\n`}
                </Text>
                <Text style={styles.subtitle}>
                  Children’s Privacy
                  {`\n`}
                </Text>
                <Text>
                  These Services do not address anyone under the age of 13. I do
                  not knowingly collect personally identifiable information from
                  children under 13. In the case I discover that a child under
                  13 has provided me with personal information, I immediately
                  delete this from our servers. If you are a parent or guardian
                  and you are aware that your child has provided us with
                  personal information, please contact me so that I will be able
                  to do necessary actions.
                  {`\n\n`}
                </Text>
                <Text style={styles.subtitle}>
                  Changes to This Privacy Policy
                  {`\n`}
                </Text>
                <Text>
                  I may update our Privacy Policy from time to time. Thus, you
                  are advised to review this page periodically for any changes.
                  I will notify you of any changes by posting the new Privacy
                  Policy on this page. These changes are effective immediately
                  after they are posted on this page.
                  {`\n\n`}
                </Text>
                <Text style={styles.subtitle}>
                  Contact Us
                  {`\n`}
                </Text>
                <Text>
                  If you have any questions or suggestions about my Privacy
                  Policy, do not hesitate to contact us on
                  rsg.group.here@gmail.com
                </Text>
                <Text>{`\n\n`}</Text>
              </ScrollView>
            );
          }}
        </NavigationContext.Consumer>
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
  },
  title: {
    fontSize: 30
  },
  titleRow: {
    flexDirection: "row",
    padding: 1
  },
  subtitle: {
    fontSize: 20
  },
  policyContainer: {
    marginLeft: 7,
  },
  backButton: {
    width: 75,
    height: 50,
    borderRadius: 100 / 10,
    alignSelf: "flex-start",
    marginRight: 15,
    top: 7
  }
});
