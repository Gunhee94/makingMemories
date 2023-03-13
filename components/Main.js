import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ImageViewer } from "./ImageViewer";

export default function Main({ navigation }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const addPhoto = async () => {
        if (selectedImages.length >= 20) {
            alert("사진은 20장까지 고를 수 있습니다.");
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                // allowsEditing: true,   // 사진 편집
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 20,
                quality: 2,
            });

            if (selectedImages.length !== 0) {
                setSelectedImages((data) => [...data, ...result.assets]);
            } else {
                setSelectedImages(result.assets);
            }
        }
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
                {/* <Text>{selectedImages.length}</Text> */}
                <View style={styles.viewer}>
                    {selectedImages.length !== 0 &&
                        selectedImages.map((e, i) => <ImageViewer key={i} selectedImage={e} />)}
                </View>
            </View>

            {selectedImages.length !== 0 && (
                <View style={styles.makBtn}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Memories", selectedImages)}
                    >
                        <Text style={styles.font}>만들기</Text>
                    </TouchableOpacity>
                </View>
            )}
            {selectedImages.length === 0 && <View style={styles.blackBtn}></View>}
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
