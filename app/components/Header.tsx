import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useToolsStore } from '../store/toolsStore';

export default function Header() {
  const { colors, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useToolsStore();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.leftSection}>
        <Text style={[styles.logo, { color: colors.text }]}>Toolva</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Directory</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: colors.background }]}>
          <Ionicons name="search" size={20} color={colors.text} />
          <TextInput
            placeholder="Search tools..."
            placeholderTextColor={colors.text + '80'}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.text} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.viewToggle}>
          <TouchableOpacity 
            style={[
              styles.toggleButton,
              viewMode === 'grid' && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setViewMode('grid')}
          >
            <Ionicons 
              name="grid" 
              size={20} 
              color={viewMode === 'grid' ? colors.primary : colors.text} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.toggleButton,
              viewMode === 'list' && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons 
              name="list" 
              size={20} 
              color={viewMode === 'list' ? colors.primary : colors.text} 
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons name="moon" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signInButton, { backgroundColor: colors.primary }]}>
          <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    opacity: 0.7,
  },
  searchContainer: {
    flex: 1,
    maxWidth: 600,
    marginHorizontal: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 8,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 