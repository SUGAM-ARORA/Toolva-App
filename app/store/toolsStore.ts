import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Tool = Database['public']['Tables']['tools']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];
type Favorite = Database['public']['Tables']['favorites']['Row'];

interface ToolsState {
  tools: Tool[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  favorites: Set<string>;
  reviews: { [key: string]: Review[] };
  popularTools: Tool[];
  trendingTools: Tool[];
  categoryStats: any[];
  fetchTools: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
  searchTools: (query: string) => void;
  toggleFavorite: (toolId: string) => Promise<void>;
  getFavoriteTools: () => Tool[];
  getFilteredTools: () => Tool[];
  fetchReviews: (toolId: string) => Promise<void>;
  addReview: (review: Omit<Review, 'id' | 'created_at'>) => Promise<void>;
  fetchPopularTools: () => Promise<void>;
  fetchTrendingTools: () => Promise<void>;
  fetchCategoryStats: () => Promise<void>;
}

export const useToolsStore = create<ToolsState>((set, get) => ({
  tools: [],
  loading: false,
  error: null,
  selectedCategory: 'all',
  searchQuery: '',
  favorites: new Set(),
  reviews: {},
  popularTools: [],
  trendingTools: [],
  categoryStats: [],

  fetchTools: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      set({ tools: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching tools:', error);
      set({ error: 'Failed to fetch tools', loading: false });
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  searchTools: async (query) => {
    set({ loading: true, searchQuery: query });
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .ilike('name', `%${query}%`)
        .or(`description.ilike.%${query}%`);

      if (error) throw error;
      set({ tools: data || [], loading: false });
    } catch (error) {
      console.error('Search failed:', error);
      set({ loading: false });
    }
  },

  toggleFavorite: async (toolId) => {
    const { favorites } = get();
    const newFavorites = new Set(favorites);
    const userId = (await supabase.auth.getUser()).data.user?.id;

    if (!userId) {
      set({ error: 'Please sign in to save favorites' });
      return;
    }

    try {
      if (newFavorites.has(toolId)) {
        await supabase
          .from('favorites')
          .delete()
          .match({ user_id: userId, tool_id: toolId });
        newFavorites.delete(toolId);
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: userId, tool_id: toolId });
        newFavorites.add(toolId);
      }
      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Failed to update favorites:', error);
      set({ error: 'Failed to update favorites' });
    }
  },

  getFavoriteTools: () => {
    const state = get();
    return state.tools.filter(tool => state.favorites.has(tool.id));
  },

  getFilteredTools: () => {
    const state = get();
    let filtered = state.tools;

    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(tool => 
        tool.category.toLowerCase() === state.selectedCategory.toLowerCase()
      );
    }

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  fetchReviews: async (toolId) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('tool_id', toolId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set(state => ({
        reviews: {
          ...state.reviews,
          [toolId]: data || []
        }
      }));
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  },

  addReview: async (review) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert(review)
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        reviews: {
          ...state.reviews,
          [review.tool_id]: [...(state.reviews[review.tool_id] || []), data]
        }
      }));
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  },

  fetchPopularTools: async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*, reviews(count)')
        .order('rating', { ascending: false })
        .limit(10);

      if (error) throw error;
      set({ popularTools: data || [] });
    } catch (error) {
      console.error('Failed to fetch popular tools:', error);
    }
  },

  fetchTrendingTools: async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*, reviews!inner(*)')
        .gte('reviews.created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('rating', { ascending: false })
        .limit(10);

      if (error) throw error;
      set({ trendingTools: data || [] });
    } catch (error) {
      console.error('Failed to fetch trending tools:', error);
    }
  },

  fetchCategoryStats: async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('category, rating')
        .order('category');

      if (error) throw error;

      const stats = data.reduce((acc: any[], curr) => {
        const existing = acc.find(item => item.category === curr.category);
        if (existing) {
          existing.count++;
          existing.totalRating += curr.rating;
        } else {
          acc.push({
            category: curr.category,
            count: 1,
            totalRating: curr.rating
          });
        }
        return acc;
      }, []).map(item => ({
        ...item,
        avgRating: item.totalRating / item.count
      }));

      set({ categoryStats: stats });
    } catch (error) {
      console.error('Failed to fetch category stats:', error);
    }
  },
}));