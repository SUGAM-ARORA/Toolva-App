import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { toolStore } from '../store/ToolStore';

const Header = observer(() => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Tools Directory
        </Text>
        <View style={styles.rightButtons}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={20}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => {
              Alert.alert('Coming Soon', 'Sign in functionality will be available soon!');
            }}
          >
            <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={[styles.searchWrapper, { backgroundColor: theme.colors.input }]}>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search tools..."
            placeholderTextColor={theme.colors.secondaryText}
            value={toolStore.searchQuery}
            onChangeText={(text) => toolStore.setSearchQuery(text)}
          />
          <Ionicons name="search" size={20} color={theme.colors.secondaryText} />
        </View>
      </View>
      {toolStore.categories.length > 0 && (
        <View style={[styles.categories, { borderTopColor: theme.colors.border }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                !toolStore.selectedCategory && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => toolStore.setSelectedCategory(null)}
            >
              <Text
                style={[
                  styles.categoryText,
                  !toolStore.selectedCategory && { color: theme.colors.buttonText },
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            {toolStore.categories.map(({ category, count }) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  toolStore.selectedCategory === category && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => toolStore.setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    toolStore.selectedCategory === category && { color: theme.colors.buttonText },
                  ]}
                >
                  {category} ({count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  signInText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  categories: {
    borderTopWidth: 1,
    paddingVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
});

export default Header; 