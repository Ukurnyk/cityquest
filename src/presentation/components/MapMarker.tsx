import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Achievement } from '@/types';
import { MapMarkerCallout } from '@/presentation/components/MapMarkerCallout';

interface MapMarkerProps {
  location: Achievement;
  onPress: (location: Achievement) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ location, onPress }) => {
  return (
    <Marker
      key={location.id}
      coordinate={{ latitude: location.lat ?? 0, longitude: location.lon ?? 0 }}
      onPress={() => onPress(location)}
      tracksViewChanges={false}
      pinColor={
        location.isPartner
          ? '#FFD700'
          : location.category?.name === 'Музей'
          ? '#FF6B6B'
          : '#4ECDC4'
      }
    >
      <MapMarkerCallout location={location} />
    </Marker>
  );
};
