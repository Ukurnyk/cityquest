/**
 * Экран карты - главная страница
 * Показывает Яндекс Карту с маркерами мест через WebView
 */
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PlaceCard from '@/components/PlaceCard';
import { useColorScheme } from '@/components/useColorScheme';
import YandexMap from '@/components/YandexMap';
import Colors from '@/constants/Colors';
import { useNearbyPlaces, usePlaces } from '@/hooks/queries/usePlaces';
import { CHEBOKSARY_COORDS, useLocation } from '@/hooks/useLocation';
import { getErrorMessage } from '@/lib/errors';
import { Place } from '@/types';

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const { location, refresh: refreshLocation } = useLocation();

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const {
    data: places = [],
    isLoading,
    isError,
    error,
    refetch: refetchPlaces,
  } = usePlaces();

  const { data: allNearby = [], refetch: refetchNearby } = useNearbyPlaces(
    location,
    2,
  );
  const nearbyPlaces = allNearby.slice(0, 5);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshLocation();
    await Promise.all([refetchPlaces(), refetchNearby()]);
    setRefreshing(false);
  };

  const openPlaceDetails = (place: Place) => {
    router.push({ pathname: '/place/[id]', params: { id: place.id } });
  };

  const handlePlacePress = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleMarkerPress = (placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    if (place) {
      setSelectedPlace(place);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size='large' color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Загрузка карты...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Карта */}
      <View style={styles.mapContainer}>
        <YandexMap
          places={places}
          userLocation={location}
          initialCenter={CHEBOKSARY_COORDS}
          initialZoom={13}
          onMarkerPress={handleMarkerPress}
        />
      </View>

      {/* Ошибка загрузки мест: карта остаётся доступной */}
      {isError && (
        <View
          style={[
            styles.errorBanner,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MaterialIcons name='cloud-off' size={20} color={colors.error} />
          <Text
            style={[styles.errorText, { color: colors.text }]}
            numberOfLines={2}
          >
            {getErrorMessage(error)}
          </Text>
          <TouchableOpacity onPress={() => refetchPlaces()}>
            <Text style={[styles.errorAction, { color: colors.tint }]}>
              Повторить
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Выбранное место (полная карточка с кнопкой закрытия) */}
      {selectedPlace && (
        <View style={styles.selectedPlaceWrapper}>
          <PlaceCard
            place={selectedPlace}
            onPress={openPlaceDetails}
            onClose={() => setSelectedPlace(null)}
          />
        </View>
      )}

      {/* Ближайшие места */}
      <View style={styles.bottomSheet}>
        <View
          style={[styles.bottomSheetHandle, { backgroundColor: colors.border }]}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {nearbyPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onPress={handlePlacePress}
              compact
            />
          ))}
        </ScrollView>
      </View>

      {/* FAB кнопка сканирования */}
      <TouchableOpacity
        style={styles.scanFab}
        onPress={() => router.push('/scan')}
        activeOpacity={0.8}
      >
        <MaterialIcons name='qr-code-scanner' size={28} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
  },
  errorBanner: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
  },
  errorAction: {
    fontSize: 14,
    fontWeight: '700',
  },
  selectedPlaceWrapper: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingBottom: 24,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  scanFab: {
    position: 'absolute',
    right: 20,
    bottom: 180,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
