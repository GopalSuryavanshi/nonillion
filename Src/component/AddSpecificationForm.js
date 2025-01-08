import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useMyContext } from '../MyContext';
import axios from 'axios';

const AddSpecificationForm = ({ setModalVisible, data }) => {
  const { LoginState, updateState } = useMyContext();
  const [Busid, setBusid] = useState("");

  useEffect(() => {
    setBusid(LoginState.Busid);
  }, []);

  const [specName, setSpecName] = useState('');
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
  const [inputBorderColors, setInputBorderColors] = useState(['#ccc']);
  const [specNameBorderColor, setSpecNameBorderColor] = useState('#ccc');

  const addNewSpecification = () => {
    const newSpecs = [...specifications];
    const newBorders = [...inputBorderColors];

    let allFilled = true;
    newSpecs.forEach((spec, index) => {
      if (spec.value.trim() === '') {
        newBorders[index] = 'red';
        allFilled = false;
      } else {
        newBorders[index] = '#ccc';
      }
    });

    if (allFilled) {
      setSpecifications([...specifications, { key: '', value: '' }]);
      setInputBorderColors([...inputBorderColors, '#ccc']);
    } else {
      setInputBorderColors(newBorders);
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

    const newBorders = [...inputBorderColors];
    newBorders[index] = text.trim() === '' ? 'red' : '#ccc';
    setInputBorderColors(newBorders);

    console.log(newSpecs);
  };

  function transformInput(array) {
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
  }

  const saveSpecification = () => {
    console.log('Specification Name:', specName);
    console.log('Specifications:', transformInput(specifications));

    let allFilled = true;
    const newBorders = [...inputBorderColors];
    specifications.forEach((spec, index) => {
      if (spec.value.trim() === '') {
        newBorders[index] = 'red';
        allFilled = false;
      } else {
        newBorders[index] = '#ccc';
      }
    });

    if (specName.trim() === '') {
      setSpecNameBorderColor('red');
      allFilled = false;
    } else {
      setSpecNameBorderColor('#ccc');
    }

    if (allFilled) {
      postBusinessFeature(transformInput(specifications));
    } else {
      setInputBorderColors(newBorders);
    }
  };

  const postBusinessFeature = async (postData) => {
    try {
      const response = await axios.post('https://api.aroundme.co.in/businessapp/business_feature/add/', postData);
      console.log('Success:', response.data);
      setModalVisible(false);
      data(LoginState.Mid, LoginState.Token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <ScrollView>
        <TextInput
        placeholderTextColor={"#808080"}
          style={[styles.input, { borderColor: specNameBorderColor }]}
          placeholder="Specification Name"
          value={specName}
          onChangeText={setSpecName}
        />

        <View style={{ borderWidth: 1, padding: 15, borderColor: "#ccc", borderRadius: 2 }}>
          {specifications.map((spec, index) => (
            <View key={index} style={styles.specContainer}>
              <TextInput
              placeholderTextColor={"#808080"}
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
          <View>
            <TouchableOpacity style={styles.addButton} onPress={addNewSpecification}>
              <Text style={styles.addButtonText}>Add New Specification</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.saveButton} onPress={saveSpecification}>
            <Text style={styles.saveButtonText}>Save Specification</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flex: 1,
    color:"#000"
  },
  specContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: "center",
    borderWidth: 0
  },
  removeButton: {
    margin: 2,
    backgroundColor: '#961702',
    padding: 2,
    borderRadius: 25,
    bottom: 6,
    marginLeft: 10
  },
  addButton: {
    backgroundColor: "#961702",
    marginTop: 10,
    padding: 5,
    justifyContent: "center",
    borderRadius: 5
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: '700'
  },
  saveButton: {
    backgroundColor: "#961702",
    marginTop: 10,
    padding: 5,
    justifyContent: "center",
    borderRadius: 10
  },
  saveButtonText: {
    color: "#ffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: '700'
  },
});

export default AddSpecificationForm;
