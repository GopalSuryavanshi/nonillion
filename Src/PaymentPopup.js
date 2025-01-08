import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, BackHandler } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';

const PaymentPopup = ({ navigation, isVisible, onClose, data }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const backAction = () => {
      onClose(); // Close the modal on back button press
      return true; // Prevent the default behavior (which is to exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePaymentProceed = () => {
    if (isChecked) {
      // Proceed to payment logic
      navigation.navigate("PaymentScreen", { data: data });
    } else {
      alert('Please agree to the policies to proceed.');
    }
  };

  return (
    <Modal 
      isVisible={isVisible}
      onBackdropPress={onClose} // Close the modal when clicking outside
    >
      <View style={styles.container}>
        <Text style={styles.title}>Please Note</Text>
        <Text style={styles.description}>
          AroundMe clearly communicates the policies, complies with laws, and handles disputes directly with us. Once a payment is processed through the gateway, it is final and non-refundable, with refund policies determined by AroundMe.
        </Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
          style={{borderColor:"#961702"}}
            checked={isChecked}
            onPress={handleCheckboxChange}
          />
          <Text style={styles.checkboxLabel}>I Agree to the above policies</Text>
        </View>
        <Button
          title="Proceed to Payment"
          onPress={handlePaymentProceed}
          color="#a83725"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // for shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#000"
  },
  description: {
    color:"#000",
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'justify',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 10,
    color:"#000"
  },
});

export default PaymentPopup;
