import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Achievement } from '@/domain/entities/Achievement';
import { GetAchievementByIdUseCase } from '@/domain/usecases/GetAchievementByIdUseCase';
import { CompleteAchievementUseCase } from '@/domain/usecases/CompleteAchievementUseCase';
import { theme } from '@/presentation/theme';

type RootStackParamList = {
  AchievementDetails: { achievementId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'AchievementDetails'>;

interface AchievementDetailsScreenProps {
  getAchievementByIdUseCase: GetAchievementByIdUseCase;
  completeAchievementUseCase: CompleteAchievementUseCase;
}

export const AchievementDetailsScreen: React.FC<
  AchievementDetailsScreenProps
> = ({ getAchievementByIdUseCase, completeAchievementUseCase }) => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { achievementId } = route.params;
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    loadAchievement();
  }, [achievementId]);

  const loadAchievement = async () => {
    try {
      setLoading(true);
      const result = await getAchievementByIdUseCase.execute(achievementId);
      setAchievement(result);
    } catch (error) {
      console.error('Error loading achievement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (
      !achievement ||
      achievement.progress.current >= achievement.progress.total
    )
      return;

    try {
      setCompleting(true);
      await completeAchievementUseCase.execute(achievement.id);
      await loadAchievement(); // Перезагружаем достижение для обновления прогресса
    } catch (error) {
      console.error('Error completing achievement:', error);
    } finally {
      setCompleting(false);
    }
  };

  if (loading || !achievement) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={theme.colors.primary} size='large' />
      </View>
    );
  }

  const progress =
    (achievement.progress.current / achievement.progress.total) * 100;
  const isCompleted =
    achievement.progress.current >= achievement.progress.total;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{achievement.title}</Text>
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>
            +{achievement.rewards.experience} XP
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{achievement.description}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Редкость</Text>
            <Text style={styles.infoValue}>{achievement.rarity}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Прогресс</Text>
            <Text style={styles.infoValue}>
              {achievement.progress.current}/{achievement.progress.total}
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </View>

        {!isCompleted && (
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
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.muted,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  xpContainer: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    alignSelf: 'flex-start',
  },
  xpText: {
    color: theme.colors.card,
    ...theme.typography.small,
    fontWeight: '600',
  },
  content: {
    padding: theme.spacing.lg,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  infoContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  infoLabel: {
    ...theme.typography.small,
    color: theme.colors.muted,
  },
  infoValue: {
    ...theme.typography.small,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressContainer: {
    height: 4,
    backgroundColor: theme.colors.background,
    borderRadius: 2,
    marginTop: theme.spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.card,
    ...theme.typography.body,
    fontWeight: '600',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
