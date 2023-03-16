import { View, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated } from "react-native";
import useInterval from "./../hooks/useInterval";

export default function Memories({ route }) {
    const images = route.params;

    const animation = {
        moveImage: new Animated.Value(0),
        fadeImage: new Animated.Value(0),
        savleImage: new Animated.Value(0),
    };
    const [image, setImage] = useState("");
    const [count, setCount] = useState(0);
    let aniArr = [
        { key: 0, id: "moveImage", ani: { transform: [{ translateY: animation.moveImage }] } },
        { key: 1, id: "fadeImage", ani: { opacity: animation.fadeImage } },
        { key: 2, id: "scaleImage", ani: { transform: [{ scale: animation.savleImage }] } },
    ];

    const [aniStyles, setAniStyles] = useState("");

    // gunhee todo
    // 1. 애니메이션 랜덤
    // 2. 랜덤 노래
    // 3. 화면 녹화로 동영상 제작

    const moveImage = () => {
        Animated.timing(animation.moveImage, {
            toValue: 250,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const fadeImage = () => {
        Animated.timing(animation.fadeImage, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const scaleImage = () => {
        Animated.timing(animation.savleImage, {
            toValue: 1,
            duration: 2000,
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

        console.log("gunheeLog", aniArr);
    }, []);

    useInterval(
        () => {
            setCount((count) => ++count);

            setImage(images[count]);
            setAniStyles(aniArr[count].ani);
            animationStart(aniArr[count].id);
        },
        images.length > count ? 2000 : null
    );

    return (
        <>
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
    },
});
