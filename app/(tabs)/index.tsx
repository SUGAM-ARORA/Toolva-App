import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useToolsStore } from '../store/toolsStore';
import { categories } from '../store/toolsData';
import { ToolCard } from '@/components/ToolCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const {
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    fetchTools,
    getFilteredTools,
    toggleFavorite,
    favorites,
  } = useToolsStore();

  useEffect(() => {
    fetchTools();
  }, []);

  const filteredTools = getFilteredTools();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Discover AI Tools
          </Text>
          <Text style={[styles.subtitle, { color: theme.textTertiary }]}>
            Find the perfect AI tool for your needs
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedCategory === category.id ? theme.primary : theme.card,
                },
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === category.id
                        ? '#ffffff'
                        : theme.textTertiary,
                  },
                ]}>
                {category.name}
              </Text>
              <Text
                style={[
                  styles.categoryCount,
                  {
                    color:
                      selectedCategory === category.id
                        ? theme.overlay
                        : theme.textTertiary,
                  },
                ]}>
                {category.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Featured Tools
          </Text>
          {filteredTools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              index={index}
              isFavorite={favorites.has(tool.id)}
              onToggleFavorite={() => toggleFavorite(tool.id)}
              onPress={() => {
                // Handle tool selection
                console.log('Selected tool:', tool.name);
              }}
            />
          ))}
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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    marginRight: 8,
  },
  categoryCount: {
    fontSize: 12,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});