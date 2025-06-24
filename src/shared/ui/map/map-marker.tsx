import React from 'react';
import { Marker } from 'react-native-maps';
import { Achievement } from '@/types';

interface MapMarkerProps {
  achievement: Achievement;
  onPress: (achievement: Achievement) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  achievement,
  onPress,
}) => {
  if (!achievement.lat || !achievement.lon) {
    return null;
  }

  return (
    <Marker
      coordinate={{
        latitude: achievement.lat,
        longitude: achievement.lon,
      }}
      title={achievement.title}
      description={achievement.description}
      onPress={() => onPress(achievement)}
    />
  );
};
