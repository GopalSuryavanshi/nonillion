import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMyContext } from '../MyContext';
import axios from 'axios';

const UpdateSpecificationForm = ({ data, fetchdata }) => {
  const { LoginState, updateState } = useMyContext();
  const [Busid, setBusid] = useState("");

  useEffect(() => {
    setBusid(LoginState.Busid);
  }, []);

  const [specName, setSpecName] = useState(data.key_filed);
  const [specifications, setSpecifications] = useState(data.key_value.split(",").map(value => ({ key: '', value })));
  const [modalVisible, setModalVisible] = useState(false);
  const [inputBorderColors, setInputBorderColors] = useState(specifications.map(() => '#ccc'));
  const [specNameBorderColor, setSpecNameBorderColor] = useState('#ccc');

  const addNewSpecification = () => {
    let allFilled = true;
    const newBorders = specifications.map((spec) => {
      if (spec.value.trim() === '') {
        allFilled = false;
        return 'red';
      }
      return '#ccc';
    });

    setInputBorderColors(newBorders);

    if (allFilled) {
      setSpecifications([...specifications, { key: '', value: '' }]);
      setInputBorderColors([...inputBorderColors, '#ccc']);
    }
  };

  const removeSpecification = (index) => {
    const newSpecs = specifications.filter((_, i) => i !== index);
    const newBorders = inputBorderColors.filter((_, i) => i !== index);
    setSpecifications(newSpecs);
    setInputBorderColors(newBorders);
  };

  const handleInputChange = (index, text) => {
    const newSpecs = [...specifications];
    newSpecs[index].value = text;
    setSpecifications(newSpecs);
  };

  const transformInput = (array) => {
    const keyValues = array.map(item => item.value).join(',');
    return {
      business_details_id: Busid,
      business_feature: [
        {
          key_filed: specName,
          key_value: keyValues,
          key_filed_type: "multi-select"
        }
      ]
    };
  };

  const saveSpecification = () => {
    let allFilled = true;
    const newBorders = specifications.map((spec) => {
      if (spec.value.trim() === '') {
        allFilled = false;
        return 'red';
      }
      return '#ccc';
    });

    setInputBorderColors(newBorders);

    if (specName.trim() === '') {
      setSpecNameBorderColor('red');
      allFilled = false;
    } else {
      setSpecNameBorderColor('#ccc');
    }

    if (allFilled) {
      postBusinessFeature(transformInput(specifications));
    }
  };

  const postBusinessFeature = async (postData) => {
    try {
      const response = await axios.put('https://api.aroundme.co.in/businessapp/business_feature/edit/' + data.id + "/", postData);
      setModalVisible(false);
      fetchdata(LoginState.Mid, LoginState.Token);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
        <Icon name="edit" size={22} color="#961702" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 22, paddingRight: 20, color: "#961702", fontWeight: '900' }}>Manage specification </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.input2, { borderColor: specNameBorderColor }]}
              placeholder="Specification Name"
              value={specName}
              onChangeText={setSpecName}
            />
            <View style={styles.specWrapper}>
              {specifications.map((spec, index) => (
                <View key={index} style={styles.specContainer}>
                  <TextInput
                    style={[styles.input, { borderColor: inputBorderColors[index] }]}
                    placeholder={`Specification ${index + 1}`}
                    value={spec.value}
                    onChangeText={(text) => handleInputChange(index, text)}
                  />
                  <TouchableOpacity onPress={() => removeSpecification(index)} style={styles.removeButton}>
                    <Icon name="remove" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={{ backgroundColor: "#961702", borderRadius: 10, height: 35, paddingVertical: 5 }}
                onPress={addNewSpecification}
              >
                <Text style={{ color: "white", textAlign: "center", fontSize: 18, fontWeight: 900 }}>Add New Specification</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveSpecification}
            >
              <Text style={styles.buttonText}>Save Specification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 20,
    paddingRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 260,
     color:"#000"
  },
  input2: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 320,
     color:"#000"
  },
  specWrapper: {
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderColor: '#ccc',
    borderRadius: 2,
  },
  specContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: "center",
    borderWidth: 0,
  },
  removeButton: {
    margin: 2,
    backgroundColor: '#961702',
    padding: 2,
    borderRadius: 25,
    bottom: 6,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#961702',
    marginTop: 10,
    padding: 5,
    justifyContent: 'center',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#961702',
    marginTop: 10,
    padding: 5,
    justifyContent: 'center',
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#961702',
    marginTop: 10,
    padding: 1,
    height: 32,
    width: 32,
    justifyContent: 'center',
    borderRadius: 100,
    left: 100,
    bottom: 40,
    marginLeft: 60,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 8
  },
});

export default UpdateSpecificationForm;
