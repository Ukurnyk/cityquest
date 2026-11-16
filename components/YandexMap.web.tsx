/**
 * Заглушка карты для web: MapKit SDK доступен только на iOS и Android
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Coordinates, Place } from '@/types';

interface YandexMapProps {
  places?: Place[];
  userLocation?: Coordinates | null;
  initialCenter: Coordinates;
  initialZoom?: number;
  onMarkerPress?: (placeId: string) => void;
}

export default function YandexMap(_props: YandexMapProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Карта недоступна в веб-версии
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
