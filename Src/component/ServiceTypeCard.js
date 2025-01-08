import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UpdateSpecificationForm from './UpdateSpecificationForm';
import ConfirmationModal from '../System/ConfirmationModal';


const ServiceTypeCard = ({ serviceType, onEdit, onDelete, Servicetype,data,fetchdata }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeletePress = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    onDelete();
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.serviceleft}>
        <Text style={styles.serviceTypeText}>{Servicetype}</Text>
        <Text style={styles.serviceType}>{serviceType}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <UpdateSpecificationForm data={data} fetchdata={fetchdata} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
          <Icon name="delete" size={22} color="#961702" />
        </TouchableOpacity>
      </View>
      <ConfirmationModal
        visible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 2
  },
  serviceTypeText: {
    color: '#961702',
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceleft: {
    color: '#961702',
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 0,
    width: "85%"
  },
  serviceType: {
    color: 'black',
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
    width: 50
  },
  editButton: {
    borderRadius: 0,
    width: 30,
    marginRight: 0,
    height: 30
  },
  deleteButton: {
    width: 30,
    borderRadius: 0,
    height: 30
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: "center"
  },
});

export default ServiceTypeCard;
