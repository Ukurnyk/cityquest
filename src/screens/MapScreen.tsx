import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Achievement, RootStackParamList } from '@/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Временные данные для тестирования
const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Кофейня на Невском',
    description: 'Выпей кофе в легендарной кофейне',
    xpReward: 50,
    type: 'location',
    location: {
      latitude: 59.9343,
      longitude: 30.3351,
      radius: 100,
    },
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Памятник Пушкину',
    description: 'Найди памятник великому поэту',
    xpReward: 30,
    type: 'location',
    location: {
      latitude: 59.9345,
      longitude: 30.3353,
      radius: 50,
    },
    isCompleted: false,
  },
];

export const MapScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleMarkerPress = (achievement: Achievement) => {
    navigation.navigate('AchievementDetails', {
      achievementId: achievement.id,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 59.9343,
          longitude: 30.3351,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {mockAchievements.map((achievement) => (
          <Marker
            key={achievement.id}
            coordinate={{
              latitude: achievement.location?.latitude || 0,
              longitude: achievement.location?.longitude || 0,
            }}
            onPress={() => handleMarkerPress(achievement)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
