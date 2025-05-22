import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Achievement } from '@/domain/entities/Achievement';
import { GetAchievementsUseCase } from '@/domain/usecases/GetAchievementsUseCase';
import { AchievementList } from '@/presentation/components/achievements/AchievementList';
import { theme } from '@/presentation/theme';

interface AchievementsScreenProps {
  getAchievementsUseCase: GetAchievementsUseCase;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  getAchievementsUseCase,
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const result = await getAchievementsUseCase.execute();
      setAchievements(result);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить достижения');
    } finally {
      setLoading(false);
    }
  };

  const handleAchievementPress = (achievement: Achievement) => {
    // TODO: Навигация к деталям достижения
    console.log('Achievement pressed:', achievement.id);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Загрузка...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.error]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Достижения</Text>
      <AchievementList
        achievements={achievements}
        onAchievementPress={handleAchievementPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    padding: theme.spacing.md,
  },
  text: {
    ...theme.typography.body,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  error: {
    color: theme.colors.error,
  },
});
