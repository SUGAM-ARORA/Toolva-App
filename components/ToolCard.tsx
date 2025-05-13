import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { Heart, Star } from 'lucide-react-native';
import { useTheme } from '@/app/context/ThemeContext';
import { AITool } from '@/app/store/toolsStore';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface ToolCardProps {
  tool: AITool;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
}

export function ToolCard({ tool, index, isFavorite, onToggleFavorite, onPress }: ToolCardProps) {
  const { theme } = useTheme();

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={[
        styles.container,
        { backgroundColor: theme.card }
      ]}>
      <Image source={{ uri: tool.imageUrl }} style={styles.image} />
      <TouchableOpacity
        style={[styles.favoriteButton, { backgroundColor: theme.overlay }]}
        onPress={onToggleFavorite}>
        <Heart
          size={20}
          color={isFavorite ? theme.error : theme.textTertiary}
          fill={isFavorite ? theme.error : 'transparent'}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: theme.text }]}>{tool.name}</Text>
          <View style={styles.rating}>
            <Star size={16} color={theme.warning} fill={theme.warning} />
            <Text style={[styles.ratingText, { color: theme.warning }]}>
              {tool.rating}
            </Text>
          </View>
        </View>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {tool.description}
        </Text>
        <View style={styles.meta}>
          <View style={[styles.badge, { backgroundColor: theme.badge }]}>
            <Text style={[styles.badgeText, { color: theme.text }]}>
              {tool.category}
            </Text>
          </View>
          <Text style={[styles.pricing, { color: theme.textTertiary }]}>
            {tool.pricing}
          </Text>
        </View>
        <View style={styles.stats}>
          <Text style={[styles.statsText, { color: theme.textTertiary }]}>
            Users: {tool.users}
          </Text>
          <Text style={[styles.statsText, { color: theme.textTertiary }]}>
            Model: {tool.model}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={onPress}>
          <Text style={styles.buttonText}>Try Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        ':hover': {
          transform: 'translateY(-4px)',
        },
      },
    }),
  },
  image: {
    width: '100%',
    height: 200,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
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
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  pricing: {
    fontSize: 14,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsText: {
    fontSize: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});