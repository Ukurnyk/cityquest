/**
 * Нативная Яндекс Карта (MapKit SDK) с кластеризацией маркеров мест
 */
import Constants from 'expo-constants';
import React, { useEffect, useMemo, useRef } from 'react';
import { type ImageSourcePropType, StyleSheet, View } from 'react-native';
import {
  ClusteredYamap,
  type ClusteredYamapRef,
  Marker,
  type Point,
  YamapInstance,
} from 'react-native-yamap-plus';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Coordinates, Place, PlaceCategory } from '@/types';

const mapKitApiKey = Constants.expoConfig?.extra?.mapKitApiKey;

if (typeof mapKitApiKey === 'string' && mapKitApiKey.length > 0) {
  YamapInstance.init(mapKitApiKey);
} else {
  console.error(
    '[YandexMap] Не задан extra.mapKitApiKey (YANDEX_MAPKIT_API_KEY)',
  );
}

const markerIcons: Record<PlaceCategory, ImageSourcePropType> = {
  museum: require('../assets/images/markers/museum.png'),
  cafe: require('../assets/images/markers/cafe.png'),
  park: require('../assets/images/markers/park.png'),
  landmark: require('../assets/images/markers/landmark.png'),
  event: require('../assets/images/markers/event.png'),
};

const USER_ZOOM = 14;

interface YandexMapProps {
  places?: Place[];
  userLocation?: Coordinates | null;
  initialCenter: Coordinates;
  initialZoom?: number;
  onMarkerPress?: (placeId: string) => void;
}

export default function YandexMap({
  places = [],
  userLocation = null,
  initialCenter,
  initialZoom = 13,
  onMarkerPress,
}: YandexMapProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const mapRef = useRef<ClusteredYamapRef>(null);
  const centeredOnUser = useRef(false);

  // Один раз центрируем карту на пользователе, когда пришла геопозиция
  useEffect(() => {
    if (!userLocation || centeredOnUser.current) return;
    centeredOnUser.current = true;
    mapRef.current?.setCenter(
      { lat: userLocation.latitude, lon: userLocation.longitude },
      USER_ZOOM,
    );
  }, [userLocation]);

  const clusteredMarkers = useMemo(
    () =>
      places.map((place) => ({
        point: { lat: place.latitude, lon: place.longitude },
        data: place,
      })),
    [places],
  );

  return (
    <View style={styles.container}>
      <ClusteredYamap
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          lat: initialCenter.latitude,
          lon: initialCenter.longitude,
          zoom: initialZoom,
        }}
        showUserPosition
        nightMode={colorScheme === 'dark'}
        clusterColor={colors.tint}
        clusterTextColor='#FFFFFF'
        clusteredMarkers={clusteredMarkers}
        renderMarker={({ point, data }: { point: Point; data: Place }) => (
          <Marker
            key={data.id}
            point={point}
            source={markerIcons[data.category]}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={() => onMarkerPress?.(data.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
