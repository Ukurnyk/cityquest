import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  useColorScheme,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Achievement, RootStackParamList } from '@/types';
import { api } from '@/services/api';
import { useTheme } from '@/theme/ThemeContext';
import { theme } from '@/presentation/theme';
import Svg, { Path } from 'react-native-svg';
import { MapMarker } from '@/presentation/components/MapMarker';
import { LocationModal } from '@/presentation/components/map/LocationModal';
import { MapControls } from '@/presentation/components/map/MapControls';
import { MapSearch } from '@/presentation/components/map/MapSearch';
import { useGetAchievementsQuery } from '@/gql/operations';
import { useStore } from '@/store';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const initialRegion = {
  latitude: 56.1322,
  longitude: 47.2519,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
interface MapStyle {
  elementType?: string;
  featureType?: string;
  stylers: Array<{ color: string }>;
}

const lightMapStyle: MapStyle[] = [];
const darkMapStyle: MapStyle[] = [];

const MapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme: currentTheme } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState<Achievement | null>(
    null
  );
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  const { height } = useWindowDimensions();

  const userId = useStore((s) => s.user?.id);
  const { data, loading, error } = useGetAchievementsQuery({
    variables: { userId: userId || '' },
    skip: !userId,
  });
  console.log('data', data);
  const achievements =
    data?.userAchievements?.map(
      (ua: { achievement: Achievement }) => ua.achievement
    ) ?? [];

  const handleLocationPress = (location: Achievement) => {
    setSelectedLocation(location);
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  const handleSearchPress = () => {
    setIsSearchVisible(true);
  };

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={currentTheme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: currentTheme.colors.error }}>
          Ошибка загрузки точек
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
        >
          {achievements.map((location: Achievement) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.lat ?? 0,
                longitude: location.lon ?? 0,
              }}
              onPress={() => handleLocationPress(location)}
            />
          ))}
        </MapView>

        <MapControls
          onSearchPress={handleSearchPress}
          onMyLocationPress={() => {}}
          onZoomIn={() => {}}
          onZoomOut={() => {}}
        />

        {isSearchVisible && (
          <MapSearch
            onClose={handleCloseSearch}
            onSearch={(query) => {
              console.log('Search:', query);
            }}
          />
        )}

        {selectedLocation && (
          <LocationModal
            location={selectedLocation}
            onClose={handleCloseModal}
            onStartQuest={() => {}}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    padding: 12,
    maxWidth: 200,
    borderRadius: theme.borderRadius.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  calloutDescription: {
    ...theme.typography.caption,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.md,
  },
  modalDescription: {
    ...theme.typography.body,
    marginBottom: theme.spacing.md,
  },
  modalAddress: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.sm,
  },
  modalRating: {
    ...theme.typography.body,
    marginBottom: theme.spacing.lg,
  },
  questButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  questButtonText: {
    ...theme.typography.body,
    fontWeight: '600',
  },
  closeButton: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  closeButtonText: {
    ...theme.typography.body,
  },
});

export default MapScreen;
