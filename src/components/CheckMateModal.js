import React, { Component } from "react";
import { Platform, Text, View, TouchableOpacity, Button } from "react-native";
import Modal from "react-native-modal";
import { strings } from "../scripts/config";

export const renderCheckmateModal = (checkmate, exitCallback) => {
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
      onSwipe={exitCallback}
      onBackdropPress={exitCallback}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 22,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          borderColor: "rgba(0, 0, 0, 0.1)"
        }}
      >
        <Text>
          {checkmate !== "D"
            ? checkmate === "W"
              ? strings.blackWon['bg']
              : strings.whiteWon['bg']
            : strings.draw['bg']}
          {"\n\n\n"}
        </Text>
        <Button title="Close" onPress={exitCallback} />
      </View>
    </Modal>
  );
};
