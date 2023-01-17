import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { ImageViewer } from './components/ImageViewer';

export default function App() {

  const [selectedImage, setSelectedImage] = useState("");

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,   // 사진 편집
      allowMultipleSelection : true,
      selectionLimit : 20,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result)
      setSelectedImage(result.assets[0].uri);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoBox} onPress={addPhoto}>
        <MaterialIcons name="photo-camera" size={120} color="gray" />
      </TouchableOpacity>
      <ImageViewer
          selectedImage={selectedImage}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBox: {
    borderWidth : 1,
    width : "50%",
    height : "25%",
    borderColor: "gray",
    alignItems : "center",
    justifyContent :"center"
  },
});
