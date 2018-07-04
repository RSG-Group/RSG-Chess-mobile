import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const MenuIcon = ({ navigation, palette }) => (
  <View
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      alignSelf: "flex-start"
    }}
  >
    <Icon
      reverse
      name="md-menu"
      type="ionicon"
      color={palette.props.blackCells}
      onPress={() => {
        navigation.toggleDrawer();
      }}
      onLongPress={() => {
        navigation.navigate("Settings");
      }}
      size={18}
    />
  </View>
);

export default MenuIcon;
