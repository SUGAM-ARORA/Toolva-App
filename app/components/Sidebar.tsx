import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useToolsStore } from '../store/toolsStore';

interface Category {
  icon: keyof typeof Ionicons.glyphs;
  name: string;
}

const categories: Category[] = [
  { icon: 'grid', name: 'All' },
  { icon: 'chatbubbles', name: 'Chatbots' },
  { icon: 'image', name: 'Image Generation' },
  { icon: 'code-slash', name: 'Code' },
  { icon: 'musical-notes', name: 'Music' },
  { icon: 'videocam', name: 'Video' },
  { icon: 'pencil', name: 'Writing' },
  { icon: 'school', name: 'Education' },
  { icon: 'business', name: 'Business' },
  { icon: 'code', name: 'APIs' },
  { icon: 'search', name: 'Research' },
  { icon: 'color-palette', name: 'Design' },
  { icon: 'game-controller', name: 'Gaming' },
  { icon: 'analytics', name: 'Analytics' },
  { icon: 'headset', name: 'Audio' },
  { icon: 'cube', name: '3D' },
];

export default function Sidebar() {
  const { colors } = useTheme();
  const { selectedCategory, setSelectedCategory, tools } = useToolsStore();

  const getCategoryCount = (category: string) => {
    if (category === 'All') return tools.length;
    return tools.filter(tool => tool.category.includes(category)).length;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>Categories</Text>
      <ScrollView style={styles.categoriesList}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.categoryItem,
              selectedCategory === category.name && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <View style={styles.categoryContent}>
              <Ionicons
                name={category.icon}
                size={20}
                color={selectedCategory === category.name ? colors.primary : colors.text}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === category.name ? colors.primary : colors.text }
                ]}
              >
                {category.name}
              </Text>
            </View>
            <Text
              style={[
                styles.categoryCount,
                { color: selectedCategory === category.name ? colors.primary : colors.text }
              ]}
            >
              {getCategoryCount(category.name)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  categoriesList: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryText: {
    fontSize: 16,
  },
  categoryCount: {
    fontSize: 14,
    opacity: 0.7,
  },
}); 