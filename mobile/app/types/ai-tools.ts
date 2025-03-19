export enum AIToolCategory {
  CHAT = 'Chatbots',
  IMAGE = 'Image Generation',
  AUDIO = 'Audio Processing',
  VIDEO = 'Video Creation',
  CODE = 'Code Generation',
  OTHER = 'Other'
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: AIToolCategory;
  features: string[];
  pricing: string;
  modelType: string;
  dailyUsers: string;
  isPopular: boolean;
  rating: number;
  usageCount: number;
  iosAppUrl?: string;
  androidAppUrl?: string;
  iosStoreUrl?: string;
  androidStoreUrl?: string;
  websiteUrl?: string;
}

export interface AIToolResponse {
  success: boolean;
  data?: any;
  error?: string;
} 