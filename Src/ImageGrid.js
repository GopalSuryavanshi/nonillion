import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import { useMyContext } from './MyContext';
import { useFocusEffect } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
const numColumns = 3;
const imageSize = width / numColumns;

const ImageGrid = ({ businessDetailsId, token }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { LoginState } = useMyContext();

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
      console.log(response.data.data);
      setImages(response.data.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      setImages([])
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchImages();
    }, [])
  );

  const renderSwiperItem = (item, index) => (
    <View key={index} style={styles.swiperItemContainer}>
      <Image source={{ uri: item.image_gallery }} style={styles.swiperImage} resizeMode="contain" />
    </View>
  );

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color="#961702" /></View>;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Click on the plus icon button to upload images for your business</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={true}
        autoplayTimeout={3}
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
        dot={<View style={styles.dot} />}
        activeDot={<View style={[styles.dot, styles.activeDot]} />}
      >
        {images.map((item, index) => renderSwiperItem(item, index))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    height: 300,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0, padding: 10, marginTop: 100,
  },
  errorMessage: {
    fontSize: 16,
    color: '#961702',
    textAlign: 'center',
    padding: 20,
  },
  swiperItemContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperImage: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: '#961702',
    fontSize: 50,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#961702',
  },
});

export default ImageGrid;
