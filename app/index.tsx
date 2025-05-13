import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from './context/ThemeContext';
import { useToolsStore } from './store/toolsStore';
import ToolCard from './components/ToolCard';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const { colors } = useTheme();
  const { 
    filteredTools,
    viewMode,
    sortBy,
    setSortBy,
    getFeaturedTools,
    getPopularTools,
    getNewTools
  } = useToolsStore();

  const sections = [
    { title: 'Featured Tools', data: getFeaturedTools() },
    { title: 'Popular Tools', data: getPopularTools() },
    { title: 'New Tools', data: getNewTools() }
  ];

  const renderToolCard = ({ item, index }) => (
    <ToolCard
      tool={item}
      style={[
        viewMode === 'grid' ? styles.gridCard : styles.listCard,
        viewMode === 'grid' && index % 3 !== 2 && { marginRight: 20 }
      ]}
    />
  );

  const renderSection = ({ section, index }) => (
    <View key={section.title} style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
        {index === 0 && (
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'rating' && { backgroundColor: colors.primary + '20' }
              ]}
              onPress={() => setSortBy('rating')}
            >
              <Ionicons
                name="star"
                size={16}
                color={sortBy === 'rating' ? colors.primary : colors.text}
              />
              <Text
                style={[
                  styles.sortButtonText,
                  { color: sortBy === 'rating' ? colors.primary : colors.text }
                ]}
              >
                Rating
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'reviews' && { backgroundColor: colors.primary + '20' }
              ]}
              onPress={() => setSortBy('reviews')}
            >
              <Ionicons
                name="people"
                size={16}
                color={sortBy === 'reviews' ? colors.primary : colors.text}
              />
              <Text
                style={[
                  styles.sortButtonText,
                  { color: sortBy === 'reviews' ? colors.primary : colors.text }
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'recent' && { backgroundColor: colors.primary + '20' }
              ]}
              onPress={() => setSortBy('recent')}
            >
              <Ionicons
                name="time"
                size={16}
                color={sortBy === 'recent' ? colors.primary : colors.text}
              />
              <Text
                style={[
                  styles.sortButtonText,
                  { color: sortBy === 'recent' ? colors.primary : colors.text }
                ]}
              >
                Recent
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={section.data}
        renderItem={renderToolCard}
        keyExtractor={(item) => item.id}
        horizontal={index === 0}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          index === 0 ? styles.featuredList : styles.toolsGrid,
          viewMode === 'grid' && index !== 0 && styles.gridContainer
        ]}
        numColumns={index === 0 ? 1 : (viewMode === 'grid' ? 3 : 1)}
        key={viewMode} // Force re-render on view mode change
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featuredList: {
    gap: 20,
  },
  toolsGrid: {
    gap: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCard: {
    flex: 1,
    minWidth: '30%',
    maxWidth: '32%',
  },
  listCard: {
    width: '100%',
    marginBottom: 20,
  },
}); 