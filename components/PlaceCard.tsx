/**
 * Компонент карточки места
 */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { categoryIcons, categoryLabels } from '@/constants/categories';
import Colors from '../constants/Colors';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
  onPress?: (place: Place) => void;
  onClose?: () => void;
  compact?: boolean;
}

export default function PlaceCard({
  place,
  onPress,
  onClose,
  compact = false,
}: PlaceCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        compact && styles.containerCompact,
        { backgroundColor: colors.surface },
      ]}
      onPress={() => onPress?.(place)}
      activeOpacity={0.8}
    >
      {imageError ? (
        <View
          style={[
            styles.imagePlaceholder,
            compact && styles.imageCompact,
            { backgroundColor: colors.card },
          ]}
        >
          <MaterialIcons
            name={categoryIcons[place.category]}
            size={compact ? 32 : 48}
            color={colors.tabIconDefault}
          />
        </View>
      ) : (
        <Image
          source={{ uri: place.image }}
          style={[styles.image, compact && styles.imageCompact]}
          resizeMode='cover'
          onError={() => setImageError(true)}
        />
      )}

      <View style={styles.imageOverlay} />

      <View style={styles.topBadges}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={styles.badgeGlass}>
            <MaterialIcons
              name={categoryIcons[place.category]}
              size={14}
              color='#fff'
            />
            <Text style={styles.badgeText}>
              {categoryLabels[place.category]}
            </Text>
          </View>

          <View style={[styles.badgeGlass, styles.pointsBadge]}>
            <Text style={styles.pointsText}>+{place.points} ✨</Text>
          </View>
        </View>

        {onClose && (
          <TouchableOpacity
            style={[styles.badgeGlass, styles.closeButton]}
            onPress={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <MaterialIcons name='close' size={16} color='#fff' />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.content, { backgroundColor: colors.surface }]}>
        <Text
          style={[
            styles.title,
            compact && styles.titleCompact,
            { color: colors.text },
          ]}
          numberOfLines={compact ? 1 : 2}
        >
          {place.name}
        </Text>

        {!compact && (
          <Text
            style={[styles.description, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {place.description}
          </Text>
        )}

        <View style={styles.footer}>
          <MaterialIcons name='place' size={14} color={colors.textSecondary} />
          <Text
            style={[styles.address, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            {place.address}
          </Text>
        </View>
      </View>

      {place.isVisited && (
        <View
          style={[
            styles.visitedBadge,
            compact && styles.visitedBadgeCompact,
            { backgroundColor: colors.surface },
          ]}
        >
          <MaterialIcons
            name='check-circle'
            size={compact ? 20 : 28}
            color={colors.tint}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    width: cardWidth,
  },
  containerCompact: {
    width: 220,
    marginRight: 16,
    marginBottom: 8,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 180,
  },
  imageCompact: {
    height: 130,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  topBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  closeButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pointsBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pointsText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  titleCompact: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  address: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  visitedBadge: {
    position: 'absolute',
    top: 156, // 180 (image height) - 24
    right: 20,
    borderRadius: 24,
    padding: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  visitedBadgeCompact: {
    top: 110, // 130 - 20
    right: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
