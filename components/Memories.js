import { View, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated } from "react-native";
import useInterval from "./../hooks/useInterval";
import useSound from "./../hooks/useSound";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

export default function Memories({ route, navigation }) {
  const images = route.params;

  const animation = {
    moveImage: new Animated.Value(0),
    fadeImage: new Animated.Value(0),
    savleImage: new Animated.Value(0),
  };
  const [image, setImage] = useState("");
  const [count, setCount] = useState(0);
  const [isShow, setIsShow] = useState("none");

  let aniArr = [
    {
      key: 0,
      id: "moveImage",
      ani: { transform: [{ translateY: animation.moveImage }] },
    },
    { key: 1, id: "fadeImage", ani: { opacity: animation.fadeImage } },
    {
      key: 2,
      id: "scaleImage",
      ani: { transform: [{ scale: animation.savleImage }] },
    },
  ];
  const [aniStyles, setAniStyles] = useState("");

  let soundObject = new Audio.Sound();

  // gunhee todo
  // 1. 애니메이션 랜덤
  // 2. 랜덤 노래 ok
  // 3. 화면 녹화로 동영상 제작
  // 4. 추가한 이미지 삭제 ok
  // 5. 이미지 드래그로 위치 옮기기
  // 5. 로컬스토리지로 사용법 알려주기

  const moveImage = () => {
    Animated.timing(animation.moveImage, {
      toValue: 250,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const fadeImage = () => {
    Animated.timing(animation.fadeImage, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const scaleImage = () => {
    Animated.timing(animation.savleImage, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const animationStart = (id) => {
    if (id === "moveImage") {
      moveImage();
    } else if (id === "fadeImage") {
      fadeImage();
    } else if (id === "scaleImage") {
      scaleImage();
    }
  };

  useEffect(() => {
    // aniArr.sort(() => Math.random() - 0.5);
  }, []);

  useSound(soundObject);

  useInterval(
    () => {
      setCount((count) => ++count);

      setImage(images[count]);
      setAniStyles(aniArr[count].ani);
      animationStart(aniArr[count].id);
    },
    images.length > count ? 3000 : null
  );

  useInterval(
    () => {
      setIsShow("");
    },
    images.length <= count ? 4000 : null
  );

  return (
    <>
      <Animated.View style={aniStyles}>
        <StatusBar style="auto" hidden />
        <Ionicons
          style={dynamicBtn(isShow).closeBtn}
          name="ios-close"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Making Memories")}
        />
        <Image style={styles.image} source={{ uri: image.uri }} />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
});

const dynamicBtn = (isShow) =>
  StyleSheet.create({
    closeBtn: {
      zIndex: 10,
      position: "absolute",
      paddingTop: 20,
      paddingLeft: 20,
      display: isShow,
    },
  });
