import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { Header } from './Header';
import PaymentPopup from './PaymentPopup';
import { useFocusEffect } from '@react-navigation/native';

const FeaturesSummary = ({ navigation, route }) => {
  const { data } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getNextMonthDate = () => {
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    const year = nextMonth.getFullYear();
    const month = String(nextMonth.getMonth() + 1).padStart(2, '0');
    const day = String(nextMonth.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentDateFormatted = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Reset modal visibility when screen is focused and handle back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isModalVisible) {
          setModalVisible(false); // Close modal if it's open
          return true; // Prevent default back action
        } else {
          navigation.goBack(); // Go back to the previous screen if modal is closed
          return true; // Prevent default back action
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isModalVisible, navigation])
  );

  return (
    <>
      <Header Title={"Features Summary"} />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{ padding: 16 }}>
            <Text style={styles.plan}>{data.name}</Text>
            <View style={styles.feeContainer}>
              <Text style={styles.label}>Actual Price</Text>
              <Text style={styles.fee}>₹ {data.autal_price}</Text>
            </View>
            <Text style={styles.features}>
              {data.features.map(item => item.name).join(', ')}
            </Text>
            {data?.discount && (
              <View style={styles.feeContainer}>
                <Text style={styles.label}>You save ({data.discount || "0"})</Text>
                <Text style={styles.fee}>
                  ₹ {((data.autal_price * data.discount || "0") / 100).toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.feeContainer}>
              <Text style={styles.label}>Actual Price {data?.discount && "After Discount"}</Text>
              <Text style={styles.fee}>
                ₹ {(data.autal_price - ((data.autal_price * data.discount || "0") / 100)).toFixed(2) || "0"}
              </Text>
            </View>
            <View style={styles.feeContainer}>
              <Text style={styles.label}>GST (18%)</Text>
              <Text style={styles.fee}>
                ₹{(((data.autal_price - ((data.autal_price * data.discount || "0") / 100).toFixed(2)) * 18) / 100).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.feeContainer3}>
            <Text style={styles.label}>Total {data?.duration||"month"} Fee</Text>
            <Text style={styles.fee}>
              ₹ {((data.autal_price - ((data.autal_price * data.discount || "0") / 100).toFixed(2)) * 1.18).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
          <PaymentPopup
            data={{
              "data": data.features,
              "Planprice": ((data.autal_price - ((data.autal_price * data.discount || "0") / 100).toFixed(2)) * 1.18).toFixed(2),
              "expirydt": getNextMonthDate(),
              "current": getCurrentDateFormatted(),
              "plan": data.name,
              "duration":data?.duration||"month"
            }}
            isVisible={isModalVisible}
            navigation={navigation}
            onClose={toggleModal}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  plan: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#961702',
    marginBottom: 16,
    textAlign: 'center',
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  feeContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  fee: {
    fontSize: 14,
    color: '#333',
  },
  features: {
    fontSize: 12,
    color: '#666',
    marginVertical: 8,
    lineHeight: 18,
    borderWidth: 1,
    paddingVertical: 10,
    padding: 5,
    borderRadius: 10,
  },
  paymentButton: {
    backgroundColor: '#961702',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
    width: "70%",
    alignSelf: "center",
  },
  paymentButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default FeaturesSummary;
