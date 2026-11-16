/**
 * Экран каталога мест
 */
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import PlaceCard from '@/components/PlaceCard';
import StateView from '@/components/StateView';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import {
  usePlacesByCategory,
  usePlacesSearch,
} from '@/hooks/queries/usePlaces';
import { getErrorMessage } from '@/lib/errors';
import { Place, PlaceCategory } from '@/types';

const categories: {
  key: PlaceCategory | 'all';
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}[] = [
  { key: 'all', label: 'Все', icon: 'apps' },
  { key: 'landmark', label: 'Места', icon: 'location-city' },
  { key: 'museum', label: 'Музеи', icon: 'museum' },
  { key: 'cafe', label: 'Кафе', icon: 'local-cafe' },
  { key: 'park', label: 'Парки', icon: 'park' },
  { key: 'event', label: 'События', icon: 'event' },
];

export default function PlacesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<
    PlaceCategory | 'all'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isSearching = searchQuery.trim().length > 0;

  // Поиск — активен только при наличии запроса
  const searchResult = usePlacesSearch(searchQuery);
  // Фильтр по категории
  const categoryResult = usePlacesByCategory(selectedCategory);

  const {
    data: places = [],
    isLoading,
    isRefetching,
    isError,
    error,
    refetch,
  } = isSearching ? searchResult : categoryResult;

  const onRefresh = () => {
    refetch();
  };

  const handleCategoryPress = (category: PlaceCategory | 'all') => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  const handlePlacePress = (place: Place) => {
    router.push({ pathname: '/place/[id]', params: { id: place.id } });
  };

  const renderCategoryButton = (category: (typeof categories)[0]) => {
    const isSelected = selectedCategory === category.key;
    return (
      <TouchableOpacity
        key={category.key}
        style={[
          styles.categoryButton,
          {
            backgroundColor: isSelected ? colors.tint : colors.card,
            borderColor: isSelected ? colors.tint : colors.border,
          },
        ]}
        onPress={() => handleCategoryPress(category.key)}
      >
        <MaterialIcons
          name={category.icon}
          size={18}
          color={isSelected ? '#FFF' : colors.textSecondary}
        />
        <Text
          style={[
            styles.categoryLabel,
            { color: isSelected ? '#FFF' : colors.textSecondary },
          ]}
        >
          {category.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Поиск */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <MaterialIcons name='search' size={22} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder='Поиск мест...'
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons
              name='close'
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Категории */}
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => renderCategoryButton(item)}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesList}
      />

      {/* Список мест */}
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size='large' color={colors.tint} />
        </View>
      ) : isError ? (
        <StateView
          icon='cloud-off'
          title='Не удалось загрузить места'
          message={getErrorMessage(error)}
          actionLabel='Повторить'
          onAction={onRefresh}
        />
      ) : places.length === 0 ? (
        <StateView
          icon='location-off'
          title='Места не найдены'
          message={
            isSearching
              ? 'Попробуйте изменить запрос'
              : 'В этой категории пока нет мест'
          }
        />
      ) : (
        <FlatList
          data={places}
          renderItem={({ item }) => (
            <PlaceCard place={item} onPress={handlePlacePress} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.placesList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  categoriesList: {
    maxHeight: 50,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placesList: {
    padding: 16,
    alignItems: 'center',
  },
});
