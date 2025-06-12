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
import { Location } from '@/domain/entities/Location';
import { theme } from '@/presentation/theme';
import Svg, { Path } from 'react-native-svg';
import { MapMarker } from '@/presentation/components/MapMarker';
import { LocationModal } from '@/presentation/components/map/LocationModal';
import { MapControls } from '@/presentation/components/map/MapControls';
import { MapSearch } from '@/presentation/components/map/MapSearch';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const initialRegion = {
  latitude: 56.1322,
  longitude: 47.2519,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Чувашский национальный музей',
    description: 'Главный музей Чувашской Республики',
    coordinates: {
      latitude: 56.1322,
      longitude: 47.2519,
    },
    type: 'museum',
    rating: 4.5,
    images: ['https://example.com/museum.jpg'],
    address: 'г. Чебоксары, Красная площадь, 5/2',
  },
  {
    id: '2',
    name: 'Парк Победы',
    description:
      'Мемориальный комплекс в честь победы в Великой Отечественной войне',
    coordinates: {
      latitude: 56.1289,
      longitude: 47.2478,
    },
    type: 'park',
    rating: 4.8,
    images: ['https://example.com/park.jpg'],
    address: 'г. Чебоксары, ул. Зои Космодемьянской',
  },
];

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
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  const { height } = useWindowDimensions();

  const handleLocationPress = (location: Location) => {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
        >
          {mockLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={location.coordinates}
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
    ...theme.typography.small,
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
    ...theme.typography.small,
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
