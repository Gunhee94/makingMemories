import { StyleSheet, Image, Dimensions, View } from "react-native";

export const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
    const WINDOW_WIDTH = Dimensions.get("window").width;
    const imageSource =
        selectedImage !== null ? { uri: selectedImage.uri } : placeholderImageSource;
    return (
        <View style={stylesImage(WINDOW_WIDTH).imageBox}>
            <Image source={imageSource} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
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
