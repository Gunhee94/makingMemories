import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
const windowSize = Dimensions.get("window");

export default function UseWay({ count, setCount }) {
    const messages = [
        "카메라 아이콘을 눌러 사진을 추가해주세요.",
        "추가한 사진을 클릭하면 삭제가 가능합니다.",
        "만들기 버튼을 통해 추억에 잠겨보세요~",
    ];
    const [message, setMessage] = useState(messages[0]);
    const [location, setLacation] = useState(windowSize.height * 0.13);

    const getStorage = async () => {
        try {
            const value = await AsyncStorage.getItem("makingMemoriesUseWay");
            if (value === null) {
                if (count === 1) {
                    setMessage(messages[0]);
                    setLacation(windowSize.height * 0.13);
                } else if (count === 2) {
                    setMessage(messages[1]);
                    setLacation(windowSize.height * 0.385);
                } else if (count === 3) {
                    setLacation(windowSize.height * 0.85);
                    setMessage(messages[2]);
                }
            }
            if (count >= 4) {
                await AsyncStorage.setItem("makingMemoriesUseWay", "true");
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    useEffect(() => {
        getStorage();
    }, [count]);

    return (
        <TouchableOpacity
            style={styles.useWay}
            onPress={() => {
                setCount(count + 1);
            }}
        >
            <View style={stylesUseWay(location).useWay}>
                <AntDesign name="arrowdown" size={24} color="black" />
                <Text style={styles.font}>{message}</Text>
            </View>
        </TouchableOpacity>
    );
}

const stylesUseWay = (location) =>
    StyleSheet.create({
        useWay: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: location,
            backgroundColor: "white",
            padding: 7,
            opacity: 1,
        },
    });

const styles = StyleSheet.create({
    useWay: {
        backgroundColor: "gray",
        zIndex: 100,
        position: "absolute",
        borderRadius: 5,
        height: "100%",
        width: "100%",
        opacity: 0.7,
    },
    font: {
        color: "black",
        fontWeight: "bold",
    },
});
