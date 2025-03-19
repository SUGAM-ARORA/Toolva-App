import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3B82F6',
    secondary: '#6366F1',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB',
    notification: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    input: '#F3F4F6',
    placeholder: '#9CA3AF',
    overlay: 'rgba(0, 0, 0, 0.1)',
    cardShadow: '#F3F4F6',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#3B82F6',
    secondary: '#6366F1',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    border: '#374151',
    notification: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    input: '#374151',
    placeholder: '#6B7280',
    overlay: 'rgba(0, 0, 0, 0.4)',
    cardShadow: '#000000',
  },
};

export type Theme = typeof lightTheme; 