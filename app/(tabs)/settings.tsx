import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Moon, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useState } from 'react';

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
      { id: 'privacy', icon: Shield, label: 'Privacy Settings', type: 'link' },
      { id: 'help', icon: HelpCircle, label: 'Help & Support', type: 'link' },
      { id: 'logout', icon: LogOut, label: 'Log Out', type: 'button' },
    ],
  },
];

export default function SettingsScreen() {
  const [switches, setSwitches] = useState({
    darkMode: true,
    notifications: true,
  });

  const toggleSwitch = (id: string) => {
    setSwitches(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>

      <ScrollView style={styles.content}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.settingItem}
                    onPress={() => item.type === 'switch' && toggleSwitch(item.id)}>
                    <View style={styles.settingItemLeft}>
                      <Icon size={20} color="#64748b" />
                      <Text style={styles.settingItemLabel}>{item.label}</Text>
                    </View>
                    {item.type === 'switch' ? (
                      <Switch
                        value={switches[item.id as keyof typeof switches]}
                        onValueChange={() => toggleSwitch(item.id)}
                        trackColor={{ false: '#1e293b', true: '#3b82f6' }}
                        thumbColor={switches[item.id as keyof typeof switches] ? '#ffffff' : '#94a3b8'}
                      />
                    ) : item.type === 'link' ? (
                      <ChevronRight size={20} color="#64748b" />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.info}>
          <Text style={styles.version}>Version 1.0.0</Text>
          
          <Text style={styles.copyright}>© 2024 Toolva. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
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
    color: '#ffffff',
    marginBottom: 16,
  },
  sectionContent: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  info: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#475569',
  },
});