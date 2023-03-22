import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { ImageViewer } from "./ImageViewer";
import UseWay from "./UseWay";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Main({ navigation }) {
    const [images, setImages] = useState([]);
    const [isCheck, setIsCheck] = useState(0);
    const [loading, setLoading] = useState(false);

    const addPhoto = async () => {
        if (images.length >= 12) {
            alert("사진은 12장까지 고를 수 있습니다.");
        } else {
            try {
                setLoading(true);
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsMultipleSelection: true,
                    selectionLimit: 12,
                    quality: 1,
                });
                setLoading(false);
                if (result.assets !== null) {
                    result.assets.map((e) => (e.selected = false));
                    let setData = [...images, ...result.assets];
                    if (setData.length > 12) {
                        alert("사진은 12장까지 고를 수 있습니다.");
                    } else {
                        if (images.length !== 0) {
                            setData = setData.reduce(function (acc, current) {
                                if (
                                    acc.findIndex(({ assetId }) => assetId === current.assetId) ===
                                    -1
                                ) {
                                    acc.push(current);
                                }
                                return acc;
                            }, []);
                            setImages(setData);
                        } else {
                            setImages(result.assets);
                        }
                    }
                }
            } catch (e) {
                console.log("error", e);
            }
        }
    };

    const changeSeleted = (image) => {
        let newData = [];
        for (let i = 0; i < images.length; i++) {
            if (images[i].assetId === image.assetId) {
                images[i].selected = !images[i].selected;
            } else {
                images[i].selected = false;
            }
            newData.push(images[i]);
        }
        setImages(newData);
    };

    const deleteImage = (image) => {
        let newData = [];
        for (let i = 0; i < images.length; i++) {
            if (images[i] !== image) {
                newData.push(images[i]);
            }
        }
        setImages(newData);
    };

    const getStorage = async () => {
        let result = await AsyncStorage.getItem("makingMemoriesUseWay");
        // AsyncStorage.clear();
        result === null && setIsCheck(1);
    };

    useEffect(() => {
        getStorage();
    }, []);

    return (
        <View style={styles.container}>
            {(isCheck === 1 ||
                (images.length !== 0 && isCheck === 2) ||
                (images.length !== 0 && isCheck === 3)) && (
                <UseWay count={isCheck} setCount={setIsCheck} />
            )}
            {loading && (
                <View style={styles.loadings}>
                    <View style={styles.indicator}>
                        <ActivityIndicator size="large" color="#000000" />
                    </View>
                </View>
            )}
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
                            <ImageViewer
                                key={i}
                                image={e}
                                changeSeleted={changeSeleted}
                                deleteImage={deleteImage}
                            />
                        ))}
                </View>
            </View>

            {images.length !== 0 && (
                <View style={styles.makBtn}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Memories", images)}
                        disabled={loading}
                    >
                        <Text style={styles.font}>만들기</Text>
                    </TouchableOpacity>
                </View>
            )}
            {images.length === 0 && <View style={styles.blackBtn}></View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    loadings: {
        backgroundColor: "gray",
        zIndex: 1000,
        flex: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
        opacity: 0.7,
    },
    indicator: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    blank: {
        flex: 0.2,
    },
    header: {
        flex: 0.2,
        flexDirection: "row",
        marginBottom: 50,
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
        flex: 0.5,
    },
    viewer: {
        flexDirection: "row",
        flexWrap: "wrap",
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
