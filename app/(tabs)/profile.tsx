/**
 * Экран профиля пользователя
 */
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import {
  calculateLevel,
  getLevelInfo,
  getLevelProgress,
} from '@/services/userService';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { user, isLoading: authLoading, reloadUser, logout } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadUser();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (authLoading || !user) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size='large' color={colors.tint} />
      </View>
    );
  }

  // ApiUser не имеет level/totalPoints — используем заглушки
  const totalPoints = 0;
  const level = calculateLevel(totalPoints);
  const levelInfo = getLevelInfo(level);
  const progress = getLevelProgress(totalPoints);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Аватар и имя */}
      <View style={[styles.header, { backgroundColor: colors.tint }]}>
        {/* Кнопка настроек */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}
        >
          <MaterialIcons name='settings' size={24} color='#fff' />
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          {user.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          ) : (
            <View
              style={[
                styles.avatarPlaceholder,
                { backgroundColor: colors.background },
              ]}
            >
              <Text style={styles.avatarText}>
                {user.username.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.userName}>{user.username}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        <View style={styles.levelBadge}>
          <MaterialIcons
            name='stars'
            size={18}
            color={Colors.rarity.legendary}
          />
          <Text style={styles.levelText}>
            Уровень {level}: {levelInfo.title}
          </Text>
        </View>
      </View>

      {/* Прогресс уровня */}
      <View style={[styles.progressSection, { backgroundColor: colors.card }]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: colors.text }]}>
            Прогресс уровня
          </Text>
          <Text style={[styles.progressValue, { color: colors.tint }]}>
            {progress}%
          </Text>
        </View>

        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: colors.tint, width: `${progress}%` },
            ]}
          />
        </View>

        <View style={styles.progressFooter}>
          <Text
            style={[styles.progressPoints, { color: colors.textSecondary }]}
          >
            {totalPoints} /{' '}
            {levelInfo.maxPoints === Infinity ? '∞' : levelInfo.maxPoints} очков
          </Text>
        </View>
      </View>

      {/* Статистика */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <MaterialIcons name='star' size={32} color={colors.success} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {totalPoints}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Очков
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <MaterialIcons name='verified-user' size={32} color={colors.tint} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user.isAdmin ? 'Админ' : 'Игрок'}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Роль
          </Text>
        </View>
      </View>

      {/* Меню */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={() => router.push('/leaderboard')}
        >
          <MaterialIcons name='leaderboard' size={24} color={colors.text} />
          <Text style={[styles.menuLabel, { color: colors.text }]}>
            Рейтинг
          </Text>
          <MaterialIcons
            name='chevron-right'
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={() => router.push('/settings')}
        >
          <MaterialIcons name='settings' size={24} color={colors.text} />
          <Text style={[styles.menuLabel, { color: colors.text }]}>
            Настройки
          </Text>
          <MaterialIcons
            name='chevron-right'
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={() =>
            Alert.alert('Помощь', 'Напишите нам: support@questly.app')
          }
        >
          <MaterialIcons name='help' size={24} color={colors.text} />
          <Text style={[styles.menuLabel, { color: colors.text }]}>Помощь</Text>
          <MaterialIcons
            name='chevron-right'
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={() =>
            Alert.alert(
              'О приложении',
              'Questly v1.0.0\nИсследуй город, получай награды!',
            )
          }
        >
          <MaterialIcons name='info' size={24} color={colors.text} />
          <Text style={[styles.menuLabel, { color: colors.text }]}>
            О приложении
          </Text>
          <MaterialIcons
            name='chevron-right'
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={handleLogout}
        >
          <MaterialIcons name='logout' size={24} color={colors.error} />
          <Text style={[styles.menuLabel, { color: colors.error }]}>
            Выйти из аккаунта
          </Text>
          <MaterialIcons
            name='chevron-right'
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Questly v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  levelText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  progressSection: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressFooter: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  progressPoints: {
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  menuSection: {
    margin: 16,
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 12,
  },
});
