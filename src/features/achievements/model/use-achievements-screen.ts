import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Achievement, RootStackParamList } from '@/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Первые шаги',
    description: 'Завершите свой первый квест',
    goal: 1,
    rewardScore: 100,
    iconUrl: 'https://example.com/icon1.png',
    isPartner: false,
    createdAt: new Date().toISOString(),
    city: {
      id: '1',
      name: 'Москва',
      description: 'Столица России',
    },
    category: {
      id: '1',
      name: 'Квесты',
      description: 'Достижения за выполнение квестов',
    },
  },
  {
    id: '2',
    title: 'Исследователь',
    description: 'Посетите 5 разных локаций',
    goal: 5,
    rewardScore: 250,
    iconUrl: 'https://example.com/icon2.png',
    isPartner: false,
    createdAt: new Date().toISOString(),
    city: {
      id: '1',
      name: 'Москва',
      description: 'Столица России',
    },
    category: {
      id: '2',
      name: 'Исследования',
      description: 'Достижения за исследование города',
    },
  },
];

export const useAchievementsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleAchievementPress = (achievement: Achievement) => {
    navigation.navigate('AchievementDetails', {
      achievementId: achievement.id,
    });
  };

  return {
    achievements: mockAchievements,
    handleAchievementPress,
  };
};
