import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, Alert, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OTPInput from './component/OTPInput';
import FullScreenDataLoader from './System/FullScreenDataLoader';
import AlertMessage from './AlertMessage';
import { Header } from './Header';
import { useMyContext } from './MyContext';

const Logo = require('./assets/UserProfile.png'); // Correctly require the image

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    width: 300,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    width: '48%',
    padding: 5,
    backgroundColor: '#961702',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  modalCancelButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#333333',
    fontSize: 15,
  },
});

const CustomAlert = ({ visible, onClose, onTakePhoto, onChooseFromGallery }) => (
  <Modal
    transparent={true}
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Profile Picture</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.modalButton} onPress={onTakePhoto}>
            <Text style={styles.modalButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onChooseFromGallery}>
            <Text style={styles.modalButtonText}>Choose From Gallery</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
          <Text style={styles.modalCancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const Profile = (props) => {
  const [dataCategory, setDataCategory] = useState([]);
  const { LoginState, updateState } = useMyContext();
  const AccessToken = LoginState;

  const [screenName, setscreenname] = useState('');
  const [mobile_no, setmobile_no] = useState('');
  const [data, setdata] = useState([]);
  const [name, setname] = useState('');
  const [whatsapp_no, setwhatsapp_no] = useState('');
  const [lastName, setlastName] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [EmailID, setEmailID] = useState('');
  const [Img, setImg] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [OTPBX, setOTPBX] = useState(false);
  const [sms, setsms] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [Verfy, setverfy] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async () => {
    try {
      console.log(AccessToken.Mid);
      setLoading(true);
      const apiUrl = `https://api.aroundme.co.in/businessapp/BusinessOwnerView/?id=${AccessToken.Mid}`;
      console.log('API URL:', apiUrl);

      const bearerToken = AccessToken.Token;

      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      });

      const userData = response.data.data;
      setdata(userData);
      setDataCategory(userData);
      console.log(userData);
      setImg(userData.img);
      setname(userData.name || '');
      setMobileNo(userData.mobile_no || '');
      setwhatsapp_no(userData.whatsapp_no || '');
      setverfy(userData.whatsapp_no && userData.whatsapp_no.length === 10);
      setEmailID(userData.email_optional || '');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const handleSendOtp = async (number) => {
    const payload = {
      recipientPhone: number,
    };

    try {
      const response = await axios.post('https://ditscrm.divsolution.com/send-whatsapp-message', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = response.data;
      if (responseData.success) {
        setOtp(responseData.otp);
        setCountdown(30); // Start the countdown
        const interval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
              clearInterval(interval);
            }
            return prevCountdown - 1;
          });
        }, 1000);
      } else {
        Alert.alert('Error', 'Failed to send OTP.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while sending the OTP.');
    }
  };


  /* ------------------------------------ */
  const updateProfile = async () => {
    const apiUrl = `https://api.aroundme.co.in/businessapp/BusinessOwner/edit/`;
    setLoading(true);
    const formData = new FormData();

    // Append the profile data
    formData.append('name', name);
    formData.append('mobile_no', MobileNo);
    formData.append('email_optional', EmailID);
    formData.append('whatsapp_no', whatsapp_no); // Include WhatsApp number

    // Append the image to the form data if selected
    if (selectedImage) {
      formData.append('img', {
        uri: selectedImage.path,
        type: selectedImage.mime,
        name: selectedImageName || `photo_${Date.now()}.jpg`,
      });
    }

    const headers = {

      'Authorization': `Bearer ${AccessToken.Token}`,
      'Content-Type': 'multipart/form-data',
    };
    console.log("formdata", formData);
    console.log("headers", headers);

    try {
      const response = await axios.put(apiUrl, formData, { headers });
      console.log("entered the try-catch", response);
      alertMsg('Profile updated successfully');
      setscreenname('UserProfile');
      LoadData(); // Reload data after the update
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error updating profile:', error);
      conli
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  /* ------------------------------------ */



  const alertMsg = (text) => {
    setsms(text);
    setModalVisible(true);
  };

  const selectImage = () => {
    setIsModalVisible(true);
  };

  const handleImageSelection = (image) => {
    setSelectedImage(image);
    const fileName = image.path.split('/').pop();
    setSelectedImageName(fileName);
  };

  const handleTakePhoto = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });
      handleImageSelection(image);
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
      setIsModalVisible(false);
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });
      handleImageSelection(image);
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
      setIsModalVisible(false);
    }
  };

  const UpdateWhatappNumber = async () => {
    // This function can be removed if we consolidate all updates into updateProfile
    // Alternatively, ensure that whatsapp_no is updated within updateProfile
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }}>
      {modalVisible && (
        <AlertMessage
          screenName={screenName}
          Title={sms}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

      <CustomAlert
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onTakePhoto={handleTakePhoto}
        onChooseFromGallery={handleChooseFromGallery}
      />
      {Loading && <FullScreenDataLoader color="#961702" />}
      <Header TitleColor="#050505" Title="Edit Profile" />

      <ScrollView>
        <View style={{ flex: 1, paddingVertical: 10, backgroundColor: 'white', borderColor: 'black' }}>
          <View style={{ alignSelf: 'center', marginTop: 50, padding: 40 }}>
            <View style={{ position: 'relative' }}>
              <Icon
                name="camera-alt"
                size={18}
                color="#961702"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  zIndex: 5,
                  borderWidth: 1,
                  height: 25,
                  width: 25,
                  borderColor: '#000',
                  paddingTop: 3,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 100,
                  textAlign: 'center',
                  padding: 2,
                }}
              />
              <TouchableOpacity onPress={selectImage}>
                <Image
                  style={{ borderWidth: 2, width: 100, height: 100, borderRadius: 100 }}
                  source={Img ? { uri: Img } : Logo}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ padding: 10, alignSelf: 'center', width: 350 }}>
            <Text style={{ color: 'black', fontWeight: '900', fontSize: 15 }}>Your Information</Text>

            {/* Username Field */}
            <View
              style={{
                borderRadius: 10,
                marginTop: 20,
                height: 65,
                borderWidth: 2,
                paddingHorizontal: 20,
                borderColor: '#E6E6E6',
                paddingVertical: 5,
              }}
            >
              <Text style={{ margin: 0, padding: 0, color: '#000' }}>Username</Text>
              <TextInput
                value={dataCategory.user || ''}
                placeholder="Username"
                style={{ margin: 0, padding: 0, color: 'black' }}
                editable={false} // Assuming username is not editable
              />
            </View>

            {/* Name Field */}
            <View
              style={{
                borderRadius: 10,
                marginTop: 20,
                height: 65,
                borderWidth: 2,
                paddingHorizontal: 20,
                borderColor: '#E6E6E6',
                paddingVertical: 5,
              }}
            >
              <Text style={{ margin: 0, fontSize: 10, padding: 0, color: '#000' }}>Name</Text>
              <TextInput
                value={name}
                onChangeText={(text) => setname(text)}
                placeholder="Name"
                style={{ margin: 0, padding: 0, color: 'black' }}
              />
            </View>

            {/* Email Field */}
            <View
              style={{
                borderRadius: 10,
                marginTop: 20,
                height: 65,
                borderWidth: 2,
                paddingHorizontal: 20,
                borderColor: '#E6E6E6',
                paddingVertical: 5,
              }}
            >
              <Text style={{ margin: 0, fontSize: 10, padding: 0, color: '#000' }}>Email</Text>
              <TextInput
                value={EmailID}
                onChangeText={(text) => setEmailID(text)}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ margin: 0, padding: 0, color: 'black' }}
              />
            </View>

            {/* Mobile Number Field */}
            <View
              style={{
                borderRadius: 10,
                marginTop: 20,
                height: 65,
                borderWidth: 2,
                paddingHorizontal: 20,
                borderColor: '#E6E6E6',
                paddingVertical: 5,
              }}
            >
              <Text style={{ margin: 0, fontSize: 10, padding: 0, color: '#000' }}>Mobile</Text>
              <TextInput
                value={MobileNo}
                onChangeText={(text) => setMobileNo(text)}
                keyboardType="phone-pad"
                placeholder="Phone number"
                style={{ margin: 0, padding: 0, color: 'black' }}
              />
            </View>

            {/* WhatsApp Number Field */}
            <View
              style={{
                borderRadius: 10,
                marginTop: 20,
                height: 65,
                borderWidth: 2,
                paddingHorizontal: 20,
                borderColor: '#E6E6E6',
                paddingVertical: 5,
              }}
            >
              <Text style={{ margin: 0, fontSize: 10, padding: 0, color: '#000' }}>WhatsApp Number</Text>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextInput
                  value={whatsapp_no}
                  onChangeText={(text) => {
                    setwhatsapp_no(text);
                    setOtp('');
                    setverfy(false); // Reset verification status on change
                  }}
                  keyboardType="phone-pad"
                  placeholder="WhatsApp number"
                  style={{ flex: 1, margin: 0, padding: 0, color: 'black' }}
                  placeholderTextColor="#808080"
                  maxLength={10}
                />

                {Verfy ? (
                  <Icon name="check-circle" size={18} color="green" />
                ) : (
                  // <>
                  //   {whatsapp_no.length === 10 && (
                  //     <TouchableOpacity
                  //       onPress={() => handleSendOtp(whatsapp_no)}
                  //       disabled={countdown > 0}
                  //       style={{
                  //         borderWidth: 1,
                  //         height: 25,
                  //         padding: 2,
                  //         paddingHorizontal: 10,
                  //         borderRadius: 10,
                  //         borderColor: '#961702',
                  //         marginLeft: 10,
                  //       }}
                  //     >
                  //       <Text style={{ color: '#961702', fontSize: 12 }}>
                  //         {countdown > 0 ? `Resend OTP in ${countdown}s` : !otp ? 'Send OTP' : 'Resend OTP'}
                  //       </Text>
                  //     </TouchableOpacity>
                  //   )}
                  // </>
                  ""
                )}
              </View>
            </View>

            {/* OTP Input */}
            {otp && (
              <View style={{ alignSelf: 'center', paddingVertical: 20 }}>
                <OTPInput correctOtp={otp} whatsappNo={whatsapp_no} MobileNo={MobileNo} EmailID={EmailID} name={name} />
              </View>
            )}

            {/* Save Button */}
            <View style={{ alignSelf: 'center', paddingVertical: 20 }}>
              <TouchableOpacity
                onPress={updateProfile}
                style={{
                  backgroundColor: '#961702',
                  width: 150,
                  padding: 10,
                  borderRadius: 100,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: '900' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
