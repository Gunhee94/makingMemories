import { View, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated } from "react-native";
import useInterval from "./../hooks/useInterval";

export default function Memories({ route }) {
  const images = route.params;
  const [selectedImages, setSelectedImages] = useState(images.uri);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [aniNum, setAniNum] = useState(0);
  const [image, setImage] = useState(selectedImages[0]);
  const [aniId, setAniId] = useState("");
  const [count, setCount] = useState(0);

  let animationList = [
    {
      id: "moveImage",
      action: Animated.timing(animation, {
        toValue: 250,
        duration: 2000,
        useNativeDriver: true,
      }),
    },
    {
      id: "fadeInImage",
      action: Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    },
    {
      id: "scaleImage",
      action: Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    },
  ];

  useEffect(() => {
    animationList.sort(() => Math.random() - 0.5);

    animationList[aniNum].action.start;
    console.log("몇번", animationList[aniNum].action);
  }, [aniNum]);

  useInterval(
    () => {
      setCount((count) => count + 1);
      setAniNum((aniNum) => aniNum + 1);
      setImage(selectedImages[aniNum]);
      setAniId(animationList[aniNum].id);
    },
    selectedImages.length > count ? 2000 : null
  );

  console.log("뭐야", count, aniNum, aniId);
  return (
    <Animated.View style={stylesAnimation(animation).aniId}>
      <StatusBar style="auto" hidden />
      <Image source={{ uri: image }} style={styles.image} />
    </Animated.View>
  );
}

const stylesAnimation = (animation) =>
  StyleSheet.create({
    moveImage: {
      transform: [{ translateY: animation }],
    },
    fadeInImage: {
      opacity: animation,
    },
    scaleImage: {
      transform: [{ scale: animation }],
    },
  });

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
