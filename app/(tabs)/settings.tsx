import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Moon, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const settingsSections = [
  {
    title: 'Preferences',
    items: [
      { id: 'darkMode', icon: Moon, label: 'Dark Mode', type: 'switch' },
      { id: 'notifications', icon: Bell, label: 'Notifications', type: 'switch' },
    ],
  },
  {
    title: 'Account',
    items: [
      { id: 'privacy', icon: Shield, label: 'Privacy Settings', type: 'link', url: 'https://toolva.com/privacy' },
      { id: 'help', icon: HelpCircle, label: 'Help & Support', type: 'link', url: 'https://toolva.com/support' },
      { id: 'logout', icon: LogOut, label: 'Log Out', type: 'button' },
    ],
  },
];

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  const handlePress = (item: any) => {
    if (item.type === 'link' && item.url) {
      Linking.openURL(item.url);
    } else if (item.id === 'logout') {
      // Implement logout logic
      console.log('Logout pressed');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: theme.textTertiary }]}>
          Customize your experience
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {section.title}
            </Text>
            <View style={[styles.sectionContent, { backgroundColor: theme.card }]}>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.settingItem, { borderBottomColor: theme.border }]}
                    onPress={() => handlePress(item)}>
                    <View style={styles.settingItemLeft}>
                      <Icon size={20} color={theme.textTertiary} />
                      <Text style={[styles.settingItemLabel, { color: theme.text }]}>
                        {item.label}
                      </Text>
                    </View>
                    {item.id === 'darkMode' ? (
                      <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: theme.border, true: theme.primary }}
                        thumbColor={isDark ? '#ffffff' : theme.textSecondary}
                      />
                    ) : item.type === 'switch' ? (
                      <Switch
                        value={false}
                        onValueChange={() => {}}
                        trackColor={{ false: theme.border, true: theme.primary }}
                        thumbColor={theme.textSecondary}
                      />
                    ) : item.type === 'link' ? (
                      <ChevronRight size={20} color={theme.textTertiary} />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.info}>
          <Text style={[styles.version, { color: theme.textTertiary }]}>
            Version 1.0.0
          </Text>
          <Text style={[styles.copyright, { color: theme.textTertiary }]}>
            © 2024 Toolva. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  info: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
  },
});