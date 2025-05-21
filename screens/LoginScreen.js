import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../App';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { signIn } = useContext(AuthContext);
  
  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setError('');
    try {
      await signIn(username, password);
    } catch (e) {
      setError('Login failed. Please try again.');
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#121212', '#1e1e1e']}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>QByte</Text>
            <Text style={styles.tagline}>Quantum Data Processing</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#aaa',
  },
  formContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: '#ddd',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#7B68EE',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
