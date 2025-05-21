import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';

// Import screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import QByteScreen from './screens/QByteScreen';
import QByteVisualizationScreen from './screens/QByteVisualizationScreen';

// Create the navigator
const Stack = createNativeStackNavigator();

// Create a context for authentication
export const AuthContext = React.createContext();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // Authentication functions
  const authContext = React.useMemo(() => ({
    signIn: async (username, password) => {
      // In a real app, validate credentials against a backend
      // For this demo, we'll accept any non-empty username/password
      if (username && password) {
        try {
          // Store the token
          await SecureStore.setItemAsync('userToken', 'demo-token');
          setUserToken('demo-token');
        } catch (e) {
          console.log('Error storing the token', e);
        }
      }
    },
    signOut: async () => {
      try {
        await SecureStore.deleteItemAsync('userToken');
        setUserToken(null);
      } catch (e) {
        console.log('Error removing the token', e);
      }
    },
  }), []);

  // Check if user is already logged in
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token = null;
      
      try {
        token = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log('Error retrieving the token', e);
      }
      
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    // We could show a loading screen here
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#1e1e1e',
            },
          }}
        >
          {userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'QByte Login',
                // When logging in, don't show a back button
                headerLeft: () => null,
              }}
            />
          ) : (
            // User is signed in
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'QByte Dashboard',
                }}
              />
              <Stack.Screen
                name="QByte"
                component={QByteScreen}
                options={{
                  title: 'QByte Processing',
                }}
              />
              <Stack.Screen
                name="QByteVisualization"
                component={QByteVisualizationScreen}
                options={{
                  title: 'QByte Visualization',
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
