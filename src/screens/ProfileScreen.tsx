import React from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
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
import { useStore } from '@/store';

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
          onViewAchievements={() => {}}
        />
        <View style={{ marginTop: 32 }}>
          <TouchableOpacity
            style={{
              backgroundColor: currentTheme.colors.primary,
              padding: 16,
              borderRadius: 8,
              marginBottom: 12,
              alignItems: 'center',
            }}
            onPress={() => console.log('Достижения')}
          >
            <Text
              style={{ color: currentTheme.colors.card, fontWeight: '600' }}
            >
              Достижения
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: currentTheme.colors.primary,
              padding: 16,
              borderRadius: 8,
              marginBottom: 12,
              alignItems: 'center',
            }}
            onPress={() => console.log('Настройки')}
          >
            <Text
              style={{ color: currentTheme.colors.card, fontWeight: '600' }}
            >
              Настройки
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: currentTheme.colors.error,
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
            }}
            onPress={async () => {
              await useStore.getState().logout();
              navigation.replace('Login');
            }}
          >
            <Text
              style={{ color: currentTheme.colors.card, fontWeight: '600' }}
            >
              Выйти
            </Text>
          </TouchableOpacity>
        </View>
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
