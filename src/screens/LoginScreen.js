import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const authorizedUsers = [
    {email: 'user@nonillionlabs.com', password: '12345678'},
    {email: 'admin@nonillionlabs.com', password: '12345678'},
  ];

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    return password.length >= 8;
  };

  const handleEmailLogin = () => {
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    // Simulate API call to check authorized user
    setTimeout(() => {
      const user = authorizedUsers.find(
        u =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );

      setIsLoading(false);

      if (user) {
        navigation.navigate('home');
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid email or password. Only authorized users can log in.',
        );
      }
    }, 1000);
  };

  const handleSocialLogin = provider => {
    Alert.alert(
      `Social Login`,
      `${provider} login is not implemented in this demo.`,
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="flash" size={60} color="#096B68" />
          <Text style={styles.title}>Nonillion Labs</Text>
          <Text style={styles.subtitle}>Powering Electric Innovation</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={24}
              color="#096B68"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Email"
              placeholderTextColor="#333333"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#096B68"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="Password"
              placeholderTextColor="#333333"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#096B68"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.buttonDisabled]}
          onPress={handleEmailLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>Or sign in with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Google')}>
            <Image
              source={{uri: 'https://www.google.com/favicon.ico'}}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Facebook')}>
            <Image
              source={{uri: 'https://facebook.com/favicon.ico'}}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Twitter')}>
            <Image
              source={{uri: 'https://twitter.com/favicon.ico'}}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#096B68', // Teal for title
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#333333', // Dark gray for subtitle
    textAlign: 'center',
    fontStyle: 'italic',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 107, 104, 0.1)', // Light teal glassmorphism
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(9, 107, 104, 0.3)', // Teal tint
  },
  input: {
    flex: 1,
    height: 52,
    color: '#333333', // Dark gray for text
    fontSize: 16,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: '#FF4D4D', // Bright red for error states
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 12,
  },
  loginButton: {
    backgroundColor: '#096B68', // Teal button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#4B5EAA', // Muted blue for disabled state
  },
  loginButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: '700',
  },
  orText: {
    textAlign: 'center',
    color: '#333333', // Dark gray
    marginVertical: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  socialButton: {
    backgroundColor: 'rgba(9, 107, 104, 0.15)', // Light teal glassmorphism
    borderRadius: 30,
    padding: 12,
    borderWidth: 1,
    borderColor: '#096B68', // Teal border
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default LoginScreen;
