import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import { useStore } from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface UserStats {
  completedQuests: number;
  visitedLocations: number;
  achievements: number;
}

export const useProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, setUser, setToken } = useStore();
  const logout = useStore((s) => s.logout);

  // Mock данные для статистики
  const stats: UserStats = {
    completedQuests: 12,
    visitedLocations: 8,
    achievements: 3,
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
    // TODO: Навигация к редактированию профиля
  };

  const handleViewHistory = () => {
    console.log('View history');
    // TODO: Навигация к истории
  };

  const handleViewAchievements = () => {
    console.log('View achievements');
    // TODO: Навигация к достижениям
  };

  const handleViewAchievementsList = () => {
    console.log('View achievements list');
    // TODO: Навигация к списку достижений
  };

  const handleLogout = async () => {
    try {
      // Удаляем токены из хранилища
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');

      // Очищаем состояние пользователя
      setUser(null);
      setToken(null);

      // Перенаправляем на экран входа
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleAchievements = () => {
    // TODO: Добавить экран достижений в навигацию
    console.log('Достижения');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return {
    user,
    stats,
    handleEditProfile,
    handleViewHistory,
    handleViewAchievements,
    handleViewAchievementsList,
    handleLogout,
    handleAchievements,
    handleSettings,
  };
};
