import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Star } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const categories = [
  { id: 'all', name: 'All', count: 175 },
  { id: 'chatbots', name: 'Chatbots', count: 7 },
  { id: 'image', name: 'Image Generation', count: 7 },
  { id: 'code', name: 'Code', count: 8 },
  { id: 'music', name: 'Music', count: 5 },
  { id: 'video', name: 'Video', count: 8 },
];

const featuredTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Advanced language model for conversation and text generation',
    category: 'Chatbots',
    rating: 4.8,
    pricing: 'Free / $20 monthly',
    users: '100M+',
    model: 'GPT-4',
    image: 'https://images.unsplash.com/photo-1684163800569-e4e0f8b72408?w=800&auto=format&fit=crop'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Next-generation AI model with advanced reasoning capabilities',
    category: 'Chatbots',
    rating: 4.7,
    pricing: 'Free / $10 monthly',
    users: '50M+',
    model: 'Gemini Ultra',
    image: 'https://images.unsplash.com/photo-1685094488371-d12d6f0aeec0?w=800&auto=format&fit=crop'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Advanced coding assistant with deep understanding of software development',
    category: 'Code',
    rating: 4.6,
    pricing: 'Free Beta',
    users: '1M+',
    model: 'DeepSeek Coder',
    image: 'https://images.unsplash.com/photo-1686591092303-3b4e06b7c54e?w=800&auto=format&fit=crop'
  }
];

export default function DiscoverScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover AI Tools</Text>
          <Text style={styles.subtitle}>Find the perfect AI tool for your needs</Text>
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
                selectedCategory === category.id && styles.categoryButtonActive
              ]}>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
              <Text style={[
                styles.categoryCount,
                selectedCategory === category.id && styles.categoryCountActive
              ]}>
                {category.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Tools</Text>
          {featuredTools.map((tool, index) => (
            <Animated.View 
              key={tool.id}
              entering={FadeInUp.delay(index * 200)}
              style={styles.toolCard}>
              <Image source={{ uri: tool.image }} style={styles.toolImage} />
              <TouchableOpacity style={styles.favoriteButton}>
                <Heart size={20} color="#64748b" />
              </TouchableOpacity>
              <View style={styles.toolContent}>
                <View style={styles.toolHeader}>
                  <Text style={styles.toolName}>{tool.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#f59e0b" fill="#f59e0b" />
                    <Text style={styles.rating}>{tool.rating}</Text>
                  </View>
                </View>
                <Text style={styles.toolDescription}>{tool.description}</Text>
                <View style={styles.toolMeta}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{tool.category}</Text>
                  </View>
                  <Text style={styles.pricing}>{tool.pricing}</Text>
                </View>
                <View style={styles.toolStats}>
                  <Text style={styles.statsText}>Daily Users: {tool.users}</Text>
                  <Text style={styles.statsText}>Model: {tool.model}</Text>
                </View>
                <TouchableOpacity style={styles.tryButton}>
                  <Text style={styles.tryButtonText}>Try Now</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
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
    backgroundColor: '#1e293b',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#3b82f6',
  },
  categoryText: {
    color: '#94a3b8',
    fontSize: 14,
    marginRight: 8,
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  categoryCount: {
    color: '#64748b',
    fontSize: 12,
  },
  categoryCountActive: {
    color: '#bfdbfe',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  toolCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  toolImage: {
    width: '100%',
    height: 200,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 8,
  },
  toolContent: {
    padding: 20,
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#f59e0b',
    marginLeft: 4,
    fontWeight: '600',
  },
  toolDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
    lineHeight: 20,
  },
  toolMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  pricing: {
    color: '#64748b',
    fontSize: 14,
  },
  toolStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsText: {
    color: '#64748b',
    fontSize: 12,
  },
  tryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});