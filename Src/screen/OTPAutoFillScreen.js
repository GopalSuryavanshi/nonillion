import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SmsRetriever from 'react-native-sms-retriever';

const OTPAutoFillScreen = () => {
  useEffect(() => {
    const startSmsListener = async () => {
      try {
        const registered = await SmsRetriever.startSmsRetriever();
        if (registered) {
          SmsRetriever.addSmsListener(event => {
            const message = event.message;
            // Extract OTP from the message using regex
            const otp = /(\d{6})/.exec(message)[1];
            console.log('OTP received:', otp);
            // Do something with the OTP
            SmsRetriever.removeSmsListener();
          });
        }
      } catch (error) {
        console.log('Failed to start SMS retriever:', error);
      }
    };

    startSmsListener();

    return () => {
      SmsRetriever.removeSmsListener();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Waiting for OTP...</Text>
    </View>
  );
};

export default OTPAutoFillScreen;
