import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";

const MenuIcon = ({ navigation, palette }) => (
  <TouchableHighlight
    style={[styles.container, { backgroundColor: palette.props.blackCells }]}
    underlayColor={palette.props.blackCells}
    activeOpacity={0.5}
    onPress={() => {
      navigation.toggleDrawer();
    }}
    onLongPress={() => {
      navigation.navigate("Settings");
    }}
  >
    <View>
      <View style={styles.line} />
      <View style={styles.line} />
      <View style={styles.line} />
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 35,
    top: 7,
    left: 7,
    padding: 7,
    borderRadius: 100 / 10,
    position: "absolute",
    alignSelf: "flex-start"
  },
  line: { backgroundColor: "white", width: 25, height: 4, marginBottom: 4 }
});

export default MenuIcon;
