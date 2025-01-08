import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity, Image, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'axios';

import { Header } from '../Header';
import { useMyContext } from '../MyContext';
import AlertMessage from '../AlertMessage';

const BusinessLogoUpload = ({ route }) => {
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const { LoginState } = useMyContext();

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            handleImageResponse(response);
        });
    };

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            handleImageResponse(response);
        });
    };

    const handleImageResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0];
            uploadImage(selectedImage);
        }
    };

    const uploadImage = async (image) => {
        if (!image) {
            Alert.alert('No image selected', 'Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append(data.slug, {
            uri: image.uri,
            name: image.fileName || 'business_document_back.jpg',
            type: image.type || 'image/jpeg',
        });

        


        const endPoint = `https://api.aroundme.co.in/businessapp/busineessedit/`;

        try {
            const response = await axios.put(endPoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${LoginState.Token}`,
                },
            });

            setModalVisible(true);
            console.log('Image upload response:', response.data);
        } catch (error) {
            Alert.alert('Upload failed', 'Failed to upload image. Please try again.');
            console.error('Image upload error:', error);
        }
    };

   

    return (
        <View style={styles.container}>
            <Header Title={data.title} />

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: data.file }} // Dummy image URL
                    style={styles.image}
                />
            </View>

            <View style={styles.buttonContainer}>


                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Choose from Gallery</Text>
                </TouchableOpacity>
            </View>

            <AlertMessage
                screenName={"UserProfile"}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                Title={data.title+" upload successfully"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 300,
        height: 300,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 5,
        width: '80%',
    },
    downloadButton: {
        backgroundColor: '#AAAAAA',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 5,
        width: '80%',
    },
    buttonText: {
        color: '#000',
        fontWeight: '700',
    },
});

export default BusinessLogoUpload;
