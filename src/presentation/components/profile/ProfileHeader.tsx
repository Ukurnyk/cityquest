import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

interface ProfileHeaderProps {
  username: string;
  level: number;
  xp: number;
  avatarUrl?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  level,
  xp,
  avatarUrl,
}) => {
  const { theme: currentTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatar,
          { backgroundColor: currentTheme.colors.primary },
        ]}
      >
        <Text style={[styles.avatarText, { color: currentTheme.colors.card }]}>
          {username.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.username, { color: currentTheme.colors.text }]}>
          {username}
        </Text>
        <Text style={[styles.level, { color: currentTheme.colors.muted }]}>
          Уровень {level}
        </Text>
        <View style={styles.xpContainer}>
          <View
            style={[
              styles.xpBar,
              { backgroundColor: currentTheme.colors.border },
            ]}
          >
            <View
              style={[
                styles.xpProgress,
                {
                  backgroundColor: currentTheme.colors.primary,
                  width: `${(xp / 1000) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.xpText, { color: currentTheme.colors.muted }]}>
            {xp}/1000 XP
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  level: {
    fontSize: 16,
    marginBottom: 8,
  },
  xpContainer: {
    marginTop: 8,
  },
  xpBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  xpProgress: {
    height: '100%',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 12,
  },
});
