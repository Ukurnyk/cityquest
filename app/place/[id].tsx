/**
 * Экран места: описание, расстояние, маршрут и отметка по геопозиции
 */
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StateView from '@/components/StateView';
import { useColorScheme } from '@/components/useColorScheme';
import { categoryIcons, categoryLabels } from '@/constants/categories';
import Colors from '@/constants/Colors';
import { usePlaces } from '@/hooks/queries/usePlaces';
import { useLocation } from '@/hooks/useLocation';
import { getErrorMessage } from '@/lib/errors';
import { formatDistance } from '@/lib/format';
import { getDistanceMeters } from '@/services/placesService';

// Радиус, в котором можно отметиться. С запасом на точность GPS в городе.
const CHECKIN_RADIUS_M = 100;

export default function PlaceScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: places = [], isLoading, isError, error, refetch } = usePlaces();
  const {
    location,
    loading: locationLoading,
    error: locationError,
    refresh: refreshLocation,
  } = useLocation();
  const [imageError, setImageError] = useState(false);

  const place = places.find((p) => p.id === id);

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size='large' color={colors.tint} />
      </View>
    );
  }

  if (isError || !place) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: 'Место' }} />
        {isError ? (
          <StateView
            icon='cloud-off'
            title='Не удалось загрузить место'
            message={getErrorMessage(error)}
            actionLabel='Повторить'
            onAction={refetch}
          />
        ) : (
          <StateView
            icon='location-off'
            title='Место не найдено'
            message='Возможно, его убрали из каталога'
            actionLabel='Назад'
            onAction={() => router.back()}
          />
        )}
      </View>
    );
  }

  const categoryColor = Colors.category[place.category];
  const distance = location ? getDistanceMeters(location, place) : null;
  const isNear = distance !== null && distance <= CHECKIN_RADIUS_M;
  const checkinDisabled = !locationError && (!isNear || locationLoading);

  const checkinHint = locationError
    ? 'Нет доступа к геопозиции'
    : distance === null
      ? 'Определяем местоположение…'
      : isNear
        ? 'Вы рядом с местом'
        : `Подойдите ближе — до места ${formatDistance(distance)}`;

  const openRoute = () => {
    // Маршрут пешком от текущего положения в Яндекс Картах (приложение или сайт)
    Linking.openURL(
      `https://yandex.ru/maps/?rtext=~${place.latitude},${place.longitude}&rtt=pd`,
    );
  };

  const handleCheckin = () => {
    Alert.alert(
      'Вы на месте!',
      'Отметка по геопозиции заработает после подключения серверного чекина. Пока можно отметиться по QR-коду.',
      [
        { text: 'Понятно', style: 'cancel' },
        { text: 'Сканировать QR', onPress: () => router.push('/scan') },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: place.name }} />

      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={styles.scrollContent}
      >
        {imageError ? (
          <View
            style={[
              styles.image,
              styles.imagePlaceholder,
              { backgroundColor: categoryColor + '30' },
            ]}
          >
            <MaterialIcons
              name={categoryIcons[place.category]}
              size={64}
              color={categoryColor}
            />
          </View>
        ) : (
          <Image
            source={{ uri: place.image }}
            style={styles.image}
            resizeMode='cover'
            onError={() => setImageError(true)}
          />
        )}

        <View style={styles.content}>
          <View style={styles.badges}>
            <View
              style={[styles.badge, { backgroundColor: categoryColor + '20' }]}
            >
              <MaterialIcons
                name={categoryIcons[place.category]}
                size={14}
                color={categoryColor}
              />
              <Text style={[styles.badgeText, { color: categoryColor }]}>
                {categoryLabels[place.category]}
              </Text>
            </View>
            <View
              style={[styles.badge, { backgroundColor: colors.tint + '20' }]}
            >
              <Text style={[styles.badgeText, { color: colors.tint }]}>
                +{place.points} очков
              </Text>
            </View>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            {place.name}
          </Text>

          <View style={styles.infoRow}>
            <MaterialIcons
              name='place'
              size={18}
              color={colors.textSecondary}
            />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {place.address}
            </Text>
          </View>

          {distance !== null && (
            <View style={styles.infoRow}>
              <MaterialIcons
                name='directions-walk'
                size={18}
                color={colors.textSecondary}
              />
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                {formatDistance(distance)} от вас
              </Text>
            </View>
          )}

          <Text style={[styles.description, { color: colors.text }]}>
            {place.description}
          </Text>
        </View>
      </ScrollView>

      {/* Действия */}
      <View
        style={[
          styles.actions,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: insets.bottom + 12,
          },
        ]}
      >
        <Text
          style={[
            styles.checkinHint,
            { color: isNear ? colors.success : colors.textSecondary },
          ]}
        >
          {checkinHint}
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.tint }]}
            onPress={openRoute}
            accessibilityRole='button'
            accessibilityLabel='Построить маршрут в Яндекс Картах'
          >
            <MaterialIcons name='directions' size={20} color={colors.tint} />
            <Text style={[styles.secondaryButtonText, { color: colors.tint }]}>
              Маршрут
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: isNear ? colors.tint : colors.border },
            ]}
            onPress={locationError ? refreshLocation : handleCheckin}
            disabled={checkinDisabled}
            accessibilityRole='button'
            accessibilityState={{ disabled: checkinDisabled }}
          >
            <MaterialIcons
              name={locationError ? 'refresh' : 'check-circle'}
              size={20}
              color={isNear ? '#FFFFFF' : colors.textSecondary}
            />
            <Text
              style={[
                styles.primaryButtonText,
                { color: isNear ? '#FFFFFF' : colors.textSecondary },
              ]}
            >
              {locationError ? 'Повторить' : 'Я на месте'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 240,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  actions: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  checkinHint: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
