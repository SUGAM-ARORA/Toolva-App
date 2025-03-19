import { AITool, AIToolCategory } from '../types/ai-tools';
import { aiTools as staticTools } from '../data/ai-tools';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
const FAVORITES_KEY = '@toolva_favorites';
const TOOLS_KEY = '@toolva_tools';
const CATEGORIES_KEY = '@toolva_categories';

// Types
export interface APIResponse<T> {
  data: T;
  error?: string;
}

// API Service
class APIService {
  private static instance: APIService;
  private tools: AITool[] = [];
  private favorites: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  // Initialize the service
  public async initialize(): Promise<void> {
    await this.loadTools();
    await this.loadFavorites();
  }

  // Load tools from storage or static data
  private async loadTools(): Promise<void> {
    try {
      const storedTools = await AsyncStorage.getItem(TOOLS_KEY);
      if (storedTools) {
        this.tools = JSON.parse(storedTools);
      } else {
        this.tools = staticTools;
        await AsyncStorage.setItem(TOOLS_KEY, JSON.stringify(staticTools));
      }
    } catch (error) {
      console.error('Error loading tools:', error);
      this.tools = staticTools;
    }
  }

  // Load favorites from storage
  private async loadFavorites(): Promise<void> {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        this.favorites = new Set(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }

  // Get all tools with optional filters
  public async getTools(params?: {
    category?: AIToolCategory;
    search?: string;
    sort?: 'rating' | 'popularity' | 'name';
    favorites?: boolean;
  }): Promise<APIResponse<AITool[]>> {
    try {
      let filteredTools = [...this.tools];

      // Apply category filter
      if (params?.category) {
        filteredTools = filteredTools.filter(tool => tool.category === params.category);
      }

      // Apply search filter
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredTools = filteredTools.filter(tool =>
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.category.toLowerCase().includes(searchLower) ||
          tool.modelType.toLowerCase().includes(searchLower)
        );
      }

      // Apply favorites filter
      if (params?.favorites) {
        filteredTools = filteredTools.filter(tool => this.favorites.has(tool.id));
      }

      // Apply sorting
      if (params?.sort) {
        switch (params.sort) {
          case 'rating':
            filteredTools.sort((a, b) => b.rating - a.rating);
            break;
          case 'popularity':
            filteredTools.sort((a, b) => Number(b.dailyUsers.replace(/[^0-9.]/g, '')) - Number(a.dailyUsers.replace(/[^0-9.]/g, '')));
            break;
          case 'name':
            filteredTools.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
      }

      return { data: filteredTools };
    } catch (error) {
      return { data: [], error: 'Failed to fetch tools' };
    }
  }

  // Get a single tool by ID
  public async getTool(id: string): Promise<APIResponse<AITool | null>> {
    try {
      const tool = this.tools.find(t => t.id === id);
      return { data: tool || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch tool' };
    }
  }

  // Get all categories with tool counts
  public async getCategories(): Promise<APIResponse<{ category: AIToolCategory; count: number }[]>> {
    try {
      const categories = Object.values(AIToolCategory).map(category => ({
        category,
        count: this.tools.filter(tool => tool.category === category).length,
      }));
      return { data: categories };
    } catch (error) {
      return { data: [], error: 'Failed to fetch categories' };
    }
  }

  // Toggle favorite status for a tool
  public async toggleFavorite(toolId: string): Promise<APIResponse<boolean>> {
    try {
      if (this.favorites.has(toolId)) {
        this.favorites.delete(toolId);
      } else {
        this.favorites.add(toolId);
      }
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...this.favorites]));
      return { data: this.favorites.has(toolId) };
    } catch (error) {
      return { data: false, error: 'Failed to update favorite status' };
    }
  }

  // Check if a tool is favorited
  public async isFavorite(toolId: string): Promise<APIResponse<boolean>> {
    try {
      return { data: this.favorites.has(toolId) };
    } catch (error) {
      return { data: false, error: 'Failed to check favorite status' };
    }
  }

  // Submit a new tool
  public async submitTool(tool: Omit<AITool, 'id' | 'rating' | 'usageCount' | 'dailyUsers'>): Promise<APIResponse<AITool>> {
    try {
      const newTool: AITool = {
        ...tool,
        id: `${tool.category.toLowerCase()}-${Date.now()}`,
        rating: 0,
        usageCount: 0,
        dailyUsers: '0',
      };

      this.tools.push(newTool);
      await AsyncStorage.setItem(TOOLS_KEY, JSON.stringify(this.tools));
      return { data: newTool };
    } catch (error) {
      return { data: {} as AITool, error: 'Failed to submit tool' };
    }
  }

  // Update tool information
  public async updateTool(id: string, updates: Partial<AITool>): Promise<APIResponse<AITool>> {
    try {
      const index = this.tools.findIndex(t => t.id === id);
      if (index === -1) {
        return { data: {} as AITool, error: 'Tool not found' };
      }

      this.tools[index] = { ...this.tools[index], ...updates };
      await AsyncStorage.setItem(TOOLS_KEY, JSON.stringify(this.tools));
      return { data: this.tools[index] };
    } catch (error) {
      return { data: {} as AITool, error: 'Failed to update tool' };
    }
  }
}

export const api = APIService.getInstance(); 