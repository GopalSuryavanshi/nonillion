import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import OTPVerify from 'react-native-otp-verify';

export default function OTPVerificationScreen() {
    const [otp, setOtp] = useState('');

    useEffect(() => {
        OTPVerify.getHash()
            .then(hash => console.log('App hash key:', hash))
            .catch(console.log);

        OTPVerify.getOtp()
            .then(() => OTPVerify.addListener(otpHandler))
            .catch(console.log);

        return () => {
            OTPVerify.removeListener();
        };
    }, []);

    const otpHandler = (message) => {
        const extractedOtp = extractOtpFromMessage(message);
        if (extractedOtp) {
            setOtp(extractedOtp);
            OTPVerify.removeListener();
        }
    };

    const extractOtpFromMessage = (message) => {
        const otpMatch = message.match(/\d{4,6}/);
        return otpMatch ? otpMatch[0] : null;
    };

    const handleSubmit = () => {
        if (otp.length === 6) {
            Alert.alert('OTP Verified', `OTP: ${otp}`);
        } else {
            Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter OTP:</Text>
            <TextInput
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
                style={styles.input}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});
