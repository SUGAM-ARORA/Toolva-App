import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@/app/context/ThemeContext';

export function LoadingSpinner() {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});