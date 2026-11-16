/**
 * Экран лидерборда
 */
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LeaderboardItem from '@/components/LeaderboardItem';
import StateView from '@/components/StateView';
import { useColorScheme } from '@/components/useColorScheme';
import Colors, { type ThemeColors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useLeaderboard } from '@/hooks/queries/useLeaderboard';
import { getErrorMessage } from '@/lib/errors';

export default function LeaderboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user: currentUser } = useAuth();

  const {
    data: leaderboard = [],
    isLoading,
    isRefetching,
    isError,
    error,
    refetch,
  } = useLeaderboard(20);

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size='large' color={colors.tint} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Заголовок с позицией пользователя */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.tint, paddingTop: insets.top + 12 },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name='arrow-back' size={24} color='#fff' />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Рейтинг</Text>

        {currentUser && (
          <View style={styles.userRankCard}>
            <View style={styles.rankCircle}>
              <Text style={styles.rankNumber}>#—</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{currentUser.username}</Text>
              <Text style={styles.userPoints}>Очков: —</Text>
            </View>
          </View>
        )}
      </View>

      {/* Топ-3 */}
      {!isError && leaderboard.length >= 3 && (
        <View style={styles.topThree}>
          {/* Второе место */}
          <View style={styles.topItem}>
            <View style={[styles.topAvatar, styles.topAvatarSecond]}>
              <Text style={styles.topAvatarText}>
                {leaderboard[1].name.charAt(0)}
              </Text>
            </View>
            <Text style={styles.topName} numberOfLines={1}>
              {leaderboard[1].name}
            </Text>
            <Text style={styles.topPoints}>{leaderboard[1].totalPoints}</Text>
            <View style={[styles.podium, styles.podiumSecond]}>
              <Text style={styles.podiumRank}>2</Text>
            </View>
          </View>

          {/* Первое место */}
          <View style={[styles.topItem, styles.topItemFirst]}>
            <MaterialIcons
              name='emoji-events'
              size={28}
              color={Colors.rarity.legendary}
              style={styles.crown}
            />
            <View style={[styles.topAvatar, styles.topAvatarFirst]}>
              <Text style={styles.topAvatarText}>
                {leaderboard[0].name.charAt(0)}
              </Text>
            </View>
            <Text style={styles.topName} numberOfLines={1}>
              {leaderboard[0].name}
            </Text>
            <Text style={styles.topPoints}>{leaderboard[0].totalPoints}</Text>
            <View style={[styles.podium, styles.podiumFirst]}>
              <Text style={styles.podiumRank}>1</Text>
            </View>
          </View>

          {/* Третье место */}
          <View style={styles.topItem}>
            <View style={[styles.topAvatar, styles.topAvatarThird]}>
              <Text style={styles.topAvatarText}>
                {leaderboard[2].name.charAt(0)}
              </Text>
            </View>
            <Text style={styles.topName} numberOfLines={1}>
              {leaderboard[2].name}
            </Text>
            <Text style={styles.topPoints}>{leaderboard[2].totalPoints}</Text>
            <View style={[styles.podium, styles.podiumThird]}>
              <Text style={styles.podiumRank}>3</Text>
            </View>
          </View>
        </View>
      )}

      {/* Остальной список */}
      {isError ? (
        <StateView
          icon='cloud-off'
          title='Не удалось загрузить рейтинг'
          message={getErrorMessage(error)}
          actionLabel='Повторить'
          onAction={refetch}
        />
      ) : (
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => {
                refetch();
              }}
            />
          }
        >
          {leaderboard.slice(3).map((entry) => (
            <LeaderboardItem
              key={entry.userId}
              entry={entry}
              isCurrentUser={entry.userId === currentUser?.id}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 16,
    },
    userRankCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 16,
      padding: 14,
    },
    rankCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    rankNumber: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.tint,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 17,
      fontWeight: '600',
      color: '#fff',
    },
    userPoints: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: 2,
    },
    topThree: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 20,
    },
    topItem: {
      alignItems: 'center',
      flex: 1,
      maxWidth: 100,
    },
    topItemFirst: {
      marginBottom: 20,
    },
    crown: {
      marginBottom: 4,
    },
    topAvatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    topAvatarFirst: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: Colors.rarity.legendary + '30',
      borderWidth: 3,
      borderColor: Colors.rarity.legendary,
    },
    topAvatarSecond: {
      backgroundColor: '#C0C0C0' + '30',
      borderWidth: 2,
      borderColor: '#C0C0C0',
    },
    topAvatarThird: {
      backgroundColor: '#CD7F32' + '30',
      borderWidth: 2,
      borderColor: '#CD7F32',
    },
    topAvatarText: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
    },
    topName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
      maxWidth: 80,
    },
    topPoints: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    podium: {
      width: 36,
      height: 36,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    podiumFirst: {
      backgroundColor: Colors.rarity.legendary,
      height: 50,
    },
    podiumSecond: {
      backgroundColor: '#C0C0C0',
      height: 40,
    },
    podiumThird: {
      backgroundColor: '#CD7F32',
      height: 32,
    },
    podiumRank: {
      fontSize: 18,
      fontWeight: '700',
      color: '#fff',
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 16,
      paddingBottom: 40,
    },
  });
