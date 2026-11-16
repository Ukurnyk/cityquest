/**
 * Экран настроек приложения
 */
import { removeData, STORAGE_KEYS } from '@/services/storageService';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Appearance,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

interface SettingItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

function SettingItem({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  danger = false,
}: SettingItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress && !rightElement}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View
        style={[
          styles.settingIcon,
          {
            backgroundColor: danger ? colors.error + '15' : colors.tint + '15',
          },
        ]}
      >
        <MaterialIcons
          name={icon}
          size={22}
          color={danger ? colors.error : colors.tint}
        />
      </View>
      <View style={styles.settingContent}>
        <Text
          style={[
            styles.settingTitle,
            { color: danger ? colors.error : colors.text },
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[styles.settingSubtitle, { color: colors.textSecondary }]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement ||
        (onPress && (
          <MaterialIcons
            name='chevron-right'
            size={24}
            color={colors.tabIconDefault}
          />
        ))}
    </TouchableOpacity>
  );
}

function SettingSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.tabIconDefault }]}>
        {title}
      </Text>
      <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Настройки
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [autoDownload, setAutoDownload] = useState(false);

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    Appearance.setColorScheme(value ? 'dark' : 'light');
  };

  const handleClearCache = () => {
    Alert.alert(
      'Очистить кэш',
      'Удалить загруженные карты и временные данные? Прогресс сохранится.',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Очистить',
          style: 'destructive',
          onPress: async () => {
            await removeData(STORAGE_KEYS.PHOTOS);
            await removeData(STORAGE_KEYS.SETTINGS);
            Alert.alert('Готово', 'Кэш очищен');
          },
        },
      ],
    );
  };

  const handleContactSupport = () => {
    Alert.alert('Поддержка', 'Напишите нам: support@questly.app');
  };

  const handleRateApp = () => {
    Alert.alert('Спасибо!', 'Оценка приложения скоро будет доступна.');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Заголовок */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name='arrow-back' size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Настройки
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Уведомления */}
        <SettingSection title='УВЕДОМЛЕНИЯ'>
          <SettingItem
            icon='notifications'
            title='Push-уведомления'
            subtitle='Новые места, события, достижения'
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.tint }}
                thumbColor='#fff'
              />
            }
          />
        </SettingSection>

        {/* Геолокация */}
        <SettingSection title='ГЕОЛОКАЦИЯ'>
          <SettingItem
            icon='location-on'
            title='Использовать геолокацию'
            subtitle='Для поиска ближайших мест'
            rightElement={
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: colors.border, true: colors.tint }}
                thumbColor='#fff'
              />
            }
          />
        </SettingSection>

        {/* Внешний вид */}
        <SettingSection title='ВНЕШНИЙ ВИД'>
          <SettingItem
            icon='dark-mode'
            title='Тёмная тема'
            subtitle='Переключить цветовую схему'
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: colors.border, true: colors.tint }}
                thumbColor='#fff'
              />
            }
          />
        </SettingSection>

        {/* Данные */}
        <SettingSection title='ДАННЫЕ'>
          <SettingItem
            icon='cloud-download'
            title='Автозагрузка карт'
            subtitle='Загружать карты в фоне'
            rightElement={
              <Switch
                value={autoDownload}
                onValueChange={setAutoDownload}
                trackColor={{ false: colors.border, true: colors.tint }}
                thumbColor='#fff'
              />
            }
          />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SettingItem
            icon='delete-outline'
            title='Очистить кэш'
            subtitle='Удалить загруженные данные и карты'
            onPress={handleClearCache}
            danger
          />
        </SettingSection>

        {/* О приложении */}
        <SettingSection title='О ПРИЛОЖЕНИИ'>
          <SettingItem
            icon='star-outline'
            title='Оценить приложение'
            onPress={handleRateApp}
          />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SettingItem
            icon='help-outline'
            title='Связаться с поддержкой'
            onPress={handleContactSupport}
          />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SettingItem icon='info-outline' title='Версия' subtitle={'1.0.0'} />
        </SettingSection>

        {/* Подвал */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.tabIconDefault }]}>
            Questly © 2026
          </Text>
          <Text style={[styles.footerText, { color: colors.tabIconDefault }]}>
            Исследуй город, получай награды!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginLeft: 66,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 13,
    marginBottom: 4,
  },
});
