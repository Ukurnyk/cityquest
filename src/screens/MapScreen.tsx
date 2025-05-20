import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Achievement, RootStackParamList } from '@/types';
import { api } from '@/services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MapScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAchievements().then((data) => {
      setAchievements(data);
      setLoading(false);
    });
  }, []);

  const handleMarkerPress = (achievement: Achievement) => {
    navigation.navigate('AchievementDetails', {
      achievementId: achievement.id,
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color='#4B6CFF' size='large' />
      </View>
    );
  }

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
        {achievements.map((achievement) => (
          <Marker
            key={achievement.id}
            coordinate={{
              latitude: achievement.location?.latitude || 0,
              longitude: achievement.location?.longitude || 0,
            }}
            pinColor={achievement.isCompleted ? '#4B6CFF' : '#FF6B4A'}
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
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F8FA',
  },
});

export default MapScreen;
