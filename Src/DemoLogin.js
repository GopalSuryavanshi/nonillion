import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox, ImageBackground } from 'react-native';


const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
  };

  return (
    <ImageBackground
      source={require('./assets/demo.jpg') } // Replace with your image URL or local image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#E0E0E0"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#E0E0E0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.rememberContainer}>
          {/* <CheckBox
            value={rememberPassword}
            onValueChange={setRememberPassword}
            tintColors={{ true: '#FFD700', false: '#FFD700' }}
          /> */}
          <Text style={styles.rememberText}>Remember password</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Text style={styles.googleButtonText}>Sign-in with Google Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Don’t you have an account? <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // To add a semi-transparent overlay
  },
  title: {
    fontSize: 24,
    color: '#FFD700',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#3C3C3C',
    borderRadius: 10,
    marginBottom: 20,
    color: '#E0E0E0',
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  rememberText: {
    color: '#FFD700',
  },
  forgotText: {
    color: '#FFD700',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#800000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  googleButtonText: {
    color: '#800000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#FFD700',
  },
  registerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
