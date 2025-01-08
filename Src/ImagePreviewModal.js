import React from 'react';
import { Modal, View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const ImagePreviewModal = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        
        <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.closeButton}  onPress={onClose}>
         

         <Text style={{color:"black",borderWidth:1,paddingHorizontal:5,borderRadius:20,justifyContent:"center",alignItems:"center",alignSelf:"center",}}> x</Text>
       </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: width - 40,
    height: height - 80,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    justifyContent:"center",
    alignSelf:"center"
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default ImagePreviewModal;
