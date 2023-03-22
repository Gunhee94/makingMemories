import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated } from "react-native";
import useInterval from "./../hooks/useInterval";
import useSound from "./../hooks/useSound";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Memories({ route, navigation }) {
    const images = route.params;

    const animation = {
        moveImage: new Animated.Value(250),
        fadeImage: new Animated.Value(0),
        scaleImage: new Animated.Value(1),
        pageXImage: new Animated.Value(SCREEN_WIDTH),
        rotateImage: new Animated.Value(0),
        rotateXImage: new Animated.Value(0),
        scaleReverseImage: new Animated.Value(1.2),
        fade1Image: new Animated.Value(0),
        scale1Image: new Animated.Value(1),
        pageYImage: new Animated.Value(SCREEN_HEIGHT),
        pageX1Image: new Animated.Value(SCREEN_WIDTH),
        fade2Image: new Animated.Value(0),
    };
    const [image, setImage] = useState("");
    const [count, setCount] = useState(0);
    const [isShow, setIsShow] = useState(false);

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
            ani: { transform: [{ scale: animation.scaleImage }] },
        },
        {
            key: 3,
            id: "pageXImage",
            ani: { transform: [{ translateX: animation.pageXImage }] },
        },
        {
            key: 4,
            id: "rotateImage",
            ani: {
                transform: [
                    {
                        rotate: animation.rotateImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["350deg", "360deg"],
                        }),
                    },
                ],
            },
        },
        {
            key: 5,
            id: "rotateXImage",
            ani: {
                transform: [
                    {
                        rotateX: animation.rotateXImage.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["180deg", "360deg"],
                        }),
                    },
                ],
            },
        },
        {
            key: 6,
            id: "scaleReverseImage",
            ani: { transform: [{ scale: animation.scaleReverseImage }] },
        },
        { key: 7, id: "fade1Image", ani: { opacity: animation.fade1Image } },
        {
            key: 8,
            id: "scale1Image",
            ani: { transform: [{ scale: animation.scale1Image }] },
        },
        {
            key: 9,
            id: "pageYImage",
            ani: { transform: [{ translateY: animation.pageYImage }] },
        },
        {
            key: 10,
            id: "pageX1Image",
            ani: { transform: [{ translateX: animation.pageX1Image }] },
        },
        { key: 11, id: "fade2Image", ani: { opacity: animation.fade2Image } },
    ];
    const [aniStyles, setAniStyles] = useState("");

    let soundObject = new Audio.Sound();

    // gunhee todo
    // 3. 화면 녹화로 동영상 제작
    // 5. 이미지 드래그로 위치 옮기기

    // 6. 로컬스토리지로 사용법 알려주기 ok
    // 1. 애니메이션 랜덤 및 추가 ok
    // 7. 똑같은 사진이 들어있다면 추가하지 않기 ok
    // 2. 랜덤 노래 ok
    // 4. 추가한 이미지 삭제 ok

    const moveImage = () => {
        Animated.timing(animation.moveImage, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const fadeImage = (animation) => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const scaleImage = (animation) => {
        Animated.timing(animation, {
            toValue: 1.2,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const pageImage = (animation) => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const rotateImage = () => {
        Animated.timing(animation.rotateImage, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const rotateXImage = () => {
        Animated.timing(animation.rotateXImage, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const scaleReverseImage = () => {
        Animated.timing(animation.scaleReverseImage, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const animationStart = (id) => {
        if (id === "moveImage") {
            moveImage();
        } else if (id === "fadeImage") {
            fadeImage(animation.fadeImage);
        } else if (id === "fade1Image") {
            fadeImage(animation.fade1Image);
        } else if (id === "fade2Image") {
            fadeImage(animation.fade2Image);
        } else if (id === "scaleImage") {
            scaleImage(animation.scaleImage);
        } else if (id === "scale1Image") {
            scaleImage(animation.scale1Image);
        } else if (id === "pageXImage") {
            pageImage(animation.pageXImage);
        } else if (id === "pageX1Image") {
            pageImage(animation.pageX1Image);
        } else if (id === "pageYImage") {
            pageImage(animation.pageYImage);
        } else if (id === "rotateImage") {
            rotateImage();
        } else if (id === "rotateXImage") {
            rotateXImage();
        } else if (id === "scaleReverseImage") {
            scaleReverseImage();
        }
    };

    useEffect(() => {
        aniArr.sort(() => Math.random() - 0.5);
    }, []);

    useSound(soundObject);

    useInterval(
        () => {
            setCount((count) => ++count);

            setImage(images[count]);
            setAniStyles(aniArr[count].ani);
            animationStart(aniArr[count].id);
        },
        images.length > count ? 2000 : null
    );

    useInterval(
        () => {
            setIsShow(true);
        },
        images.length <= count ? 3000 : null
    );

    return (
        <>
            <Ionicons
                style={dynamicBtn(isShow).closeBtn}
                name="ios-close"
                size={30}
                color="white"
                onPress={() => navigation.navigate("Making Memories")}
            />
            <Animated.View style={aniStyles}>
                <StatusBar style="auto" hidden />
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
            opacity: isShow ? 1 : 0,
        },
    });
