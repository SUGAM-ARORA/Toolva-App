import { makeAutoObservable, runInAction } from 'mobx';
import { AITool, AIToolCategory } from '../types/ai-tools';
import { api } from '../services/api';

export class ToolStore {
  tools: AITool[] = [];
  categories: { category: AIToolCategory; count: number }[] = [];
  favorites: Set<string> = new Set();
  loading = false;
  error: string | null = null;
  selectedCategory: AIToolCategory | null = null;
  searchQuery = '';
  sortBy: 'rating' | 'popularity' | 'name' | null = null;
  viewMode: 'grid' | 'list' = 'grid';
  itemsPerPage = 12;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize() {
    await api.initialize();
    await this.loadTools();
    await this.loadCategories();
  }

  *loadTools() {
    try {
      this.loading = true;
      this.error = null;
      const response = await api.getTools({
        category: this.selectedCategory || undefined,
        search: this.searchQuery || undefined,
        sort: this.sortBy || undefined,
        favorites: false,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      runInAction(() => {
        this.tools = response.data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to load tools';
        this.loading = false;
      });
    }
  }

  *loadCategories() {
    try {
      const response = await api.getCategories();
      if (response.error) {
        throw new Error(response.error);
      }

      runInAction(() => {
        this.categories = response.data;
      });
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  }

  *toggleFavorite(toolId: string) {
    try {
      const response = await api.toggleFavorite(toolId);
      if (response.error) {
        throw new Error(response.error);
      }

      runInAction(() => {
        if (response.data) {
          this.favorites.add(toolId);
        } else {
          this.favorites.delete(toolId);
        }
      });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  }

  setSelectedCategory(category: AIToolCategory | null) {
    this.selectedCategory = category;
    this.loadTools();
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.loadTools();
  }

  setSortBy(sort: 'rating' | 'popularity' | 'name' | null) {
    this.sortBy = sort;
    this.loadTools();
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  setItemsPerPage(count: number) {
    this.itemsPerPage = count;
  }

  get filteredTools() {
    return this.tools;
  }

  get favoriteTools() {
    return this.tools.filter(tool => this.favorites.has(tool.id));
  }

  get categoryOptions() {
    return this.categories.map(({ category, count }) => ({
      label: `${category} (${count})`,
      value: category,
    }));
  }

  get hasMore() {
    return this.tools.length > this.itemsPerPage;
  }
}

export const toolStore = new ToolStore(); 