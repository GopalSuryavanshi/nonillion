import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { Header } from './Header';
import { useMyContext } from './MyContext';
import FullScreenDataLoader from './System/FullScreenDataLoader';

const Hamburger = './assets/Upload.png';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const placeholderImage = require('./assets/Test.png'); // Correct usage of require for local image
  const { LoginState } = useMyContext();
  const [Loader, setLoader] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.aroundme.co.in/businessapp/BusinessGalleryView/?business_details_id=${LoginState.Busid}`,
        {
          headers: {
            Authorization: `Bearer ${LoginState.Token}`,
          },
        }
      );
      setImages(response.data.data);
    } catch (error) {
      setImages([]);
      // Alert.alert('Error', 'Failed to load images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const selectImage = async () => {
    try {
      const selectedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        cropping: false,
        compressImageQuality: 0.8,
      });

      if (selectedImages.length > 0) {
        await handleMultipleFileUpload(selectedImages);
      }
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        // Alert.alert('Error', 'Failed to select images. Please try again.');
      }
    }
  };

  const takePhoto = async () => {
    try {
      const photo = await ImagePicker.openCamera({
        cropping: false,
        compressImageQuality: 0.8,
      });

      if (photo) {
        await handleMultipleFileUpload([photo]);
      }
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        // Alert.alert('Error', 'Failed to take photo. Please try again.');
      }
    }
  };

  const handleMultipleFileUpload = async (selectedImages) => {
    try {
      setLoader(true);

      const formData = new FormData();
      formData.append("business_details_id", LoginState.Busid);

      selectedImages.forEach((image, index) => {
        const fileName = image.path.split('/').pop();
        formData.append('image_gallery', {
          uri: image.path,
          type: image.mime,
          name: fileName,
        });
      });

      const response = await axios.post('https://api.aroundme.co.in/businessapp/BusinessGallery/add/', formData, {
        headers: {
          Authorization: `Bearer ${LoginState.Token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Images uploaded successfully.');
      fetchImages();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      // Alert.alert('Error', 'Failed to upload images. Please try again.');
    }
  };

  const confirmDelete = (itemId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDelete(itemId),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = async (itemId) => {
    const data = {
      ids: [itemId],
    };

    try {
      setLoader(true);
      const response = await axios.delete(
        "https://api.aroundme.co.in/businessapp/BusinessGallery/delete/",
        {
          headers: {
            Authorization: `Bearer ${LoginState.Token}`,
          },
          data: data,
        }
      );

      Alert.alert('Success', 'Gallery image deleted successfully.');
      setLoader(false);
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      // Alert.alert('Error', 'Failed to delete image. Please try again.');
    } finally {
      fetchImages();
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#961702" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header Title="Gallery" />
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={{flexDirection:"row",justifyContent:"space-around"}}>
            <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
              <Text style={styles.buttonText}>Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.grid}>
              {images.map((image, index) => (
                <View style={styles.imageWrapper} key={index}>
                  <Image
                    source={image.image_gallery ? { uri: image.image_gallery } : placeholderImage}
                    style={styles.image}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmDelete(image.id)}
                  >
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        {Loader && <FullScreenDataLoader color={"#961702"} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  uploadButton: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#961702',
    padding: 10,
    borderRadius: 5,
    width:"45%"
  },
  uploadImage: {
    width: 200,
    height: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    position: 'relative',
    width: '48%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#961702',
    borderRadius: 50,
    padding: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Gallery;
