import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Location } from '@/domain/entities/Location';
import { MapMarkerCallout } from '@/presentation/components/MapMarkerCallout';

interface MapMarkerProps {
  location: Location;
  onPress: (location: Location) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ location, onPress }) => {
  return (
    <Marker
      key={location.id}
      coordinate={location.coordinates}
      onPress={() => onPress(location)}
      tracksViewChanges={false}
      pinColor={location.type === 'museum' ? '#FF6B6B' : '#4ECDC4'}
    >
      <MapMarkerCallout location={location} />
    </Marker>
  );
};
