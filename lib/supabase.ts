import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import Constants from 'expo-constants';

// Get environment variables with fallbacks to process.env
const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL ?? 'https://flimkcsudmancpknkvfe.supabase.co';
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaW1rY3N1ZG1hbmNwa25rdmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NTc5MzYsImV4cCI6MjA2MTMzMzkzNn0.S_WsR4WmeLOEuSCiZBnPBp5pfkbatKYowTFLj1wLkNI';

// Validate Supabase URL and key
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Helper function to safely interact with localStorage
const safeLocalStorage = {
  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          resolve(window.localStorage.getItem(key));
        } catch (e) {
          console.warn('Error accessing localStorage:', e);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  },
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem(key, value);
        } catch (e) {
          console.warn('Error accessing localStorage:', e);
        }
      }
      resolve();
    });
  },
  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.removeItem(key);
        } catch (e) {
          console.warn('Error accessing localStorage:', e);
        }
      }
      resolve();
    });
  },
};

// Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: safeLocalStorage,
  },
});