import { AITool } from '../types/tool';

export const tools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced AI language model for conversation and content generation',
    category: ['Language', 'Content Generation'],
    pricing: 'Freemium',
    website: 'https://chat.openai.com',
    features: ['Conversation', 'Content Writing', 'Code Generation', 'Translation'],
    rating: 4.8,
    reviews: 12000,
    imageUrl: require('../../assets/images/chatgpt.jpg'),
    tags: ['AI', 'Chatbot', 'GPT', 'OpenAI'],
    lastUpdated: '2024-03-15'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation tool for creating stunning visuals',
    category: ['Image Generation', 'Art'],
    pricing: 'Paid',
    website: 'https://www.midjourney.com',
    features: ['Image Generation', 'Style Transfer', 'Art Creation'],
    rating: 4.7,
    reviews: 8500,
    imageUrl: require('../../assets/placeholder.png'),
    tags: ['AI', 'Image Generation', 'Art', 'Design'],
    lastUpdated: '2024-03-10'
  },
  {
    id: '3',
    name: 'Grammarly',
    description: 'AI-powered writing assistant for grammar and style checking',
    category: ['Writing', 'Productivity'],
    pricing: 'Freemium',
    website: 'https://www.grammarly.com',
    features: ['Grammar Check', 'Style Suggestions', 'Plagiarism Detection'],
    rating: 4.6,
    reviews: 15000,
    imageUrl: require('../../assets/placeholder.png'),
    tags: ['AI', 'Writing', 'Grammar', 'Productivity'],
    lastUpdated: '2024-03-12'
  }
]; 