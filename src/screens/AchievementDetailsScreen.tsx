import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Achievement, RootStackParamList } from '@/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'AchievementDetails'>;

// Временные данные для тестирования
const mockAchievement: Achievement = {
  id: '1',
  title: 'Кофейня на Невском',
  description:
    'Выпей кофе в легендарной кофейне на Невском проспекте. Это место известно своим уникальным интерьером и атмосферой.',
  xpReward: 50,
  type: 'location',
  location: {
    latitude: 59.9343,
    longitude: 30.3351,
    radius: 100,
  },
  isCompleted: false,
};

export const AchievementDetailsScreen = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { achievementId } = route.params;

  const handleComplete = () => {
    // TODO: Реализовать логику завершения достижения
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{mockAchievement.title}</Text>
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>+{mockAchievement.xpReward} XP</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{mockAchievement.description}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Тип</Text>
            <Text style={styles.infoValue}>
              {mockAchievement.type === 'location' ? 'Место' : 'Событие'}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Статус</Text>
            <Text
              style={[
                styles.infoValue,
                { color: mockAchievement.isCompleted ? '#4CAF50' : '#FF6B4A' },
              ]}
            >
              {mockAchievement.isCompleted ? 'Выполнено' : 'В процессе'}
            </Text>
          </View>
        </View>

        {!mockAchievement.isCompleted && (
          <TouchableOpacity style={styles.button} onPress={handleComplete}>
            <Text style={styles.buttonText}>Отметить как выполненное</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 8,
  },
  xpContainer: {
    backgroundColor: '#4B6CFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  xpText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#2B2D42',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7B7F9E',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2D42',
  },
  button: {
    backgroundColor: '#4B6CFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AchievementDetailsScreen;
