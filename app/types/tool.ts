export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string[];
  pricing: 'Free' | 'Paid' | 'Freemium';
  website: string;
  features: string[];
  rating: number;
  reviews: number;
  imageUrl: any; // For local images
  tags: string[];
  lastUpdated: string;
  dailyUsers: string;
  modelType: string;
  featured?: boolean;
} 