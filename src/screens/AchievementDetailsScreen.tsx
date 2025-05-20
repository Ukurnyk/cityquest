import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Achievement, RootStackParamList } from '@/types';
import { api } from '@/services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'AchievementDetails'>;

export const AchievementDetailsScreen = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { achievementId } = route.params;
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    api.getAchievements().then((list) => {
      setAchievement(list.find((a) => a.id === achievementId) || null);
      setLoading(false);
    });
  }, [achievementId]);

  const handleComplete = async () => {
    if (!achievement || achievement.isCompleted) return;
    setCompleting(true);
    const updated = await api.completeAchievement(achievement.id);
    setAchievement(updated);
    setCompleting(false);
  };

  if (loading || !achievement) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color='#4B6CFF' size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{achievement.title}</Text>
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>+{achievement.xpReward} XP</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{achievement.description}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Тип</Text>
            <Text style={styles.infoValue}>
              {achievement.type === 'location' ? 'Место' : 'Событие'}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Статус</Text>
            <Text
              style={[
                styles.infoValue,
                { color: achievement.isCompleted ? '#4CAF50' : '#FF6B4A' },
              ]}
            >
              {achievement.isCompleted ? 'Выполнено' : 'В процессе'}
            </Text>
          </View>
        </View>

        {!achievement.isCompleted && (
          <TouchableOpacity
            style={styles.button}
            onPress={handleComplete}
            disabled={completing}
          >
            <Text style={styles.buttonText}>
              {completing ? 'Выполняется...' : 'Выполнить'}
            </Text>
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
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F8FA',
  },
});

export default AchievementDetailsScreen;
