import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { ImageViewer } from "./ImageViewer";
import { Ionicons } from "@expo/vector-icons";

export default function Main({ navigation }) {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(false);

  const addPhoto = async () => {
    if (images.length >= 20) {
      alert("사진은 20장까지 고를 수 있습니다.");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        // allowsEditing: true,   // 사진 편집
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 20,
        quality: 2,
      });

      result.assets.map((e) => (e.selected = false));
      if (images.length !== 0) {
        setImages((data) => [...data, ...result.assets]);
      } else {
        setImages(result.assets);
      }
    }
  };

  const changeSeleted = (e) => {
    let newData = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i].assetId === e.assetId) {
        images[i].selected = !images[i].selected;
      }
      newData.push(images[i]);
    }
    setImages(newData);
  };

  const deleteImage = (e) => {
    let newData = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i] !== e) {
        newData.push(images[i]);
      }
    }
    setImages(newData);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.blank} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.photoBox} onPress={addPhoto}>
          <MaterialIcons name="photo-camera" size={120} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.viewer}>
          {images.length !== 0 &&
            images.map((e, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={1}
                style={styles.imageArea}
                onPress={() => changeSeleted(e)}
                // onLongPress={drag}
              >
                <ImageViewer selectedImage={e} style={styles.imageViewer} />
                <Ionicons
                  name="ios-close-circle-outline"
                  size={24}
                  color="red"
                  style={dynamicBtn(e.selected).deleteBtn}
                  onPress={() => deleteImage(e)}
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {images.length !== 0 && (
        <View style={styles.makBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Memories", images)}
          >
            <Text style={styles.font}>만들기</Text>
          </TouchableOpacity>
        </View>
      )}
      {images.length === 0 && <View style={styles.blackBtn}></View>}
    </View>
  );
}

const dynamicBtn = (selected) =>
  StyleSheet.create({
    deleteBtn: {
      zIndex: 100,
      position: "absolute",
      display: selected ? "" : "none",
      right: 0,
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  blank: {
    flex: 0.1,
  },
  header: {
    flex: 0.2,
    flexDirection: "row",
  },
  photoBox: {
    borderWidth: 1,
    flex: 0.4,
    height: "100%",
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    marginTop: 30,
    flex: 0.6,
  },
  viewer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageStyles: {
    flexDirection: "row",
  },
  imageArea: {
    zIndex: 1,
  },
  imageViewer: {
    zIndex: 0,
    position: "relative",
  },
  makBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    flexDirection: "row",
    flex: 0.1,
  },
  blackBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    flex: 0.1,
  },
  font: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    paddingBottom: 30,
  },
});
