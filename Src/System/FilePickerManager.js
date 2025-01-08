import FilePickerManager from 'react-native-file-picker';
import {View,} from 'react-native'
// Function to pick a file
const pickFile = () => {
  FilePickerManager.showFilePicker(null, response => {
    if (response.didCancel) {
      console.log('User cancelled file picker');
    } else if (response.error) {
      console.log('File picker error:', response.error);
    } else {
      console.log('Selected file:', response);
      // Now, you can use the selected file, such as uploading it to a server.
      // Replace 'YOUR_UPLOAD_URL' with the actual URL of your server endpoint.
      // Example using fetch:
    }
  });
};
