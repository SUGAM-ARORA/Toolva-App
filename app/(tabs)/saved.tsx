import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Star } from 'lucide-react-native';

const savedTools = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Create stunning artwork and illustrations with AI',
    category: 'Image Generation',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1683009427513-28e163402d16?w=800&auto=format&fit=crop'
  },
  {
    id: 'claude',
    name: 'Claude AI',
    description: 'Advanced AI assistant for research and analysis',
    category: 'Chatbots',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1684163800569-e4e0f8b72408?w=800&auto=format&fit=crop'
  }
];

export default function SavedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Tools</Text>
        <Text style={styles.subtitle}>Your favorite AI tools collection</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}>
        {savedTools.map((tool) => (
          <View key={tool.id} style={styles.toolCard}>
            <Image source={{ uri: tool.image }} style={styles.toolImage} />
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart size={20} color="#ef4444" fill="#ef4444" />
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
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{tool.category}</Text>
              </View>
              <TouchableOpacity style={styles.openButton}>
                <Text style={styles.openButtonText}>Open</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    padding: 20,
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
  badge: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  openButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});