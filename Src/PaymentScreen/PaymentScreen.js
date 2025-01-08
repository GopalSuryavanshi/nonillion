import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../MyContext';

const PaymentScreen = ({ route }) => {
  const { LoginState } = useMyContext(); // assuming LoginState has a Token property
  
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWebView, setShowWebView] = useState(false); // State to control WebView loading

  const navigation = useNavigation();

  const { data } = route.params;
  const [dataX, setData] = useState(data);
  const [damoe, setdemo] = useState([]);

  // Async function to calculate the price including 18% tax
  const calculatePriceWithTax = (price) => {
    return new Promise((resolve) => {
      const tax = price * 0.18;
      const totalPrice = price + tax;
      const roundedTotalPrice = Math.round(totalPrice * 100) / 100; // Rounding to 2 decimal places
      resolve(roundedTotalPrice);
    });
  };

  const postData = async () => {
    try {
      if (!dataX.Planprice) {
        throw new Error('Plan price is missing');
      }

      const planPriceWithTax = dataX.Planprice;

      setData((prevData) => ({
        ...prevData,
        Planprice: planPriceWithTax
      }));

      const url = 'https://api.aroundme.co.in/businessapp/payment/';
      const token = LoginState.Token;

      const postData = {
        "merchant": {
          "identifier": "T955031",
          "responseEndpointURL": "http://192.168.0.102:8000/businessapp/handler/"
        },
        "cart": {
          "item": [
            {
              "amount": planPriceWithTax,
              "identifier": "FIRST"
            }
          ]
        },
        "payment": {
          "method": {
            "token": "470"
          },
          "instrument": {
            "token": ""
          }
        },
        "transaction": {
          "deviceIdentifier": "web",
          "amount": planPriceWithTax,
          "type": "SALE",
          "description": "",
          "currency": "INR",
          "isRegistration": "N",
          "identifier": "",
          "dateTime": dataX.current,
          "requestType": "T"
        },
        "consumer": {
          "accountNo": "",
          "business_id": LoginState.Busid,
          "package": dataX.plan,
          "month": 1,
          "duration": dataX.duration,
          "acutalamount": 1,
          "expiry_date": dataX.expirydt,
          "total_price": planPriceWithTax,
          "feature": dataX.data.map(item => ({
            "name": item.name
          }))
        }
      };

      setdemo(postData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error Response:', errorResponse);
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        setResponseData(json);
        setLoading(false);

        setTimeout(() => {
          setShowWebView(true);
        }, 2000);

        console.log('Response JSON:', json);
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Expected JSON response not received.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    postData();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      "Exit Payment",
      "Are you sure you want to leave the payment page?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => navigation.goBack() }
      ]
    );
    return true;
  };

  const handleNavigationStateChange = (navState) => {
    console.log('WebView URL:', navState.url);

    function getParameterByName(name, url) {
      name = name.replace(/[\[\]]/g, "\\$&");
      const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    const status = getParameterByName('status', navState.url);

    if (status === 'cancel') {
      navigation.navigate('CancelScreen');
    } else if (status === 'failure') {
      navigation.navigate('FailScreen');
    } else if (status === 'success') {
      navigation.navigate('SuccessScreen');
    } else if (status === 'perm') {
      navigation.navigate('PermScreen');
    } else {
      // Handle other cases or fallback
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
          Please wait, processing payment...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {showWebView && responseData && responseData.msg ? (
        <WebView
          source={{ uri: responseData.msg }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#961702" />
          <Text style={{ marginTop: 20, textAlign: 'center',color:"#961702" }}>
            Please wait, processing payment...
          </Text>
        </View>
      )}
    </View>
  );
};

export default PaymentScreen;
