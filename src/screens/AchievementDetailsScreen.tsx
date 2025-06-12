import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Achievement, RootStackParamList } from '@/types';
import { api } from '@/services/api';
import { AchievementHeader } from '@/presentation/components/achievements/AchievementHeader';
import { AchievementInfo } from '@/presentation/components/achievements/AchievementInfo';
import { CompleteButton } from '@/presentation/components/achievements/CompleteButton';

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
      <AchievementHeader achievement={achievement} />
      <View style={styles.content}>
        <Text style={styles.description}>{achievement.description}</Text>
        <AchievementInfo achievement={achievement} />
        {!achievement.isCompleted && (
          <CompleteButton onPress={handleComplete} completing={completing} />
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
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#2B2D42',
    lineHeight: 24,
    marginBottom: 24,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F8FA',
  },
});

export default AchievementDetailsScreen;
