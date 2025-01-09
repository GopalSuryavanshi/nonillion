import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Button, Share } from 'react-native';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import axios from 'axios';
import numWords from 'num-words';
import { useMyContext } from '../MyContext';
import { useRoute } from '@react-navigation/native';

const InvoiceScreen = () => {
  const viewShotRef = useRef(null);

  const { LoginState, updateState } = useMyContext();


  const captureAndShareScreenshot = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      console.log('Image saved to', uri);
      // Share the screenshot
      Share.share({
        title: 'Share Invoice',
        message: 'Here is your invoice',
        url: uri,
        subject: 'Invoice',
      });
    } catch (error) {
      console.error('Error capturing or sharing screenshot:', error);
    }
  };

  const [data, setData] = useState([]);
  console.log("dataprice", data);
  const [error, setError] = useState(null);

  const route = useRoute();
  const { orderId } = route.params;
  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.aroundme.co.in/businessapp/transcationview/?id=' + orderId,
      headers: {
        Authorization:
          `Bearer ${LoginState.Token}`,
      },
    };

    const makeRequest = async () => {
      try {
        const response = await axios.request(config);
        setData(response.data.data);

        console.log('Data received:', response.data.data);
      } catch (error) {
        console.log('Request failed:', error);
        setError(error);
      }
    };

    makeRequest();
  }, []);

  const [amount, setAmount] = useState('');

  const convertToWords = (amount) => {
    try {
      console.log('Converting amount to words:', amount);

      if (amount.includes('.')) {
        const [rupees, paisa] = amount.split('.').map(Number);
        const rupeesInWords = rupees ? `${numWords(rupees)} rupee${rupees > 1 ? 's' : ''}` : '';
        const paisaInWords = paisa ? `${numWords(paisa)} paisa` : '';
        const result = `${rupeesInWords} and ${paisaInWords}`.trim();
        console.log('Converted amount:', result);
        return result;
      } else {
        const rupees = Number(amount);
        const rupeesInWords = rupees ? `${numWords(rupees)} rupee${rupees > 1 ? 's' : ''}` : '';
        console.log('Converted amount:', rupeesInWords.trim());
        return rupeesInWords.trim();
      }
    } catch (error) {
      // console.error('Error converting amount to words:', error);
      return "--";
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Download as PDF" onPress={captureAndShareScreenshot} /> */}
      {/* <Text style={{color: '#000'}}>{orderId}</Text> */}
      <ScrollView>
        {/* <Text style={{color: '#000'}}>{JSON.stringify(data)}</Text> */}
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          <View style={styles.Invoice}>
            <View style={styles.header}>
              <Text
                style={{
                  flex: 1.5,
                  borderWidth: 1,
                  fontSize: 22,
                  fontWeight: '900',
                  padding: 5,
                  textAlign: 'center',
                  backgroundColor: '#961702',
                  color: '#fff',
                }}>
                INVOICE
              </Text>

              <View style={{ flex: 1, backgroundColor: '#000' }}>
                <Text
                  style={{
                    flex: 0.5,
                    borderWidth: 0,
                    fontSize: 12,
                    color: '#fff',
                    padding: 2,
                  }}>
                  INVOICE NO : {orderId}
                </Text>
                <Text
                  style={{
                    flex: 0.5,
                    borderWidth: 0,
                    fontSize: 12,
                    color: '#fff',
                    padding: 1,
                  }}>
                  {' '}
                  DATE : {new Date(data.date).toLocaleDateString('en-GB')}
                </Text>
              </View>
            </View>

            <View style={styles.header}>
              <View style={{ flex: 2, height: 80 }}>
                <Text
                  style={{
                    padding: 2,
                    height: 100,
                    flex: 1,
                    borderWidth: 0.5,
                    fontSize: 18,
                    textAlign: 'center',
                    fontWeight: 700,
                    color: "#000"
                  }}>
                  Aroundme
                </Text>
                <Text
                  style={{ flex: 2, borderWidth: 0.5, fontSize: 12, padding: 4, color: '#000' }}>
                  Address: 6-2-966/4/1/C, Hill Colony, Khairatabad,
                  Hyderabad,Telangana, India- 500004
                </Text>
              </View>
              <View
                style={{
                  flex: 1.2,
                  borderWidth: 0.5,
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <Image
                  style={{ height: 30, width: 135, borderWidth: 1 }}
                  source={require('../assets/Logo-Aroundme-Tm1.png')}></Image>
              </View>
            </View>

            <View style={styles.header}>
              <View style={{ borderWidth: 0.5, width: '100%', padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Bill To:</Text>
                  <Text style={{ color: '#000' }}>{data.businessname}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Mobile No:</Text>
                  <Text style={{ color: '#000' }}>{data.mobile_no}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Address:</Text>
                  <Text style={{ color: '#000' }}>{data.address}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Email ID:</Text>
                  <Text style={{ color: '#000' }}>{data.email}</Text>
                </View>
              </View>
            </View>

            <View style={styles.header}>
              <View style={{ borderWidth: 0.5, width: '100%', padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Payment Date:</Text>
                  <Text style={{ color: '#000' }}>{new Date(data.date).toLocaleDateString('en-GB')}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Payment Mode:</Text>
                  <Text style={{ color: '#000' }}>{data.paymentmethod || ""}</Text>
                </View>
              </View>
            </View>

            <View style={styles.header}>
              <View
                style={{ borderWidth: 0.5, width: '100%', flexDirection: 'row' }}>
                <View style={{ borderWidth: 0.5, flex: 2, padding: 5 }}>
                  <Text style={{ color: '#000' }}>Description</Text>
                </View>
                <View style={{ borderWidth: 0.5, flex: 1 }}>
                  <Text style={{ textAlign: 'center', padding: 5, color: "#000" }}>Plans</Text>
                </View>
                <View style={{ borderWidth: 0.5, flex: 0.5 }}>
                  <Text style={{ textAlign: 'center', padding: 5, color: "#000" }}>Rate</Text>
                </View>
                <View style={{ borderWidth: 0.5, flex: 0.8 }}>
                  <Text style={{ textAlign: 'center', padding: 5, color: "#000" }}>Amount</Text>
                </View>
              </View>
            </View>

            <View style={styles.header}>
              <View
                style={{ borderWidth: 0, width: '100%', flexDirection: 'row' }}>
                <View style={{ borderWidth: 0.5, flex: 2, minHeight: 150, padding: 5 }}>
                  {data &&
                    data.feature?.map((transaction, index) => (
                      <Text style={{ color: "#000" }} key={index}>{transaction.name}</Text>
                    ))}
                </View>
                <View style={{ borderWidth: 0.5, flex: 1 }}>
                  <Text style={{ textAlign: 'center', padding: 5, color: "#000" }}>{data.plan}</Text>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    flex: 0.5,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ borderTopWidth: 0.5, textAlign: "center", color: "#000", padding: 5 }}>{data.price}</Text>
                  <Text style={{ borderTopWidth: 0.5, color: "#000" }}>Total</Text>
                </View>

                <View
                  style={{
                    borderWidth: 0.5,
                    flex: 0.8,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ borderTopWidth: 0.5, textAlign: "center", padding: 5, color: "#000" }}>{data.price}</Text>
                  <Text style={{ borderTopWidth: 0.5, textAlign: "center", color: "#000" }}>{data.price}</Text>
                </View>
              </View>
            </View>

            <View style={styles.header}>
              <View style={{ borderWidth: 0.5, flex: 1, padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Total Amount (₹ - In Words):</Text>
                  <Text style={{ color: '#000' }}>{convertToWords(data.total_price)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.header}>
              <View style={{ borderWidth: 0.5, flex: 1, padding: 5 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={{ color: '#000' }}>Add : GST @ 18% :</Text>
                  <Text style={{ color: '#000' }}> {(data.price * 18) / 100}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={{ color: '#000' }}>Balance Received :</Text>
                  <Text style={{ color: '#000' }}> {data.total_price}</Text>
                </View>
              </View>
            </View>

            <View style={styles.header}>
              <View style={{ borderWidth: 0.5, flex: 1, flexDirection: 'row', }}>
                <Text
                  style={{
                    flex: 1,
                    backgroundColor: '#961702',
                    color: '#fff',
                    padding: 5,
                  }}>
                  Grand Total
                </Text>
                <Text
                  style={{
                    flex: 1,
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: 5,
                    textAlign: 'right',
                  }}>
                  {data.total_price}
                </Text>
              </View>
            </View>

            <View style={{ borderBottomWidth: 0.5, flexDirection: 'row' }}>
              <View style={{ flex: 1, padding: 5 }}>
                <Image
                  style={{ height: 100, width: 100, borderWidth: 1 }}
                  source={require('../assets/Stampgolddd.png')}></Image>
                <Text style={{ color: '#000' }}>Authorised Stamp </Text>
              </View>
              <View style={{ width: '65%', padding: '1%', paddingTop: '3%' }}>
                <Text style={{ color: '#000', fontSize: 10 }}>Powered By </Text>
                <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'justify' }}>DIV International Technology services Pvt Ltd</Text>
                <Text style={{ color: '#000', fontSize: 12, fontWeight: 'bold', textAlign: 'left' }}>GST No: 36AAJCD2350A1Z6</Text>
                <Text style={{ color: '#000', fontSize: 11, textAlign: 'justify', alignSelf: 'baseline' }}>Address: 6-2-966/4/1/C, Hill Colony Khairatabad, Hyderabad, Telangana,India -500004 </Text>
              </View>
            </View>

            <View style={styles.terms}>
              <Text style={styles.termsTitle}>Terms and Conditions:-</Text>
              <Text style={{ color: '#000' }}>
                1. Platform Role: AroundMe connects users with merchants and
                service providers but does not guarantee business to vendors.
              </Text>
              <Text style={{ color: '#000' }}>
                2. Service Activation: Services begin when the first payment is
                received via ECS, CCSI, or NACH as per the chosen payment plan.
              </Text>
              <Text style={{ color: '#000' }}>
                3. Contact Consent: Vendors/service providers consent to be
                contacted by AroundMe for promotions, even if listed in the TRAI
                "Do Not Call" registry, during and after the agreement term.
              </Text>
              <Text style={{ color: '#000' }}>
                4. Inquiries: For questions about Payments & Plans, email us at
                Info@aroundme.co.in.
              </Text>
              <Text style={{ color: '#000' }}>
                5. No Refunds: All payments made under this agreement are
                non-refundable.
              </Text>
              <Text style={{ color: '#000' }}>
                6. Acceptance: Payment of the invoice confirms acceptance of
                these terms.
              </Text>
            </View>
          </View>
        </ViewShot>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#fff',
  },
  Invoice: {
    borderWidth: 1,
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',

  },
  terms: {
    padding: 5,
  },
  termsTitle: {
    fontWeight: 'bold',
  },
});

export default InvoiceScreen;
