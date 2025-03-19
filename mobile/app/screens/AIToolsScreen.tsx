import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Linking,
  Platform,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTheme } from '../context/ThemeContext';
import { AITool } from '../types/ai-tools';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { toolStore } from '../store/ToolStore';
import { debounce } from 'lodash';

const AIToolsScreen = observer(() => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const handleAppOpen = async (tool: AITool) => {
    try {
      const url = Platform.select({
        ios: tool.iosAppUrl,
        android: tool.androidAppUrl,
        default: tool.websiteUrl,
      });

      if (!url) {
        Alert.alert('Error', 'App URL not available');
        return;
      }

      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        Alert.alert(
          'App Not Installed',
          'Would you like to install this app?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Install',
              onPress: () => {
                const storeUrl = Platform.select({
                  ios: tool.iosStoreUrl,
                  android: tool.androidStoreUrl,
                  default: tool.websiteUrl,
                });
                if (storeUrl) {
                  Linking.openURL(storeUrl);
                }
              },
            },
          ]
        );
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening app:', error);
      Alert.alert('Error', 'Failed to open the app');
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      toolStore.setSearchQuery(query);
    }, 300),
    []
  );

  const renderToolCard = ({ item }: { item: AITool }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.cardShadow,
          width: toolStore.viewMode === 'grid' ? (width - 48) / 2 - 8 : width - 48,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }
      ]}
      onPress={() => handleAppOpen(item)}
    >
      {item.isPopular && (
        <View style={[styles.featuredTag, { backgroundColor: theme.colors.featuredTagBg }]}>
          <Text style={[styles.featuredText, { color: theme.colors.featuredTagText }]}>
            Featured
          </Text>
        </View>
      )}
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toolStore.toggleFavorite(item.id)}
      >
        <Ionicons 
          name={toolStore.favorites.has(item.id) ? "heart" : "heart-outline"} 
          size={20} 
          color={toolStore.favorites.has(item.id) ? theme.colors.primary : theme.colors.secondaryText} 
        />
      </TouchableOpacity>
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '10' }]}>
        <Ionicons name={item.iconName} size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.ratingContainer}>
        <Text style={[styles.toolName, { color: theme.colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={16} color={theme.colors.starColor} />
          <Text style={[styles.ratingText, { color: theme.colors.text }]}>{item.rating}</Text>
        </View>
      </View>
      <Text 
        style={[styles.toolDescription, { color: theme.colors.secondaryText }]} 
        numberOfLines={2}
      >
        {item.description}
      </Text>
      
      <View style={styles.infoRow}>
        <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Category</Text>
        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{item.category}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Pricing</Text>
        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{item.pricing}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Daily Users</Text>
        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{item.dailyUsers}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Model Type</Text>
        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{item.modelType}</Text>
      </View>
    </TouchableOpacity>
  );

  if (toolStore.loading && !toolStore.tools.length) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header searchQuery={toolStore.searchQuery} onSearch={debouncedSearch} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading AI Tools...
          </Text>
        </View>
      </View>
    );
  }

  if (toolStore.error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header searchQuery={toolStore.searchQuery} onSearch={debouncedSearch} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={theme.colors.error} />
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {toolStore.error}
          </Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => toolStore.loadTools()}
          >
            <Text style={[styles.retryButtonText, { color: theme.colors.buttonText }]}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header searchQuery={toolStore.searchQuery} onSearch={debouncedSearch} />
      
      <View style={[styles.toolsHeader, { 
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.headerBackground,
      }]}>
        <View style={styles.viewControls}>
          <TouchableOpacity
            style={[
              styles.viewButton,
              toolStore.viewMode === 'grid' && { backgroundColor: theme.colors.selectedViewBg },
            ]}
            onPress={() => toolStore.setViewMode('grid')}
          >
            <Ionicons
              name="grid-outline"
              size={20}
              color={toolStore.viewMode === 'grid' ? theme.colors.selectedViewText : theme.colors.unselectedViewText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewButton,
              toolStore.viewMode === 'list' && { backgroundColor: theme.colors.selectedViewBg },
            ]}
            onPress={() => toolStore.setViewMode('list')}
          >
            <Ionicons
              name="list-outline"
              size={20}
              color={toolStore.viewMode === 'list' ? theme.colors.selectedViewText : theme.colors.unselectedViewText}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.itemsPerPage, { backgroundColor: theme.colors.input }]}
          onPress={() => {
            Alert.alert(
              'Items per page',
              'Select the number of items to display per page',
              [
                { text: '12', onPress: () => toolStore.setItemsPerPage(12) },
                { text: '24', onPress: () => toolStore.setItemsPerPage(24) },
                { text: '48', onPress: () => toolStore.setItemsPerPage(48) },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          }}
        >
          <Text style={[styles.itemsPerPageText, { color: theme.colors.text }]}>
            {toolStore.itemsPerPage} per page
          </Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => {
            // TODO: Navigate to submit form
            Alert.alert('Coming Soon', 'Tool submission form will be available soon!');
          }}
        >
          <Text style={[styles.submitButtonText, { color: theme.colors.buttonText }]}>
            Submit Tool
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={toolStore.filteredTools.slice(0, toolStore.itemsPerPage)}
        renderItem={renderToolCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.toolsList}
        showsVerticalScrollIndicator={false}
        numColumns={toolStore.viewMode === 'grid' ? 2 : 1}
        key={toolStore.viewMode}
        refreshControl={
          <RefreshControl
            refreshing={toolStore.loading}
            onRefresh={() => toolStore.loadTools()}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>
              No tools found matching your search
            </Text>
          </View>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  toolsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    zIndex: 1,
  },
  viewControls: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsPerPage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  itemsPerPageText: {
    fontSize: 14,
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  toolsList: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  toolDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default AIToolsScreen; 