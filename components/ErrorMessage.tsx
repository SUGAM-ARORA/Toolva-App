import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/app/context/ThemeContext';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.error }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});