import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Image, Code, Music, Video, PenTool } from 'lucide-react-native';

const tools = [
  {
    id: 'chat',
    name: 'Chat',
    description: 'Talk with AI assistants',
    icon: MessageSquare,
    color: '#3b82f6',
  },
  {
    id: 'image',
    name: 'Image',
    description: 'Generate and edit images',
    icon: Image,
    color: '#8b5cf6',
  },
  {
    id: 'code',
    name: 'Code',
    description: 'Write and debug code',
    icon: Code,
    color: '#10b981',
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Create and edit music',
    icon: Music,
    color: '#f59e0b',
  },
  {
    id: 'video',
    name: 'Video',
    description: 'Edit and generate videos',
    icon: Video,
    color: '#ef4444',
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Write and edit content',
    icon: PenTool,
    color: '#6366f1',
  },
];

export default function PlaygroundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Playground</Text>
        <Text style={styles.subtitle}>Try out different AI tools</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <TouchableOpacity
                key={tool.id}
                style={[styles.toolCard, { borderColor: tool.color }]}>
                <View style={[styles.iconContainer, { backgroundColor: tool.color }]}>
                  <Icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.toolName}>{tool.name}</Text>
                <Text style={styles.toolDescription}>{tool.description}</Text>
              </TouchableOpacity>
            );
          })}
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
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  toolDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
});