import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(result);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled the file picker
      } else {
        // Handle other errors
      }
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: selectedFile.type,
    });

    try {
      const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response, e.g., show success message
      console.log('File upload successful', response.data);
    } catch (error) {
      // Handle upload error
      console.error('File upload error', error);
    }
  };

  return (
    <View>
      <Button title="Select File" onPress={selectFile} />
      {selectedFile && (
        <View>
          <Text>Selected File: {selectedFile.name}</Text>
          <Button title="Upload File" onPress={uploadFile} />
        </View>
      )}
    </View>
  );
};

export default FileUploadComponent;
