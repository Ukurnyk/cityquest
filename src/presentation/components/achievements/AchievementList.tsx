import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Achievement } from '@/domain/entities/Achievement';
import { AchievementCard } from '@/presentation/components/achievements/AchievementCard';
import { theme } from '@/presentation/theme';

interface AchievementListProps {
  achievements: Achievement[];
  onAchievementPress: (achievement: Achievement) => void;
}

export const AchievementList: React.FC<AchievementListProps> = ({
  achievements,
  onAchievementPress,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AchievementCard achievement={item} onPress={onAchievementPress} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
});
