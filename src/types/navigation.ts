import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Map: undefined;
  Profile: undefined;
  Achievements: undefined;
  Leaderboard: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<TabParamList>;
  AchievementDetails: { achievementId: string };
  Register: undefined;
};
