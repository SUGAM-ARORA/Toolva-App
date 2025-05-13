import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useToolsStore } from '../store/toolsStore';
import { AITool } from '../types/tool';

interface ToolCardProps {
  tool: AITool;
  style?: any;
}

export default function ToolCard({ tool, style }: ToolCardProps) {
  const { colors } = useTheme();
  const { favorites, toggleFavorite } = useToolsStore();
  const isFavorite = favorites.includes(tool.id);

  const handleTryNow = () => {
    Linking.openURL(tool.website);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }, style]}>
      {tool.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(tool.id)}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? "#FF4B4B" : colors.text} 
        />
      </TouchableOpacity>

      <Image 
        source={tool.imageUrl} 
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: colors.text }]}>{tool.name}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {tool.rating} ({tool.reviews.toLocaleString()})
            </Text>
          </View>
        </View>

        <Text style={[styles.description, { color: colors.text }]} numberOfLines={2}>
          {tool.description}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: colors.text }]}>Category</Text>
            <Text style={[styles.metaValue, { color: colors.text }]}>{tool.category[0]}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: colors.text }]}>Pricing</Text>
            <Text 
              style={[
                styles.metaValue, 
                { color: tool.pricing === 'Free' ? '#4CAF50' : colors.primary }
              ]}
            >
              {tool.pricing}
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: colors.text }]}>Daily Users</Text>
            <Text style={[styles.metaValue, { color: colors.text }]}>{tool.dailyUsers}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: colors.text }]}>Model Type</Text>
            <Text style={[styles.metaValue, { color: colors.text }]}>{tool.modelType}</Text>
          </View>
        </View>

        <View style={styles.tags}>
          {tool.tags.slice(0, 3).map((tag, index) => (
            <View 
              key={index}
              style={[styles.tag, { backgroundColor: colors.primary + '20' }]}
            >
              <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.tryButton, { backgroundColor: colors.primary }]}
          onPress={handleTryNow}
        >
          <Text style={styles.tryButtonText}>Try Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  featuredText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    gap: 4,
  },
  metaLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tryButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 