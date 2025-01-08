import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';

const MyForm = () => {
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = () => {
    // Handle form submission
  };

  return (
    <ScrollView>
      <View style={{ margin: 20 }}>
        <Text>Service Name</Text>
        <TextInput
          value={serviceName}
          onChangeText={setServiceName}
          placeholder="Enter service name"
        />
        <Text>Category Name</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {/* Populate categories */}
        </Picker>
        <Text>Sub Category Name</Text>
        <Picker
          selectedValue={subCategory}
          onValueChange={(itemValue) => setSubCategory(itemValue)}
        >
          {/* Populate sub-categories based on selected category */}
        </Picker>
        <Text>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />
        <Text>City Name</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter city name"
        />
        <Text>Service Duration</Text>
        <Picker
          selectedValue={duration}
          onValueChange={(itemValue) => setDuration(itemValue)}
        >
          {/* Populate service durations */}
        </Picker>
        <Text>Status</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          {/* Populate statuses */}
        </Picker>
        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

export default MyForm;
