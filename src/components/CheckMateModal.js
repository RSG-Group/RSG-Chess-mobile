import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet
} from "react-native";
import Modal from "react-native-modal";
import { strings } from "../config";

const renderCheckmateModal = (checkmate, lang, exitCallback, hideCallback) => {
  return (
    <Modal
      isVisible={!!checkmate}
      backdropColor={"rgba(0, 0, 0, 0.5)"}
      backdropOpacity={1}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      onSwipe={hideCallback}
      onBackdropPress={hideCallback}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.text}>
          {checkmate !== "D"
            ? checkmate === "W"
              ? strings.blackWon[lang]
              : strings.whiteWon[lang]
            : strings.draw[lang]}
        </Text>
        <Text>{`\n`}</Text>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}>
            <Button title={strings.newGame[lang]} onPress={exitCallback} />
          </View>
          <Text>{`   `}</Text>
          <View style={{ flex: 1 }}>
            <Button title={strings.hideThis[lang]} onPress={hideCallback} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  text: {
    fontSize: 22
  }
});

export default renderCheckmateModal;
