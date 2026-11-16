/**
 * Компонент карточки достижения
 */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '../constants/Colors';
import { Achievement } from '../types';

interface AchievementCardProps {
  achievement: Achievement;
  onPress?: (achievement: Achievement) => void;
  size?: 'small' | 'medium' | 'large';
}

const rarityColors = {
  common: '#78909C',
  rare: '#42A5F5',
  epic: '#AB47BC',
  legendary: '#FFB300',
};

const rarityLabels = {
  common: 'Обычное',
  rare: 'Редкое',
  epic: 'Эпическое',
  legendary: 'Легендарное',
};

export default function AchievementCard({
  achievement,
  onPress,
  size = 'medium',
}: AchievementCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isLocked = !achievement.unlocked;
  const rarityColor = rarityColors[achievement.rarity];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        size === 'small' && styles.containerSmall,
        size === 'large' && styles.containerLarge,
        isLocked && styles.containerLocked,
        {
          backgroundColor: colors.surface,
          borderColor: isLocked ? colors.tabIconDefault : rarityColor,
        },
      ]}
      onPress={() => onPress?.(achievement)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.iconContainer,
          size === 'small' && styles.iconContainerSmall,
          size === 'large' && styles.iconContainerLarge,
          { backgroundColor: isLocked ? colors.border : `${rarityColor}20` },
        ]}
      >
        <Text
          style={[
            styles.icon,
            size === 'small' && styles.iconSmall,
            size === 'large' && styles.iconLarge,
            isLocked && styles.iconLocked,
          ]}
        >
          {isLocked ? '🔒' : achievement.icon}
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: isLocked ? colors.tabIconDefault : colors.text },
          ]}
          numberOfLines={1}
        >
          {achievement.title}
        </Text>

        {size !== 'small' && (
          <Text
            style={[
              styles.description,
              {
                color: isLocked ? colors.tabIconDefault : colors.textSecondary,
              },
            ]}
            numberOfLines={2}
          >
            {achievement.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View
            style={[
              styles.rarityBadge,
              {
                backgroundColor: isLocked ? colors.border : `${rarityColor}20`,
              },
            ]}
          >
            <Text
              style={[
                styles.rarityText,
                { color: isLocked ? colors.tabIconDefault : rarityColor },
              ]}
            >
              {rarityLabels[achievement.rarity]}
            </Text>
          </View>

          <Text
            style={[
              styles.points,
              { color: isLocked ? colors.tabIconDefault : colors.tint },
            ]}
          >
            +{achievement.points} ⭐
          </Text>
        </View>
      </View>

      {achievement.unlocked && achievement.unlockedAt && (
        <View style={styles.unlockedBadge}>
          <Text style={styles.unlockedText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  containerSmall: {
    padding: 12,
    marginBottom: 8,
  },
  containerLarge: {
    padding: 20,
  },
  containerLocked: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconContainerSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  iconContainerLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 18,
  },
  icon: {
    fontSize: 28,
  },
  iconSmall: {
    fontSize: 20,
  },
  iconLarge: {
    fontSize: 36,
  },
  iconLocked: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  points: {
    fontSize: 14,
    fontWeight: '700',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
});
