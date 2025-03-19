import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const lightTheme = {
  dark: false,
  colors: {
    primary: '#3B82F6',
    background: '#F8F9FB',
    card: '#FFFFFF',
    text: '#1F2937',
    secondaryText: '#6B7280',
    border: '#E5E7EB',
    notification: '#EF4444',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    input: '#F3F4F6',
    featuredTagBg: '#FEF3C7',
    featuredTagText: '#D97706',
    starColor: '#F59E0B',
    buttonText: '#FFFFFF',
    headerBackground: '#FFFFFF',
    selectedViewBg: 'rgba(59, 130, 246, 0.1)',
    selectedViewText: '#3B82F6',
    unselectedViewText: '#6B7280',
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: '#60A5FA',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    secondaryText: '#9CA3AF',
    border: '#374151',
    notification: '#EF4444',
    cardShadow: 'rgba(0, 0, 0, 0.2)',
    input: '#374151',
    featuredTagBg: '#78350F',
    featuredTagText: '#FEF3C7',
    starColor: '#F59E0B',
    buttonText: '#FFFFFF',
    headerBackground: '#1F2937',
    selectedViewBg: 'rgba(96, 165, 250, 0.1)',
    selectedViewText: '#60A5FA',
    unselectedViewText: '#9CA3AF',
  },
};

type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@theme_preference');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('@theme_preference', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 