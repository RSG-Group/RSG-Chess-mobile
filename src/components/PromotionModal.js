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

const renderPromotionModal = (promotionParams, lang, promotionCallback) => {
  return (
    <Modal
      isVisible={!!promotionParams}
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropOpacity={1}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      onBackdropPress={() => {
        promotionCallback("queen");
      }}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.text}>{strings.promotePawn[lang]}</Text>
        <Text>{`\n`}</Text>
        <View style={styles.optionsRow}>
          <View style={styles.buttonContainer}>
            <Button
              title={strings.pieces.knight[lang]}
              onPress={() => {
                promotionCallback("knight");
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={strings.pieces.rook[lang]}
              onPress={() => {
                promotionCallback("rook");
              }}
            />
          </View>
        </View>
        <View style={styles.optionsRow}>
          <View style={styles.buttonContainer}>
            <Button
              title={strings.pieces.bishop[lang]}
              onPress={() => {
                promotionCallback("bishop");
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={strings.pieces.queen[lang]}
              onPress={() => {
                promotionCallback("queen");
              }}
            />
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
  text: {
    fontSize: 18,
    textAlign: "center"
  },
  optionsRow: {
    flexDirection: "row",
    padding: 1
  },
  buttonContainer: {
    flex: 1,
    margin: 2
  }
});

export default renderPromotionModal;
