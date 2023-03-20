import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";

export const ImageViewer = ({ image, changeSeleted, deleteImage }) => {
  const WINDOW_WIDTH = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.imageArea}
      onPress={() => changeSeleted(image)}
      onLongPress={() => console.log("드래그")}
    >
      <View style={stylesImage(WINDOW_WIDTH).imageBox}>
        <Image source={{ uri: image.uri }} style={styles.image} />
      </View>
      <Ionicons
        name="ios-close-circle-outline"
        size={24}
        color="red"
        style={dynamicBtn(image.selected).deleteBtn}
        onPress={() => deleteImage(image)}
      />
    </TouchableOpacity>
  );
};

const dynamicBtn = (selected) =>
  StyleSheet.create({
    deleteBtn: {
      zIndex: 100,
      position: "absolute",
      opacity: selected ? 1 : 0,
      right: 0,
    },
  });

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },

  imageArea: {
    zIndex: 1,
  },
});

const stylesImage = (width) =>
  StyleSheet.create({
    imageBox: {
      padding: 1,
      width: width / 4,
      height: width / 4,
    },
  });
