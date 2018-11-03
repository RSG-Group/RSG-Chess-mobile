import React from "react";
import { TouchableOpacity, View, Text, Linking } from "react-native";

export default class LinkButton extends React.Component {
  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        ToastAndroid.show(
          "Cannot open the link. Try accessing it with your PC browser.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
    });
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View>
          <Text style={{ color: "blue", textDecorationLine: "underline" }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
