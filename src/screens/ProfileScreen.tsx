import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { ProfileHeader } from '@/presentation/components/profile/ProfileHeader';
import { ProfileStats } from '@/presentation/components/profile/ProfileStats';
import { ProfileActions } from '@/presentation/components/profile/ProfileActions';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/types/navigation';
import { useSafeArea } from '@/theme/SafeAreaContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';

type Props = BottomTabScreenProps<TabParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const { theme: currentTheme } = useTheme();
  const { topPadding, bottomPadding } = useSafeArea();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: currentTheme.colors.background },
        ]}
        contentContainerStyle={[
          styles.content,
          { paddingTop: topPadding, paddingBottom: bottomPadding },
        ]}
      >
        <ProfileHeader username='Иван Иванов' level={5} xp={750} />
        <ProfileStats
          completedQuests={12}
          visitedLocations={8}
          achievements={3}
        />
        <ProfileActions
          onEditProfile={() => {}}
          onViewHistory={() => {}}
          onViewAchievements={() =>
            navigation.navigate('AchievementDetails', { achievementId: '1' })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
});

export default ProfileScreen;
