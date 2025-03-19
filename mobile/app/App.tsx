import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import AIToolsScreen from './screens/AIToolsScreen';
import { api } from './services/api';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { theme, isDark } = useTheme();

  useEffect(() => {
    const initializeApp = async () => {
      await api.initialize();
    };
    initializeApp();
  }, []);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AITools" component={AIToolsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
} 